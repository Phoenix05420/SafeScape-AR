using System.Collections.Generic;
using System.Linq;

namespace SafeScapeAR.Assessment
{
    /// <summary>
    /// Calculates the final score based on task results.
    /// </summary>
    public static class ScoreCalculator
    {
        public static float CalculateFinalScore(List<TaskResult> results)
        {
            if (results == null || results.Count == 0) return 0f;

            float totalEarned = results.Sum(r => r.PointsEarned);
            float totalPossible = results.Sum(r => r.PointsPossible);

            if (totalPossible <= 0) return 0f;

            return (totalEarned / totalPossible) * 100f;
        }
    }
}
