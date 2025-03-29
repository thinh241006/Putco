const paypal = require("paypal-rest-sdk");

// Configure PayPal with default sandbox mode if no credentials provided
paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID || "default_client_id",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "default_client_secret"
});

module.exports = paypal;
