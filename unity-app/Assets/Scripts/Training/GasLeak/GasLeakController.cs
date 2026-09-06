using UnityEngine;
using SafeScapeAR.AR;

namespace SafeScapeAR.Training.GasLeak
{
    /// <summary>
    /// Controls the gas leak scenario flow.
    /// </summary>
    public class GasLeakController : TrainingManager
    {
        [SerializeField] private GameObject gasCloudPrefab;
        private GameObject currentGasCloud;
        private PPESelector ppeSelector;

        protected override void ExecuteStepLogic(TrainingStep step)
        {
            switch (step.Type)
            {
                case StepType.ScanEnvironment:
                    PlaneDetectionManager.Instance.TogglePlaneDetection(true);
                    break;
                case StepType.HazardDetection:
                    SpawnGasCloud();
                    break;
                case StepType.EquipmentSelection:
                    if (ppeSelector != null)
                        ppeSelector.ShowPanel();
                    break;
                case StepType.ActionExecution:
                    // Determine if restricted area is identified
                    break;
                case StepType.Evacuation:
                    // Evacuation route away from gas
                    break;
            }
        }

        protected override void CheckStepConditions()
        {
            var step = currentModule.Steps[currentStepIndex];
            if (step.TimeLimitSeconds > 0 && stepTimer >= step.TimeLimitSeconds)
            {
                CompleteCurrentStep(false);
            }
        }

        private void SpawnGasCloud()
        {
            var plane = PlaneDetectionManager.Instance.GetFirstHorizontalPlane();
            if (plane != null)
            {
                currentGasCloud = ARObjectPlacer.Instance.PlaceObject(plane.center, Quaternion.identity, gasCloudPrefab);
                PlaneDetectionManager.Instance.TogglePlaneDetection(false);
            }
        }

        public void OnPPESelected(bool isCorrect)
        {
            if (ppeSelector != null) ppeSelector.HidePanel();
            CompleteCurrentStep(isCorrect);
        }
    }
}
