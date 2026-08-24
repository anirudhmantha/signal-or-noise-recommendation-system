# Data dictionary

The bundled CSV is a reproducible 12,000-row synthetic sample. Run `analysis/generate_data.py --events 1280000` for the portfolio-scale dataset described in the interface.

| Field | Meaning |
|---|---|
| event_id | Unique play event |
| user_id, track_id, artist_id | Synthetic entity identifiers |
| timestamp_utc | Event time |
| genre | Simulated content category |
| session_context | Inferred listening intent |
| play_source | Search, library, playlist, radio, autoplay, or recommendation |
| completion_rate | Share of track completed, 0–1 |
| saved, skipped, playlist_add | Explicit outcome flags |
| repeated_within_7d | Repeat-listen flag |
| explicit_intent | High-intent behavioral indicator |
| low_intent_context | Potential contextual-noise indicator |

Synthetic data avoids exposing personal listening histories. Values are illustrative and must not be represented as Spotify results.
