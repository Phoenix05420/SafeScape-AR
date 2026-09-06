using UnityEngine;
using SafeScapeAR.Core;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// UI logic for the Main Menu.
    /// </summary>
    public class MainMenuUI : MonoBehaviour
    {
        public void StartTraining()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.ModuleSelect);
        }

        public void OpenCertificates()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.Certificate);
        }

        public void OpenSettings()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.Settings);
        }

        public void OpenProfile()
        {
            // Possibly a panel instead of a scene
            UIManager.Instance.ShowToast("Profile Opening...");
        }
    }
}
