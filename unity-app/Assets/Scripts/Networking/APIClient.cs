using UnityEngine;
using UnityEngine.Networking;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json;

namespace SafeScapeAR.Networking
{
    /// <summary>
    /// HTTP client wrapper for making API calls.
    /// </summary>
    public static class APIClient
    {
        // Simple async wrapper using UnityWebRequest and Task
        public static async Task<T> GetAsync<T>(string url, string token = null)
        {
            using (var request = UnityWebRequest.Get(url))
            {
                if (!string.IsNullOrEmpty(token))
                    request.SetRequestHeader("Authorization", $"Bearer {token}");

                var operation = request.SendWebRequest();
                while (!operation.isDone) await Task.Yield();

                if (request.result != UnityWebRequest.Result.Success)
                {
                    Debug.LogError($"GET Error: {request.error}");
                    return default;
                }

                return JsonConvert.DeserializeObject<T>(request.downloadHandler.text);
            }
        }

        public static async Task<TResponse> PostAsync<TRequest, TResponse>(string url, TRequest payload, string token = null)
        {
            string json = JsonConvert.SerializeObject(payload);
            using (var request = new UnityWebRequest(url, "POST"))
            {
                byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
                request.uploadHandler = new UploadHandlerRaw(bodyRaw);
                request.downloadHandler = new DownloadHandlerBuffer();
                request.SetRequestHeader("Content-Type", "application/json");

                if (!string.IsNullOrEmpty(token))
                    request.SetRequestHeader("Authorization", $"Bearer {token}");

                var operation = request.SendWebRequest();
                while (!operation.isDone) await Task.Yield();

                if (request.result != UnityWebRequest.Result.Success)
                {
                    Debug.LogError($"POST Error: {request.error}");
                    return default;
                }

                return JsonConvert.DeserializeObject<TResponse>(request.downloadHandler.text);
            }
        }
    }
}
