# Signal or Noise


Signal or Noise is an independent product analytics case study about a problem I noticed in music recommendations: listening history records what played, but it does not always explain why it played.

A sleep playlist, focus session, party, autoplay queue, or shared account can dominate a listener's history even when it does not represent their genuine taste. I built this project to explore whether recommendation quality could improve when intentional actions carry more influence than passive listening.

## The question I explored

> Should an eight-hour sleep playlist shape future recommendations as much as a song someone searched for, saved, and replayed?

My hypothesis was that a context-aware ranking approach would produce more relevant recommendations without deleting useful listening history.

## What I built

- An interactive case-study interface
- A reproducible synthetic listening-event generator
- A 12,000-row sample dataset and data dictionary
- SQL queries for behavioral diagnosis
- A Python ranking simulation
- Reproducible charts
- A product recommendation and experiment plan

## Main simulated finding

The baseline ranking reached **72.4% precision at 10**. The context-aware simulation reached **84.7%**, an improvement of **12.3 percentage points**.

The same run showed:

- Save rate increased by 5.6 percentage points
- Discovery rate increased by 7.3 percentage points
- Skip rate decreased by 10.4 percentage points

These are offline findings from synthetic data. They show that the idea is worth testing; they do not prove real-world customer impact.

## My approach, in plain terms

1. I generated synthetic listening events across several user contexts.
2. I compared intentional actions such as saves and repeat plays with passive behavior such as autoplay and sleep sessions.
3. I used SQL to profile behavior and Python to create session-level features.
4. I compared a basic ranking approach with a context-aware score.
5. I evaluated precision, discovery, saves, skips, and segment performance.
6. I translated the result into a product idea and test plan.

## Product recommendation

I propose a user-facing **Tune My Taste** control. It would let listeners exclude a session, playlist, or shared profile from future recommendations without deleting their listening history.

Before release, I would run a controlled experiment:

- **Control:** the current ranking approach
- **Treatment:** context-aware ranking plus Tune My Taste
- **Primary metric:** qualified save rate
- **Safety checks:** listening time, artist diversity, complaints, and opt-outs

## Run the website on Windows

Open the project folder in VS Code, open the terminal, and run:

```powershell
npm install
npm run dev
```

Open the local address shown in the terminal. Keep the terminal running while viewing the site.

## Run the analysis

```powershell
python -m pip install -r requirements.txt
python analysis/generate_data.py
python analysis/model.py
python analysis/create_charts.py
```

To generate the portfolio-scale dataset:

```powershell
python analysis/generate_data.py --events 1280000 --out data/listening_events_full.csv
```

## Important limitations

- The data is synthetic and contains no real Spotify customers.
- This project is Spotify-inspired but is not affiliated with Spotify.
- The weights are modeling assumptions that would require calibration with real data.
- Offline ranking improvements do not prove causal product impact.
- Shared accounts require transparent, privacy-conscious controls.

## Tools used

TypeScript, React, Vinext, Python, pandas, scikit-learn, SQL, and data visualization.
