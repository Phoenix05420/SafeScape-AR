using UnityEngine;
using System.Collections.Generic;
using System.Linq;

namespace SafeScapeAR.Training.GasLeak
{
    /// <summary>
    /// UI panel to select Personal Protective Equipment (PPE).
    /// </summary>
    public class PPESelector : MonoBehaviour
    {
        [SerializeField] private GameObject panel;
        [SerializeField] private GasLeakController controller;

        private List<string> requiredPPE = new List<string> { "GasMask", "Gloves", "SafetyGoggles" };
        private HashSet<string> selectedPPE = new HashSet<string>();

        private void Start()
        {
            HidePanel();
        }

        public void ShowPanel()
        {
            selectedPPE.Clear();
            panel.SetActive(true);
        }

        public void HidePanel()
        {
            panel.SetActive(false);
        }

        /// <summary>
        /// Called when a PPE toggle is clicked.
        /// </summary>
        public void TogglePPE(string ppeName, bool isSelected)
        {
            if (isSelected)
            {
                selectedPPE.Add(ppeName);
            }
            else
            {
                selectedPPE.Remove(ppeName);
            }
        }

        /// <summary>
        /// Called when the user confirms their selection.
        /// </summary>
        public void ConfirmSelection()
        {
            bool isCorrect = requiredPPE.All(ppe => selectedPPE.Contains(ppe)) &&
                             selectedPPE.Count == requiredPPE.Count;
            
            if (controller != null)
            {
                controller.OnPPESelected(isCorrect);
            }
        }
    }
}
