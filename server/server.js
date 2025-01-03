require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // For handling API requests securely on the server side.

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like index.html, main.css, and main.js.

// Payment API Endpoint
app.post('/api/process-payment', async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // Replace the following with your payment API integration.
    // Example: API request to your payment provider with the secret key.
    const response = await axios.post(
      'https://api.example.com/process-payment', // Replace with your payment API URL.
      { amount }, // Send the amount to the API.
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`, // Securely use your API key.
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ success: true, message: 'Payment processed successfully', data: response.data });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment failed, please try again later' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
