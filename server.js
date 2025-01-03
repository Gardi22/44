const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Endpoint to process payments
app.post("/process-payment", async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, error: "Invalid amount." });
  }

  try {
    // Replace the following line with your payment API logic
    const apiResponse = await processPaymentThroughAPI(amount);

    // Return the result back to the frontend
    res.json({ success: true, transactionId: apiResponse.transactionId });
  } catch (err) {
    res.status(500).json({ success: false, error: "Payment failed." });
  }
});

// Placeholder for payment API logic
async function processPaymentThroughAPI(amount) {
  // Replace this with actual API integration
  return new Promise((resolve, reject) => {
    // Simulating a delay for processing
    setTimeout(() => {
      resolve({ transactionId: `TXN-${Date.now()}` });
    }, 1000);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
