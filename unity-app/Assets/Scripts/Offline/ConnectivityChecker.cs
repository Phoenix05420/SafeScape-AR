using UnityEngine;
using System.Collections;
using System;
using UnityEngine.Networking;

namespace SafeScapeAR.Offline
{
    /// <summary>
    /// Periodically checks internet connectivity.
    /// </summary>
    public class ConnectivityChecker : MonoBehaviour
    {
        public static ConnectivityChecker Instance { get; private set; }

        public bool IsOnline { get; private set; } = false;
        public event Action<bool> OnConnectivityChanged;

        [SerializeField] private float checkInterval = 5f;
        [SerializeField] private string pingUrl = "https://8.8.8.8";

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

        private void Start()
        {
            StartCoroutine(CheckConnectivityRoutine());
        }

        private IEnumerator CheckConnectivityRoutine()
        {
            while (true)
            {
                bool previousState = IsOnline;

                if (Application.internetReachability == NetworkReachability.NotReachable)
                {
                    IsOnline = false;
                }
                else
                {
                    using (UnityWebRequest request = UnityWebRequest.Head(pingUrl))
                    {
                        request.timeout = 3;
                        yield return request.SendWebRequest();

                        IsOnline = request.result == UnityWebRequest.Result.Success;
                    }
                }

                if (IsOnline != previousState)
                {
                    OnConnectivityChanged?.Invoke(IsOnline);
                }

                yield return new WaitForSeconds(checkInterval);
            }
        }
    }
}
