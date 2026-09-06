using UnityEngine;
using SafeScapeAR.Core;

namespace SafeScapeAR.Localization
{
    /// <summary>
    /// UI logic for language selection.
    /// </summary>
    public class LanguageSelector : MonoBehaviour
    {
        public void SelectEnglish()
        {
            SetLanguage("en");
        }

        public void SelectHindi()
        {
            SetLanguage("hi");
        }

        public void SelectSantali()
        {
            SetLanguage("sat");
        }

        private void SetLanguage(string code)
        {
            LocalizationManager.Instance.SetLanguage(code);
            SceneController.Instance.LoadScene(Constants.Scenes.MainMenu);
        }
    }
}
