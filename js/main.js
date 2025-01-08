document.addEventListener("DOMContentLoaded", () => {
  const proceedButton = document.getElementById("proceed-btn");
  const feedbackMessage = document.getElementById("feedback-message");

  proceedButton.addEventListener("click", async () => {
    const currency = document.getElementById("currency").value;
    const amount = parseFloat(document.getElementById("amount").value).toFixed(2);

    // Clear previous messages
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";

    if (!amount || amount <= 0) {
      feedbackMessage.textContent = "Please enter a valid amount.";
      feedbackMessage.className = "error-message";
      return;
    }

    try {
      const deviceInfo = navigator.userAgent; // Fetch device info
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currency, amount, deviceInfo }),
      });

      const result = await response.json();

      if (result.success) {
        feedbackMessage.textContent = `Payment successful! Transaction ID: ${result.transactionId}`;
        feedbackMessage.className = "success-message";
      } else {
        feedbackMessage.textContent = result.message || "Payment failed.";
        feedbackMessage.className = "error-message";
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      feedbackMessage.textContent = "An error occurred while processing your payment.";
      feedbackMessage.className = "error-message";
    }
  });
});
