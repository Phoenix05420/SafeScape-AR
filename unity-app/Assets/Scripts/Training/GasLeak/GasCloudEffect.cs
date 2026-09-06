using UnityEngine;

namespace SafeScapeAR.Training.GasLeak
{
    /// <summary>
    /// Controls the gas cloud visuals (expansion, color severity).
    /// </summary>
    public class GasCloudEffect : MonoBehaviour
    {
        [SerializeField] private ParticleSystem gasParticles;
        [SerializeField] private float expansionRate = 0.05f;
        [SerializeField] private float maxScale = 5f;

        private void Update()
        {
            if (transform.localScale.x < maxScale)
            {
                transform.localScale += Vector3.one * expansionRate * Time.deltaTime;
                UpdateColorByScale();
            }
        }

        private void UpdateColorByScale()
        {
            if (gasParticles != null)
            {
                var main = gasParticles.main;
                float normalizedScale = transform.localScale.x / maxScale;
                
                // Color mapping: Green -> Yellow -> Red
                Color targetColor = Color.Lerp(Color.green, Color.red, normalizedScale);
                targetColor.a = 0.5f; // Keep it translucent
                main.startColor = targetColor;
            }
        }
    }
}
