using UnityEngine;
using SafeScapeAR.Core;
using SafeScapeAR.Training;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// UI for selecting a training module.
    /// </summary>
    public class ModuleSelectUI : MonoBehaviour
    {
        public void SelectFireSafety()
        {
            // Normally load the module data from a manager, hardcoded scene load for now
            SceneController.Instance.LoadScene(Constants.Scenes.FireSafetyTraining);
        }

        public void SelectGasLeak()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.GasLeakTraining);
        }

        public void ReturnToMainMenu()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.MainMenu);
        }
    }
}
