using System;

namespace SafeScapeAR.Assessment
{
    /// <summary>
    /// Data class for a single task result.
    /// </summary>
    [Serializable]
    public class TaskResult
    {
        public string TaskName;
        public string Description;
        public bool IsCorrect;
        public float TimeTakenSeconds;
        public float PointsEarned;
        public float PointsPossible;
    }
}
