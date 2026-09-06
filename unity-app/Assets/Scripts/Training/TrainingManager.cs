using UnityEngine;
using System.Collections.Generic;

namespace SafeScapeAR.Training
{
    /// <summary>
    /// Base class for managing the flow of a training module.
    /// </summary>
    public abstract class TrainingManager : MonoBehaviour
    {
        [SerializeField] protected TrainingModule currentModule;
        
        protected int currentStepIndex = 0;
        protected float stepTimer = 0f;
        protected bool isTrainingActive = false;

        public event System.Action<TrainingStep> OnStepStarted;
        public event System.Action<TrainingStep, bool> OnStepCompleted; // bool = passed

        protected virtual void Start()
        {
            if (currentModule != null)
            {
                StartTraining();
            }
        }

        protected virtual void Update()
        {
            if (isTrainingActive && currentStepIndex < currentModule.Steps.Count)
            {
                stepTimer += Time.deltaTime;
                CheckStepConditions();
            }
        }

        public virtual void StartTraining()
        {
            Core.GameState.CurrentModule = currentModule;
            Core.GameState.SessionStartTime = System.DateTime.Now;
            Core.GameState.CurrentSessionId = System.Guid.NewGuid().ToString();
            
            isTrainingActive = true;
            currentStepIndex = 0;
            StartCurrentStep();
        }

        protected virtual void StartCurrentStep()
        {
            if (currentStepIndex < currentModule.Steps.Count)
            {
                stepTimer = 0f;
                var step = currentModule.Steps[currentStepIndex];
                OnStepStarted?.Invoke(step);
                ExecuteStepLogic(step);
            }
            else
            {
                EndTraining();
            }
        }

        protected abstract void ExecuteStepLogic(TrainingStep step);
        protected abstract void CheckStepConditions();

        public virtual void CompleteCurrentStep(bool success)
        {
            var step = currentModule.Steps[currentStepIndex];
            OnStepCompleted?.Invoke(step, success);
            
            currentStepIndex++;
            StartCurrentStep();
        }

        protected virtual void EndTraining()
        {
            isTrainingActive = false;
            // Transition to assessment scene
            Core.SceneController.Instance.LoadScene(Core.Constants.Scenes.Assessment);
        }
    }
}
