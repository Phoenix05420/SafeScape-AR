using UnityEngine;
using TMPro;
using SafeScapeAR.Core;

namespace SafeScapeAR.Assessment
{
    /// <summary>
    /// UI controller for showing assessment results.
    /// </summary>
    public class AssessmentUI : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI scoreText;
        [SerializeField] private TextMeshProUGUI statusText;
        [SerializeField] private Transform resultsContainer;
        [SerializeField] private GameObject resultItemPrefab;

        private void Start()
        {
            PopulateResults();
        }

        private void PopulateResults()
        {
            float finalScore = GameState.CurrentScore;
            scoreText.text = $"Score: {finalScore:0}%";

            bool passed = finalScore >= Constants.Assessment.PassingScoreThreshold;
            statusText.text = passed ? "Passed!" : "Failed. Try Again.";
            statusText.color = passed ? Color.green : Color.red;

            var results = AssessmentManager.Instance.GetResults();
            foreach (var result in results)
            {
                var item = Instantiate(resultItemPrefab, resultsContainer);
                var texts = item.GetComponentsInChildren<TextMeshProUGUI>();
                if (texts.Length >= 2)
                {
                    texts[0].text = result.TaskName;
                    texts[1].text = result.IsCorrect ? "✅" : "❌";
                }
            }
        }

        public void OnContinueClicked()
        {
            if (GameState.CurrentScore >= Constants.Assessment.PassingScoreThreshold)
            {
                SceneController.Instance.LoadScene(Constants.Scenes.Certificate);
            }
            else
            {
                SceneController.Instance.LoadScene(Constants.Scenes.MainMenu);
            }
        }

        public void OnRetryClicked()
        {
            AssessmentManager.Instance.ClearResults();
            SceneController.Instance.LoadScene(Constants.Scenes.ModuleSelect);
        }
    }
}
