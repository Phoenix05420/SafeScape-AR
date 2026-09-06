using UnityEngine;

namespace SafeScapeAR.Training.GasLeak
{
    /// <summary>
    /// Visualizes danger zone boundary for the gas leak.
    /// </summary>
    public class DangerZoneVisualizer : MonoBehaviour
    {
        [SerializeField] private LineRenderer lineRenderer;
        [SerializeField] private int segments = 50;
        [SerializeField] private float radius = 2f;

        private void Start()
        {
            DrawCircle();
        }

        private void DrawCircle()
        {
            if (lineRenderer == null) return;

            lineRenderer.positionCount = segments + 1;
            lineRenderer.useWorldSpace = false;

            float angle = 20f;

            for (int i = 0; i < (segments + 1); i++)
            {
                float x = Mathf.Sin(Mathf.Deg2Rad * angle) * radius;
                float z = Mathf.Cos(Mathf.Deg2Rad * angle) * radius;

                lineRenderer.SetPosition(i, new Vector3(x, 0, z));

                angle += (360f / segments);
            }
        }

        private void Update()
        {
            // Pulsing animation
            if (lineRenderer != null)
            {
                float alpha = (Mathf.Sin(Time.time * 2f) + 1f) * 0.5f;
                Color startColor = lineRenderer.startColor;
                startColor.a = Mathf.Lerp(0.2f, 0.8f, alpha);
                lineRenderer.startColor = startColor;
                lineRenderer.endColor = startColor;
            }
        }
    }
}
