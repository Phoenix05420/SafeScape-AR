using UnityEngine;
using System.IO;
using System.Collections.Generic;
using Newtonsoft.Json;
using SafeScapeAR.Networking;

namespace SafeScapeAR.Offline
{
    /// <summary>
    /// Handles local data storage using JSON serialization.
    /// </summary>
    public class OfflineDataManager : MonoBehaviour
    {
        public static OfflineDataManager Instance { get; private set; }

        private string PendingSyncPath => Path.Combine(Application.persistentDataPath, "pending_sync.json");

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        public void SaveSessionToQueue(TrainingSessionData sessionData)
        {
            List<TrainingSessionData> queue = GetPendingSessions();
            queue.Add(sessionData);
            
            string json = JsonConvert.SerializeObject(queue);
            File.WriteAllText(PendingSyncPath, json);
        }

        public List<TrainingSessionData> GetPendingSessions()
        {
            if (File.Exists(PendingSyncPath))
            {
                string json = File.ReadAllText(PendingSyncPath);
                return JsonConvert.DeserializeObject<List<TrainingSessionData>>(json) ?? new List<TrainingSessionData>();
            }
            return new List<TrainingSessionData>();
        }

        public void ClearPendingSessions()
        {
            if (File.Exists(PendingSyncPath))
            {
                File.Delete(PendingSyncPath);
            }
        }
    }
}
