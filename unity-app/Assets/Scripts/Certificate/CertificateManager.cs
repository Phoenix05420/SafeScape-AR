using UnityEngine;
using System;
using System.IO;

namespace SafeScapeAR.Certificate
{
    /// <summary>
    /// Generates and manages digital certificates.
    /// </summary>
    public class CertificateManager : MonoBehaviour
    {
        public static CertificateManager Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        public string GenerateCertificateId()
        {
            return $"CERT-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}";
        }

        public void SaveCertificateLocal(Texture2D certificateTexture, string certId)
        {
            byte[] bytes = certificateTexture.EncodeToPNG();
            string path = Path.Combine(Application.persistentDataPath, $"{certId}.png");
            File.WriteAllBytes(path, bytes);
            Debug.Log($"Certificate saved to {path}");
        }
    }
}
