using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SafeScapeAR.Networking;

namespace SafeScapeAR.Offline
{
    /// <summary>
    /// Handles syncing offline data with the remote server.
    /// </summary>
    public class SyncManager : MonoBehaviour
    {
        public static SyncManager Instance { get; private set; }

        private bool isSyncing = false;

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        private void Start()
        {
            ConnectivityChecker.Instance.OnConnectivityChanged += HandleConnectivityChanged;
        }

        private void HandleConnectivityChanged(bool isOnline)
        {
            if (isOnline && !isSyncing)
            {
                StartCoroutine(SyncDataRoutine());
            }
        }

        public void ForceSync()
        {
            if (ConnectivityChecker.Instance.IsOnline && !isSyncing)
            {
                StartCoroutine(SyncDataRoutine());
            }
        }

        private IEnumerator SyncDataRoutine()
        {
            isSyncing = true;
            
            var pending = OfflineDataManager.Instance.GetPendingSessions();
            if (pending.Count > 0)
            {
                Debug.Log($"Syncing {pending.Count} sessions...");
                // Note: API integration logic goes here
                // e.g., yield return APIClient.PostAsync(...)
                
                // On success:
                OfflineDataManager.Instance.ClearPendingSessions();
            }

            isSyncing = false;
            yield return null;
        }
    }
}
