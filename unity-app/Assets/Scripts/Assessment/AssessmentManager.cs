using UnityEngine;
using System.Collections.Generic;
using SafeScapeAR.Core;

namespace SafeScapeAR.Assessment
{
    /// <summary>
    /// Manages the assessment process and calculates scores.
    /// </summary>
    public class AssessmentManager : MonoBehaviour
    {
        public static AssessmentManager Instance { get; private set; }

        private List<TaskResult> sessionResults = new List<TaskResult>();

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        public void RecordTaskResult(TaskResult result)
        {
            sessionResults.Add(result);
        }

        public void FinalizeAssessment()
        {
            float totalScore = ScoreCalculator.CalculateFinalScore(sessionResults);
            GameState.CurrentScore = totalScore;
            
            bool passed = totalScore >= Constants.Assessment.PassingScoreThreshold;

            // TODO: Save to offline storage and sync queue

            if (passed)
            {
                SceneController.Instance.LoadScene(Constants.Scenes.Certificate);
            }
            else
            {
                // Show failed UI in assessment scene
            }
        }
        
        public List<TaskResult> GetResults()
        {
            return sessionResults;
        }

        public void ClearResults()
        {
            sessionResults.Clear();
        }
    }
}
