namespace SafeScapeAR.Core
{
    /// <summary>
    /// Global constants for the application.
    /// </summary>
    public static class Constants
    {
        public static class Scenes
        {
            public const string Startup = "Startup";
            public const string MainMenu = "MainMenu";
            public const string LanguageSelect = "LanguageSelect";
            public const string ModuleSelect = "ModuleSelect";
            public const string FireSafetyTraining = "FireSafetyTraining";
            public const string GasLeakTraining = "GasLeakTraining";
            public const string Assessment = "Assessment";
            public const string Certificate = "Certificate";
            public const string Settings = "Settings";
        }

        public static class Assessment
        {
            public const float PassingScoreThreshold = 80.0f;
        }
        
        public static class PlayerPrefsKeys
        {
            public const string Language = "App_Language";
            public const string AuthToken = "Auth_Token";
            public const string OfflineMode = "Offline_Mode";
        }
    }
}
