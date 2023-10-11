const functions = require("firebase-functions");
require("dotenv").config();
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NwjmXDLellSq864XgxT0hqqYB4VuxyM2z0JZuAJLSqSY8PEkMulXQ3che5CF2sgZm0BepkAnnLsrFZ3hy5DzDft00Xu4StqJj"
);

const app = express();
app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));
app.get("/isaak", (request, response) => response.status(200).send("Evangadi"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  if (total > 0) {
    const payementIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: payementIntent.client_secret,
    });
    console.log("payement request recived for this amount >>>>>>>", total);
  } else {
    response.status(200).send({
      message: "cant process the payement",
    });
  }

  // const total = request.query.total;

  // console.log("Payment Request Recieved for this amount >>>", total);

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: total,
  //   currency: "usd",
  // });
  // // OK - Created
  // response.status(201).send({ clientSecret: paymentIntent.client_secret });
});
exports.api = functions.https.onRequest(app);
