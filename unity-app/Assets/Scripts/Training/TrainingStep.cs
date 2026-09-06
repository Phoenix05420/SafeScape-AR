using System;

namespace SafeScapeAR.Training
{
    public enum StepType
    {
        ScanEnvironment,
        HazardDetection,
        EquipmentSelection,
        ActionExecution,
        Evacuation
    }

    /// <summary>
    /// Represents a single step in a training module.
    /// </summary>
    [Serializable]
    public class TrainingStep
    {
        public string StepId;
        public StepType Type;
        public string Description;
        public string ExpectedAction;
        public float TimeLimitSeconds;
        public float PointsPossible;
    }
}
