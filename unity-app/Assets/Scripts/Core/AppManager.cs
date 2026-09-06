using UnityEngine;
using UnityEngine.SceneManagement;
using System;
using SafeScapeAR.Networking;
using SafeScapeAR.Offline;
using SafeScapeAR.Localization;

namespace SafeScapeAR.Core
{
    /// <summary>
    /// Singleton application manager handling initialization, global state, and lifecycle.
    /// </summary>
    public class AppManager : MonoBehaviour
    {
        public static AppManager Instance { get; private set; }

        [SerializeField] private string startScene = Constants.Scenes.LanguageSelect;

        public bool IsOfflineMode { get; set; } = false;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                InitializeApp();
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void InitializeApp()
        {
            Application.targetFrameRate = 60;
            Screen.sleepTimeout = SleepTimeout.NeverSleep;
        }

        private void Start()
        {
            if (SceneManager.GetActiveScene().name == "Startup")
            {
                SceneController.Instance.LoadScene(startScene);
            }
        }

        /// <summary>
        /// Exits the application safely.
        /// </summary>
        public void QuitApplication()
        {
            Debug.Log("Quitting Application...");
            Application.Quit();
        }
    }
}
