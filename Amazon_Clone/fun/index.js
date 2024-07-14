const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("success");
});

app.post("/payments/create", async (req, res) => {
  try {
    const total = req.body.total; // Use req.body to access POST request data
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        error: "Total must be greater than 0",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

exports.api = onRequest(app);
