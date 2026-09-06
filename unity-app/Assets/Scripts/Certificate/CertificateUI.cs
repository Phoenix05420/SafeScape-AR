using UnityEngine;
using UnityEngine.UI;
using TMPro;
using SafeScapeAR.Core;
using System;

namespace SafeScapeAR.Certificate
{
    /// <summary>
    /// UI for displaying and sharing the certificate.
    /// </summary>
    public class CertificateUI : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI workerNameText;
        [SerializeField] private TextMeshProUGUI moduleText;
        [SerializeField] private TextMeshProUGUI dateText;
        [SerializeField] private TextMeshProUGUI scoreText;
        [SerializeField] private TextMeshProUGUI certIdText;
        [SerializeField] private RawImage qrCodeImage;

        private void Start()
        {
            GenerateAndDisplay();
        }

        private void GenerateAndDisplay()
        {
            string certId = CertificateManager.Instance.GenerateCertificateId();
            string dateStr = DateTime.Now.ToString("dd MMM yyyy");
            
            workerNameText.text = "Worker Profile"; // Ideally from user profile
            moduleText.text = GameState.CurrentModule != null ? GameState.CurrentModule.Title : "Training Module";
            dateText.text = $"Date: {dateStr}";
            scoreText.text = $"Score: {GameState.CurrentScore:0}%";
            certIdText.text = $"ID: {certId}";

            string qrData = $"{{\"id\":\"{certId}\", \"score\":{GameState.CurrentScore}}}";
            Texture2D qrTexture = QRCodeGenerator.GenerateQRCode(qrData);
            qrCodeImage.texture = qrTexture;
        }

        public void OnReturnMainMenu()
        {
            SceneController.Instance.LoadScene(Constants.Scenes.MainMenu);
        }
    }
}
