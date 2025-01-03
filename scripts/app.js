document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;

  try {
    const response = await fetch("/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("confirmation").innerHTML = `
        <p>Payment successful! Transaction ID: ${data.transactionId}</p>`;
    } else {
      document.getElementById("confirmation").innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (err) {
    document.getElementById("confirmation").innerHTML = `<p>An error occurred. Please try again.</p>`;
  }
});
