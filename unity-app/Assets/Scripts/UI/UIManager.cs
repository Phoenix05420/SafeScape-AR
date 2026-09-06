using UnityEngine;
using System.Collections.Generic;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// Base class for managing general UI interactions like overlays and popups.
    /// </summary>
    public class UIManager : MonoBehaviour
    {
        public static UIManager Instance { get; private set; }

        [SerializeField] private GameObject loadingOverlay;

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

        public void ShowLoading(bool show)
        {
            if (loadingOverlay != null)
                loadingOverlay.SetActive(show);
        }

        public void ShowToast(string message)
        {
            Debug.Log($"Toast: {message}");
            // Real implementation would animate a toast prefab
        }
    }
}
