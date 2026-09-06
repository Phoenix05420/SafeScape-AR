using UnityEngine;
using System.Collections.Generic;

namespace SafeScapeAR.Training
{
    public enum ModuleType
    {
        FireSafety,
        GasLeak,
        ElectricalSafety
    }

    /// <summary>
    /// Defines a training module configuration.
    /// </summary>
    [CreateAssetMenu(fileName = "NewTrainingModule", menuName = "SafeScape/Training Module")]
    public class TrainingModule : ScriptableObject
    {
        public string ModuleId;
        public string Title;
        [TextArea(3, 5)]
        public string Description;
        public ModuleType Type;
        public string Difficulty;
        public float PassingScoreThreshold = 80f;
        public List<TrainingStep> Steps = new List<TrainingStep>();
    }
}
