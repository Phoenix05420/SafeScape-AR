using UnityEngine;
using UnityEngine.UI;
using SafeScapeAR.Core;
using SafeScapeAR.Offline;
using SafeScapeAR.Localization;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// Settings panel UI logic.
    /// </summary>
    public class SettingsUI : MonoBehaviour
    {
        [SerializeField] private Toggle offlineToggle;

        private void Start()
        {
            if (offlineToggle != null)
            {
                offlineToggle.isOn = AppManager.Instance.IsOfflineMode;
                offlineToggle.onValueChanged.AddListener(OnOfflineToggleChanged);
            }
        }

        private void OnOfflineToggleChanged(bool isOn)
        {
            AppManager.Instance.IsOfflineMode = isOn;
            PlayerPrefs.SetInt(Constants.PlayerPrefsKeys.OfflineMode, isOn ? 1 : 0);
            PlayerPrefs.Save();
        }

        public void SyncNow()
        {
            SyncManager.Instance.ForceSync();
        }

        public void Back()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.MainMenu);
        }
    }
}
