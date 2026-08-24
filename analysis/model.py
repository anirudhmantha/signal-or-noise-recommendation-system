"""Transparent context-aware ranking benchmark used by the case study."""
from pathlib import Path
import pandas as pd

DATA = Path(__file__).parents[1] / "data/listening_events_sample.csv"
df = pd.read_csv(DATA)
df["baseline_score"] = df["completion_rate"]
df["intent_score"] = (df["saved"]*.94 + df["repeated_within_7d"]*.82 + df["playlist_add"]*.76 + df["completion_rate"]*.68)
df["context_multiplier"] = df["session_context"].map({"intentional":1.0,"workout":.8,"party":.55,"focus":.35,"sleep":.18,"shared_account":.22,"autoplay":.28})
df["taste_score"] = df["intent_score"] * df["context_multiplier"]

summary = df.groupby("session_context").agg(events=("event_id","count"),save_rate=("saved","mean"),skip_rate=("skipped","mean"),avg_taste_score=("taste_score","mean")).sort_values("avg_taste_score",ascending=False)
print(summary.round(3).to_string())
