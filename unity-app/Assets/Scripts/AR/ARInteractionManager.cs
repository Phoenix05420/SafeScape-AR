using UnityEngine;
using UnityEngine.EventSystems;

namespace SafeScapeAR.AR
{
    /// <summary>
    /// Handles interactions (taps, drags) with AR objects.
    /// </summary>
    public class ARInteractionManager : MonoBehaviour
    {
        public static ARInteractionManager Instance { get; private set; }

        public delegate void ObjectTappedAction(GameObject tappedObject);
        public event ObjectTappedAction OnObjectTapped;

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        private void Update()
        {
            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                // Prevent interaction if UI is tapped
                if (EventSystem.current.IsPointerOverGameObject(touch.fingerId)) return;

                if (touch.phase == TouchPhase.Began)
                {
                    Ray ray = Camera.main.ScreenPointToRay(touch.position);
                    if (Physics.Raycast(ray, out RaycastHit hit))
                    {
                        OnObjectTapped?.Invoke(hit.collider.gameObject);
                    }
                }
            }
        }
    }
}
