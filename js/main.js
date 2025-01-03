// Disable right-click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Disable specific key combinations
document.addEventListener("keydown", (event) => {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
    (event.ctrlKey && event.key === "U")
  ) {
    event.preventDefault();
  }
});

document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  const orderNum = document.getElementById("orderNum").textContent;
  const orderTotal = document.getElementById("orderTotal").textContent;

  alert(
    `Order Confirmed!\n\nOrder Number: ${orderNum}\nTotal Amount: $${orderTotal}\n\nPlease transfer the amount to the provided IBAN.`
  );
});
