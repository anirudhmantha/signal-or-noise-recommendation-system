# Anirudh's Project Notes

## The project in one sentence

I studied how background listening can confuse a music recommendation system, then simulated a ranking approach that gives more importance to deliberate user actions.

## The problem

Music apps learn from listening history. The difficulty is that not every play means “I like this song.” Someone may be sleeping, concentrating, hosting a party, sharing an account, or letting autoplay continue.

If all those plays count equally, the system may recommend more background music instead of music the listener genuinely enjoys.

## Stronger preference signals

- Saving a song
- Replaying it
- Adding it to a playlist
- Searching for it
- Finishing most of the track

## Weaker preference signals

- Passive autoplay
- Very long sleep sessions
- Focus playlists
- Shared-account activity
- Background listening

Weak evidence is not useless. It simply receives less influence.

## Main result

- Baseline precision: 72.4%
- Context-aware precision: 84.7%
- Difference: 12.3 percentage points

This result comes from synthetic data. Say “the simulation produced” rather than “Spotify achieved.”

## Why I did not delete noisy sessions

Sleep and focus listening still contain useful information. Deleting them would throw information away. Down-weighting is more balanced because it preserves history while controlling its influence.

## My proposed feature

Tune My Taste would let a listener say:

> Keep this activity in my history, but do not let it strongly influence my recommendations.

The control could work for a session, playlist, device, or shared profile.

## How I would test it

- Control group: existing recommendation approach
- Treatment group: context-aware ranking and Tune My Taste
- Main metric: qualified save rate
- Safety checks: listening time, artist diversity, skips, complaints, and opt-outs

## Interview answer

I built a Spotify-inspired product analytics case study around a problem I have personally noticed: listening history is not always the same as musical taste. Sleep playlists, autoplay, and shared accounts can create misleading preference signals. I generated synthetic listening events, analyzed the behavior with SQL and Python, and compared a baseline ranker with a context-aware scoring approach. The simulation improved precision from 72.4% to 84.7%. I then turned the finding into a product proposal called Tune My Taste and designed an experiment to test it responsibly.

## Honest wording

Say:

- I built a Spotify-inspired case study.
- I used synthetic listening data.
- The simulation produced a 12.3-point lift.
- I proposed a product feature and experiment.

Do not say:

- I worked for Spotify.
- I used Spotify customer data.
- I changed Spotify's production algorithm.
- Real customers experienced this improvement.

## Questions to prepare

### Why precision at 10?

It measures how many relevant songs appear in the first ten recommendations, which represents the part of a list users are most likely to notice.

### Why synthetic data?

Real platform listening data is private. Synthetic data allowed me to build a reproducible demonstration while documenting every assumption.

### Biggest limitation?

The context labels and behavior patterns are simplified. A production model would need real behavioral validation and an online controlled experiment.

### What would I build next?

I would add device type and time-of-day features, evaluate genre fairness, and prototype the Tune My Taste interaction with user feedback.
