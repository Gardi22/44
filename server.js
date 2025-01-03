app.post('/process-payment', (req, res) => {
  const { amount } = req.body;

  // Ensure the amount is a positive number
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount. Enter a positive value." });
  }

  // Process payment (replace this with actual API logic)
  console.log(`Processing payment of $${amount}`);
  res.status(200).json({ message: `Payment of $${amount} processed successfully!` });
});
