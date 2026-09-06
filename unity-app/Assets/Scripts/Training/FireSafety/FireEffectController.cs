using UnityEngine;

namespace SafeScapeAR.Training.FireSafety
{
    /// <summary>
    /// Controls the visual state and logic of the fire hazard.
    /// </summary>
    public class FireEffectController : MonoBehaviour
    {
        [SerializeField] private ParticleSystem fireParticles;
        [SerializeField] private float spreadRate = 0.1f;
        [SerializeField] private float maxScale = 3f;

        private bool isExtinguishing = false;
        private Vector3 initialScale;

        private void Start()
        {
            initialScale = transform.localScale;
            if (fireParticles != null)
                fireParticles.Play();
        }

        private void Update()
        {
            if (!isExtinguishing)
            {
                // Fire grows over time
                if (transform.localScale.x < maxScale)
                {
                    transform.localScale += Vector3.one * spreadRate * Time.deltaTime;
                }
            }
        }

        /// <summary>
        /// Reduces the fire size, simulating extinguishing.
        /// </summary>
        public void Extinguish(float amount)
        {
            isExtinguishing = true;
            transform.localScale -= Vector3.one * amount * Time.deltaTime;

            if (transform.localScale.x <= 0.1f)
            {
                transform.localScale = Vector3.zero;
                if (fireParticles != null)
                    fireParticles.Stop();
                gameObject.SetActive(false);
            }
        }
    }
}
