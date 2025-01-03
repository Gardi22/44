document.getElementById("payment-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const currency = document.getElementById("currency").value;
  const amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch("/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currency, amount }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Payment processed successfully!");
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("An error occurred while processing your payment.");
  }
});
