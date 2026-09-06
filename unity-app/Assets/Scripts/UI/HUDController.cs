using UnityEngine;
using TMPro;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// HUD during AR training scenarios.
    /// </summary>
    public class HUDController : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI instructionText;
        [SerializeField] private TextMeshProUGUI timerText;

        public void UpdateInstruction(string text)
        {
            if (instructionText != null)
                instructionText.text = text;
        }

        public void UpdateTimer(float timeRemaining)
        {
            if (timerText != null)
            {
                int min = Mathf.FloorToInt(timeRemaining / 60);
                int sec = Mathf.FloorToInt(timeRemaining % 60);
                timerText.text = $"{min:00}:{sec:00}";
            }
        }
    }
}
