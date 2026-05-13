// Package api wires HTTP endpoints onto chi.
package api

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/voiceguardian/backend/internal/engine"
	"github.com/voiceguardian/backend/internal/feed"
	"github.com/voiceguardian/backend/internal/store"
)

// Deps bundles handler dependencies — passed by value, share-by-pointer.
type Deps struct {
	Logger *slog.Logger
	Store  *store.Store
	Hub    *feed.Hub
	Engine *engine.Engine
}

// NewRouter returns a chi router with /api/v1/* mounted.
func NewRouter(d Deps) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(loggingMiddleware(d.Logger))
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))
	r.Use(corsMiddleware)

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/health", health)
		r.Get("/stats", statsHandler(d))
		r.Get("/defcon", defconGet(d))
		r.Post("/defcon", defconSet(d))
		r.Get("/feed", feedRecent(d))
		r.Get("/feed/stream", feedStream(d))
		r.Get("/threats", threatsActive(d))
		r.Post("/analyze", analyzeCall(d))
	})

	r.NotFound(func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusNotFound, errMsg{Error: "not found"})
	})

	return r
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Last-Event-ID")
		w.Header().Set("Access-Control-Expose-Headers", "X-Request-Id")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func loggingMiddleware(log *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
			next.ServeHTTP(ww, r)
			log.Info("http",
				"method", r.Method,
				"path", r.URL.Path,
				"status", ww.Status(),
				"bytes", ww.BytesWritten(),
				"dur_ms", time.Since(start).Milliseconds(),
				"rid", middleware.GetReqID(r.Context()),
			)
		})
	}
}
