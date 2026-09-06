using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using System.Collections.Generic;

namespace SafeScapeAR.AR
{
    /// <summary>
    /// Places virtual objects on AR planes.
    /// </summary>
    [RequireComponent(typeof(ARRaycastManager))]
    public class ARObjectPlacer : MonoBehaviour
    {
        public static ARObjectPlacer Instance { get; private set; }

        private ARRaycastManager raycastManager;
        private List<ARRaycastHit> hits = new List<ARRaycastHit>();

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
            
            raycastManager = GetComponent<ARRaycastManager>();
        }

        /// <summary>
        /// Attempts to place an object at the screen touch position.
        /// </summary>
        public GameObject PlaceObjectAtTouch(Vector2 touchPosition, GameObject prefab)
        {
            if (raycastManager.Raycast(touchPosition, hits, TrackableType.PlaneWithinPolygon))
            {
                var hitPose = hits[0].pose;
                return Instantiate(prefab, hitPose.position, hitPose.rotation);
            }
            return null;
        }

        /// <summary>
        /// Places an object at a specific world position and rotation.
        /// </summary>
        public GameObject PlaceObject(Vector3 position, Quaternion rotation, GameObject prefab)
        {
            return Instantiate(prefab, position, rotation);
        }
    }
}
