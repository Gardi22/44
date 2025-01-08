require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg"); // PostgreSQL client
const fetch = require("node-fetch"); // For API requests

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const db = new Client({
  connectionString: process.env.DATABASE_URL,
});
db.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err.stack));

// Middleware
app.use(bodyParser.json());

// API route for payment processing
app.post("/api/process-payment", async (req, res) => {
  const { currency, amount, deviceInfo } = req.body;

  if (!currency || !amount || !deviceInfo) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    // Call the external payment API
    const paymentResponse = await fetch(process.env.PAYMENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      body: JSON.stringify({ currency, amount }),
    });

    const paymentResult = await paymentResponse.json();

    if (paymentResult.success) {
      // Log the successful transaction to the database
      const transactionTime = new Date().toISOString();
      const query = `
        INSERT INTO transactions (amount, currency, device_info, transaction_time, status)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [amount, currency, deviceInfo, transactionTime, "SUCCESS"];

      await db.query(query, values);

      res.json({
        success: true,
        message: "Payment processed successfully",
        transactionId: paymentResult.transactionId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
