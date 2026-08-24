"""Generate reproducible music-listening events for the Signal or Noise case study.

The included sample uses 12,000 rows. Pass --events 1280000 for the portfolio-scale run.
No real listener data or Spotify API credentials are used.
"""
from __future__ import annotations
import argparse
from pathlib import Path
import numpy as np
import pandas as pd

GENRES = ["alt-pop", "ambient", "electronic", "indie", "hip-hop", "classical", "jazz", "dance"]
CONTEXTS = ["intentional", "focus", "sleep", "workout", "party", "shared_account", "autoplay"]
SOURCES = ["search", "library", "playlist", "radio", "autoplay", "recommendation"]

def generate(n: int, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    context = rng.choice(CONTEXTS, n, p=[.35,.16,.12,.09,.07,.09,.12])
    source = rng.choice(SOURCES, n, p=[.13,.17,.22,.11,.21,.16])
    user = rng.integers(1, 20001, n)
    genre = rng.choice(GENRES, n)
    duration = rng.integers(120, 330, n)
    low_intent = np.isin(context, ["sleep", "focus", "shared_account", "autoplay"])
    completion = np.clip(rng.beta(np.where(low_intent, 5.2, 4.1), np.where(low_intent, 1.2, 1.9)), 0, 1)
    explicit = np.isin(source, ["search", "library"]) | (context == "intentional")
    saved = rng.random(n) < np.where(explicit, .19, .035)
    skipped = rng.random(n) < np.where(explicit, .14, .34)
    playlist_add = rng.random(n) < np.where(explicit, .11, .018)
    repeated = rng.random(n) < np.where(explicit, .16, .035)
    start = pd.Timestamp("2025-01-01", tz="UTC")
    ts = start + pd.to_timedelta(rng.integers(0, 180*24*3600, n), unit="s")
    return pd.DataFrame({
        "event_id": np.arange(1, n+1), "user_id": user, "track_id": rng.integers(1, 8001, n),
        "artist_id": rng.integers(1, 2001, n), "timestamp_utc": ts, "genre": genre,
        "session_context": context, "play_source": source, "track_duration_sec": duration,
        "completion_rate": completion.round(4), "saved": saved.astype(int), "skipped": skipped.astype(int),
        "playlist_add": playlist_add.astype(int), "repeated_within_7d": repeated.astype(int),
        "explicit_intent": explicit.astype(int), "low_intent_context": low_intent.astype(int),
    })

if __name__ == "__main__":
    p = argparse.ArgumentParser(); p.add_argument("--events", type=int, default=12000); p.add_argument("--seed", type=int, default=42); p.add_argument("--out", default="data/listening_events_sample.csv")
    args = p.parse_args(); out = Path(args.out); out.parent.mkdir(parents=True, exist_ok=True)
    df = generate(args.events, args.seed); df.to_csv(out, index=False)
    print(f"wrote {len(df):,} events to {out}")
