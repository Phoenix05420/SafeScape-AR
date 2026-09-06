using UnityEngine;
using System.Collections.Generic;

namespace SafeScapeAR.Audio
{
    /// <summary>
    /// Plays localized voice guidance during training.
    /// </summary>
    public class VoiceGuidanceController : MonoBehaviour
    {
        [SerializeField] private AudioSource voiceSource;

        private Queue<AudioClip> clipQueue = new Queue<AudioClip>();

        private void Update()
        {
            if (voiceSource != null && !voiceSource.isPlaying && clipQueue.Count > 0)
            {
                voiceSource.clip = clipQueue.Dequeue();
                voiceSource.Play();
            }
        }

        public void PlayGuidance(AudioClip clip)
        {
            if (clip != null)
            {
                clipQueue.Enqueue(clip);
            }
        }

        public void StopGuidance()
        {
            if (voiceSource != null) voiceSource.Stop();
            clipQueue.Clear();
        }
    }
}
