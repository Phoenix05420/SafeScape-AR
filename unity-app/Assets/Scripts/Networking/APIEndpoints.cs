namespace SafeScapeAR.Networking
{
    /// <summary>
    /// Centralized API endpoint URLs.
    /// </summary>
    public static class APIEndpoints
    {
        public const string BaseUrl = "https://api.safescapear.com/v1";
        
        public const string Login = BaseUrl + "/auth/login";
        public const string Register = BaseUrl + "/auth/register";
        
        public const string SyncSessions = BaseUrl + "/sync/sessions";
        public const string GetModules = BaseUrl + "/modules";
        public const string GetProfile = BaseUrl + "/users/profile";
    }
}
