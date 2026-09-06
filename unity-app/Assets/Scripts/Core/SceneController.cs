using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;
using System;
using UnityEngine.UI;
using TMPro;

namespace SafeScapeAR.Core
{
    /// <summary>
    /// Manages scene transitions and loading screens.
    /// </summary>
    public class SceneController : MonoBehaviour
    {
        public static SceneController Instance { get; private set; }

        [SerializeField] private GameObject loadingScreen;
        [SerializeField] private Slider progressBar;
        [SerializeField] private TextMeshProUGUI loadingText;

        public event Action<string> OnSceneLoaded;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                if (loadingScreen != null)
                    loadingScreen.SetActive(false);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        /// <summary>
        /// Loads a scene asynchronously with a loading screen.
        /// </summary>
        /// <param name="sceneName">Name of the scene to load.</param>
        public void LoadScene(string sceneName)
        {
            StartCoroutine(LoadSceneAsync(sceneName));
        }

        private IEnumerator LoadSceneAsync(string sceneName)
        {
            if (loadingScreen != null)
                loadingScreen.SetActive(true);

            AsyncOperation operation = SceneManager.LoadSceneAsync(sceneName);
            operation.allowSceneActivation = false;

            while (!operation.isDone)
            {
                float progress = Mathf.Clamp01(operation.progress / 0.9f);
                if (progressBar != null)
                    progressBar.value = progress;
                
                if (loadingText != null)
                    loadingText.text = $"Loading... {(progress * 100):0}%";

                if (operation.progress >= 0.9f)
                {
                    // Add slight delay for smoother transition
                    yield return new WaitForSeconds(0.5f);
                    operation.allowSceneActivation = true;
                }

                yield return null;
            }

            if (loadingScreen != null)
                loadingScreen.SetActive(false);
                
            OnSceneLoaded?.Invoke(sceneName);
        }
    }
}
