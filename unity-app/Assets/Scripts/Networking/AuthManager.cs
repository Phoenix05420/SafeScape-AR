using UnityEngine;
using SafeScapeAR.Core;
using System.Threading.Tasks;

namespace SafeScapeAR.Networking
{
    /// <summary>
    /// Manages user authentication and token storage.
    /// </summary>
    public class AuthManager : MonoBehaviour
    {
        public static AuthManager Instance { get; private set; }

        public UserData CurrentUser { get; private set; }
        
        public bool IsAuthenticated => !string.IsNullOrEmpty(PlayerPrefs.GetString(Constants.PlayerPrefsKeys.AuthToken, ""));

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        public async Task<bool> LoginAsync(string username, string password)
        {
            // Dummy auth request
            var request = new { username, password };
            var response = await APIClient.PostAsync<object, AuthResponse>(APIEndpoints.Login, request);

            if (response != null && !string.IsNullOrEmpty(response.token))
            {
                PlayerPrefs.SetString(Constants.PlayerPrefsKeys.AuthToken, response.token);
                PlayerPrefs.Save();
                return true;
            }
            return false;
        }

        public void Logout()
        {
            PlayerPrefs.DeleteKey(Constants.PlayerPrefsKeys.AuthToken);
            PlayerPrefs.Save();
            CurrentUser = null;
            Core.SceneController.Instance.LoadScene(Constants.Scenes.Startup);
        }
    }
}
