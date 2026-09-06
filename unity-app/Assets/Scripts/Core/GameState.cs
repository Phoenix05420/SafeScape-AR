using UnityEngine;
using SafeScapeAR.Training;

namespace SafeScapeAR.Core
{
    /// <summary>
    /// Holds the current session data, acting as a state container across scenes.
    /// </summary>
    public static class GameState
    {
        /// <summary>
        /// ID of the current training session.
        /// </summary>
        public static string CurrentSessionId { get; set; }

        /// <summary>
        /// The currently active training module.
        /// </summary>
        public static TrainingModule CurrentModule { get; set; }

        /// <summary>
        /// User's current score in the active module.
        /// </summary>
        public static float CurrentScore { get; set; }

        /// <summary>
        /// Timestamp when the session started.
        /// </summary>
        public static System.DateTime SessionStartTime { get; set; }

        /// <summary>
        /// Clear the current state.
        /// </summary>
        public static void ResetState()
        {
            CurrentSessionId = null;
            CurrentModule = null;
            CurrentScore = 0f;
            SessionStartTime = System.DateTime.MinValue;
        }
    }
}
