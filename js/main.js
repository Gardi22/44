// Import required modules
import dotenv from "dotenv";

// Initialize dotenv for accessing environment variables
dotenv.config();

// Select elements from the DOM
const paymentForm = document.getElementById("payment-form");
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const container = document.querySelector(".container");

// Live background change inside the container
const changeBackground = () => {
  const backgrounds = [
    "https://source.unsplash.com/random/1920x1080/?nature,water",
    "https://source.unsplash.com/random/1920x1080/?forest",
    "https://source.unsplash.com/random/1920x1080/?mountains",
    "https://source.unsplash.com/random/1920x1080/?sky",
  ];
  let currentBackgroundIndex = 0;

  setInterval(() => {
    container.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }, 10000);
};

// Start the live background change
changeBackground();

// Handle form submission
paymentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = parseFloat(amountInput.value);
  const currency = currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount greater than 0.");
    return;
  }

  try {
    // Payment processing logic
    const paymentUrl = process.env.PAYMENT_API_URL; // Replace with your payment API URL
    const apiKey = process.env.PAYMENT_API_KEY; // Replace with your payment API key

    const response = await fetch(paymentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      throw new Error("Payment failed. Please try again.");
    }

    const result = await response.json();
    alert(`Payment successful! Transaction ID: ${result.transactionId}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
