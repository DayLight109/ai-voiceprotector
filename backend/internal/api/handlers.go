package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/voiceguardian/backend/internal/engine"
)

type errMsg struct {
	Error string `json:"error"`
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

/* -------------------------------------------------------------------------- */
/*  Endpoints                                                                  */
/* -------------------------------------------------------------------------- */

func health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":  "ok",
		"service": "voice-guardian",
		"version": "v2.6.1",
	})
}

func statsHandler(d Deps) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, d.Store.Snapshot())
	}
}

func defconGet(d Deps) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{
			"level": d.Store.Defcon(),
		})
	}
}

func defconSet(d Deps) http.HandlerFunc {
	type req struct {
		Level int `json:"level"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		var body req
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeJSON(w, http.StatusBadRequest, errMsg{Error: "invalid json"})
			return
		}
		if body.Level < 1 || body.Level > 5 {
			writeJSON(w, http.StatusBadRequest, errMsg{Error: "level must be 1..5"})
			return
		}
		d.Store.SetDefcon(body.Level)
		writeJSON(w, http.StatusOK, map[string]any{"level": d.Store.Defcon()})
	}
}

func feedRecent(d Deps) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		n := 32
		if q := r.URL.Query().Get("n"); q != "" {
			if v, err := strconv.Atoi(q); err == nil && v > 0 && v <= 256 {
				n = v
			}
		}
		writeJSON(w, http.StatusOK, d.Hub.Recent(n))
	}
}

func threatsActive(d Deps) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		// Return latest danger-level events as "active threats".
		all := d.Hub.Recent(256)
		out := make([]any, 0, 16)
		for i := len(all) - 1; i >= 0 && len(out) < 16; i-- {
			if all[i].Level == "danger" {
				out = append(out, all[i])
			}
		}
		writeJSON(w, http.StatusOK, out)
	}
}

func analyzeCall(d Deps) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req engine.Request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeJSON(w, http.StatusBadRequest, errMsg{Error: "invalid json"})
			return
		}
		if req.ShownNumber == "" {
			writeJSON(w, http.StatusBadRequest, errMsg{Error: "shownNumber required"})
			return
		}

		verdict, err := d.Engine.Analyze(r.Context(), req)
		if err != nil {
			d.Logger.Error("analyze failed", "err", err, "callId", req.CallID)
			writeJSON(w, http.StatusInternalServerError, errMsg{Error: "analysis failed"})
			return
		}
		writeJSON(w, http.StatusOK, verdict)
	}
}
