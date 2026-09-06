using UnityEngine;
using TMPro;

namespace SafeScapeAR.UI
{
    /// <summary>
    /// Displays worker profile information.
    /// </summary>
    public class ProfileUI : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI nameText;
        [SerializeField] private TextMeshProUGUI orgText;

        private void Start()
        {
            nameText.text = "Worker Name";
            orgText.text = "SafeScape Corp";
        }
    }
}
