using UnityEngine;
using System.Collections.Generic;
using System;
using System.IO;
using SafeScapeAR.Core;
using Newtonsoft.Json;

namespace SafeScapeAR.Localization
{
    /// <summary>
    /// Manages loading and providing localized strings.
    /// </summary>
    public class LocalizationManager : MonoBehaviour
    {
        public static LocalizationManager Instance { get; private set; }

        public event Action OnLanguageChanged;

        public string CurrentLanguage { get; private set; } = "en";

        private Dictionary<string, string> localizedStrings;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                LoadSavedLanguage();
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void LoadSavedLanguage()
        {
            CurrentLanguage = PlayerPrefs.GetString(Constants.PlayerPrefsKeys.Language, "en");
            LoadLocalizationData(CurrentLanguage);
        }

        public void SetLanguage(string langCode)
        {
            CurrentLanguage = langCode;
            PlayerPrefs.SetString(Constants.PlayerPrefsKeys.Language, langCode);
            PlayerPrefs.Save();
            
            LoadLocalizationData(langCode);
            OnLanguageChanged?.Invoke();
        }

        private void LoadLocalizationData(string langCode)
        {
            TextAsset textAsset = Resources.Load<TextAsset>($"Localization/{langCode}");
            if (textAsset != null)
            {
                localizedStrings = JsonConvert.DeserializeObject<Dictionary<string, string>>(textAsset.text);
            }
            else
            {
                Debug.LogError($"Localization file for {langCode} not found!");
                localizedStrings = new Dictionary<string, string>();
            }
        }

        public string GetString(string key)
        {
            if (localizedStrings != null && localizedStrings.TryGetValue(key, out string value))
            {
                return value;
            }
            return $"[{key}]";
        }
    }
}
