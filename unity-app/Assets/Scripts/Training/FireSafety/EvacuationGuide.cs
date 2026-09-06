using UnityEngine;
using System.Collections.Generic;
using SafeScapeAR.AR;

namespace SafeScapeAR.Training.FireSafety
{
    /// <summary>
    /// Spawns arrows leading to a safe exit.
    /// </summary>
    public class EvacuationGuide : MonoBehaviour
    {
        [SerializeField] private GameObject arrowPrefab;
        [SerializeField] private float spacing = 1.5f;
        
        private List<GameObject> activeArrows = new List<GameObject>();

        public void ShowPath()
        {
            var plane = PlaneDetectionManager.Instance.GetFirstHorizontalPlane();
            if (plane == null) return;
            
            Vector3 startPos = Camera.main.transform.position;
            startPos.y = plane.center.y; // Set to floor height

            // Dummy path straight ahead
            Vector3 direction = Camera.main.transform.forward;
            direction.y = 0;
            direction.Normalize();

            for (int i = 1; i <= 5; i++)
            {
                Vector3 pos = startPos + (direction * spacing * i);
                GameObject arrow = Instantiate(arrowPrefab, pos, Quaternion.LookRotation(direction));
                activeArrows.Add(arrow);
            }
        }

        public void ClearPath()
        {
            foreach (var arrow in activeArrows)
            {
                Destroy(arrow);
            }
            activeArrows.Clear();
        }
    }
}
