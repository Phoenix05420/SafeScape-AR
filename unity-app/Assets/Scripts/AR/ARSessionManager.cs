using UnityEngine;
using UnityEngine.XR.ARFoundation;
using System.Collections;

namespace SafeScapeAR.AR
{
    /// <summary>
    /// Manages the AR session and lifecycle.
    /// </summary>
    public class ARSessionManager : MonoBehaviour
    {
        public static ARSessionManager Instance { get; private set; }

        [SerializeField] private ARSession arSession;
        [SerializeField] private ARCameraManager arCameraManager;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private IEnumerator Start()
        {
            if ((ARSession.state == ARSessionState.None) || (ARSession.state == ARSessionState.CheckingAvailability))
            {
                yield return ARSession.CheckAvailability();
            }

            if (ARSession.state == ARSessionState.Unsupported)
            {
                Debug.LogError("AR is not supported on this device.");
                // Handle unsupported device UI
            }
            else
            {
                arSession.enabled = true;
            }
        }

        public void ResetSession()
        {
            arSession.Reset();
        }
    }
}
