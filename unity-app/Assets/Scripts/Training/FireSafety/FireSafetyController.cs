using UnityEngine;
using SafeScapeAR.AR;

namespace SafeScapeAR.Training.FireSafety
{
    /// <summary>
    /// Controls the specific flow of the Fire Safety training scenario.
    /// </summary>
    public class FireSafetyController : TrainingManager
    {
        [SerializeField] private GameObject firePrefab;
        private GameObject currentFire;
        private ExtinguisherSelector extinguisherSelector;
        private EvacuationGuide evacuationGuide;

        protected override void ExecuteStepLogic(TrainingStep step)
        {
            switch (step.Type)
            {
                case StepType.ScanEnvironment:
                    PlaneDetectionManager.Instance.TogglePlaneDetection(true);
                    // Wait for user to scan planes... (handled in CheckStepConditions)
                    break;
                case StepType.HazardDetection:
                    SpawnFire();
                    break;
                case StepType.EquipmentSelection:
                    if (extinguisherSelector != null)
                        extinguisherSelector.ShowPanel();
                    break;
                case StepType.ActionExecution:
                    // Enable AR interaction to aim extinguisher
                    break;
                case StepType.Evacuation:
                    if (evacuationGuide != null)
                        evacuationGuide.ShowPath();
                    break;
            }
        }

        protected override void CheckStepConditions()
        {
            var step = currentModule.Steps[currentStepIndex];
            
            // Example timeouts/conditions
            if (step.TimeLimitSeconds > 0 && stepTimer >= step.TimeLimitSeconds)
            {
                CompleteCurrentStep(false); // Timeout means fail this step
            }
        }
        
        private void SpawnFire()
        {
            var plane = PlaneDetectionManager.Instance.GetFirstHorizontalPlane();
            if (plane != null)
            {
                currentFire = ARObjectPlacer.Instance.PlaceObject(plane.center, Quaternion.identity, firePrefab);
                PlaneDetectionManager.Instance.TogglePlaneDetection(false);
            }
        }

        public void OnExtinguisherSelected(string extinguisherType)
        {
            bool correct = (extinguisherType == "CO2"); // Assume CO2 is correct for this scenario
            if (extinguisherSelector != null)
                extinguisherSelector.HidePanel();
            
            CompleteCurrentStep(correct);
        }
    }
}
