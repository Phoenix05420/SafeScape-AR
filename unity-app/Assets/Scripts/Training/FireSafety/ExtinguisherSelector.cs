using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

namespace SafeScapeAR.Training.FireSafety
{
    /// <summary>
    /// UI panel to select an extinguisher.
    /// </summary>
    public class ExtinguisherSelector : MonoBehaviour
    {
        [SerializeField] private GameObject panel;
        [SerializeField] private FireSafetyController controller;

        private void Start()
        {
            HidePanel();
        }

        public void ShowPanel()
        {
            panel.SetActive(true);
        }

        public void HidePanel()
        {
            panel.SetActive(false);
        }

        /// <summary>
        /// Called via UI Button click.
        /// </summary>
        public void SelectExtinguisher(string type)
        {
            if (controller != null)
            {
                controller.OnExtinguisherSelected(type);
            }
        }
    }
}
