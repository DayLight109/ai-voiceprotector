// Voice Guardian backend — entry point.
//
// Provides REST + SSE endpoints powering the Threat Operations Console:
//   GET  /api/v1/health
//   GET  /api/v1/stats
//   GET  /api/v1/defcon
//   GET  /api/v1/feed
//   GET  /api/v1/feed/stream   (text/event-stream)
//   GET  /api/v1/threats
//   POST /api/v1/analyze
package main

import (
	"context"
	"errors"
	"flag"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/voiceguardian/backend/internal/api"
	"github.com/voiceguardian/backend/internal/engine"
	"github.com/voiceguardian/backend/internal/feed"
	"github.com/voiceguardian/backend/internal/store"
)

func main() {
	addr := flag.String("addr", ":8080", "listen address")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
	slog.SetDefault(logger)

	st := store.New()
	hub := feed.NewHub(logger)
	eng := engine.New(logger)

	// Simulated event generator — feeds the live console.
	simCtx, simCancel := context.WithCancel(context.Background())
	defer simCancel()
	go feed.Simulate(simCtx, hub, st, logger)

	router := api.NewRouter(api.Deps{
		Logger: logger,
		Store:  st,
		Hub:    hub,
		Engine: eng,
	})

	srv := &http.Server{
		Addr:              *addr,
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      0, // SSE streams; per-handler control instead
		IdleTimeout:       60 * time.Second,
	}

	// Graceful shutdown on SIGINT / SIGTERM.
	go func() {
		logger.Info("voice guardian backend listening", "addr", *addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("server error", "err", err)
			os.Exit(1)
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
	<-sig
	logger.Info("shutdown signal received")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("graceful shutdown failed", "err", err)
	}
	logger.Info("bye")
}
