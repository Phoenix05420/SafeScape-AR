using UnityEngine;
using TMPro;

namespace SafeScapeAR.Localization
{
    /// <summary>
    /// Component to attach to TextMeshPro elements for auto-translation.
    /// </summary>
    [RequireComponent(typeof(TextMeshProUGUI))]
    public class LocalizedText : MonoBehaviour
    {
        [SerializeField] private string localizationKey;
        
        private TextMeshProUGUI textComponent;

        private void Awake()
        {
            textComponent = GetComponent<TextMeshProUGUI>();
        }

        private void Start()
        {
            UpdateText();
            LocalizationManager.Instance.OnLanguageChanged += UpdateText;
        }

        private void OnDestroy()
        {
            if (LocalizationManager.Instance != null)
            {
                LocalizationManager.Instance.OnLanguageChanged -= UpdateText;
            }
        }

        private void UpdateText()
        {
            if (!string.IsNullOrEmpty(localizationKey) && textComponent != null)
            {
                textComponent.text = LocalizationManager.Instance.GetString(localizationKey);
            }
        }
    }
}
