-- Signal or Noise: core analytical questions (DuckDB/PostgreSQL-compatible)

-- 1. Which contexts contain the weakest preference signals?
SELECT session_context,
       COUNT(*) AS events,
       ROUND(AVG(saved) * 100, 2) AS save_rate_pct,
       ROUND(AVG(skipped) * 100, 2) AS skip_rate_pct,
       ROUND(AVG(completion_rate) * 100, 2) AS completion_pct
FROM listening_events
GROUP BY 1
ORDER BY save_rate_pct DESC;

-- 2. How much user history is dominated by low-intent contexts?
SELECT user_id,
       COUNT(*) AS total_events,
       SUM(low_intent_context) AS low_intent_events,
       ROUND(100.0 * SUM(low_intent_context) / COUNT(*), 2) AS low_intent_share
FROM listening_events
GROUP BY 1
HAVING COUNT(*) >= 20
ORDER BY low_intent_share DESC;

-- 3. Transparent event-level taste score.
SELECT event_id, user_id, track_id,
       (0.94 * saved + 0.82 * repeated_within_7d + 0.76 * playlist_add + 0.68 * completion_rate)
       * CASE session_context
           WHEN 'intentional' THEN 1.00 WHEN 'workout' THEN 0.80 WHEN 'party' THEN 0.55
           WHEN 'focus' THEN 0.35 WHEN 'autoplay' THEN 0.28 WHEN 'shared_account' THEN 0.22
           WHEN 'sleep' THEN 0.18 ELSE 0.50 END AS taste_score
FROM listening_events;
