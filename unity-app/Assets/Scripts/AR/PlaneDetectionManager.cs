using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using System.Collections.Generic;

namespace SafeScapeAR.AR
{
    /// <summary>
    /// Manages plane detection and plane visualizer toggling.
    /// </summary>
    [RequireComponent(typeof(ARPlaneManager))]
    public class PlaneDetectionManager : MonoBehaviour
    {
        public static PlaneDetectionManager Instance { get; private set; }

        private ARPlaneManager planeManager;

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
            
            planeManager = GetComponent<ARPlaneManager>();
        }

        /// <summary>
        /// Enables or disables plane detection and visualization.
        /// </summary>
        public void TogglePlaneDetection(bool enable)
        {
            planeManager.enabled = enable;
            foreach (var plane in planeManager.trackables)
            {
                plane.gameObject.SetActive(enable);
            }
        }
        
        /// <summary>
        /// Retrieves the first detected horizontal plane for placement.
        /// </summary>
        public ARPlane GetFirstHorizontalPlane()
        {
            foreach (var plane in planeManager.trackables)
            {
                if (plane.alignment == PlaneAlignment.HorizontalUp)
                {
                    return plane;
                }
            }
            return null;
        }
    }
}
