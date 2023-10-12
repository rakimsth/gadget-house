require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.SECRET_KEY);

const indexRouter = require("./routes");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is running...");
});
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: `${FRONTEND_URL}/checkout/success`,
      cancel_url: `${FRONTEND_URL}/checkout/failed`,
    });

    res.json({
      data: {
        stripeId: session.id,
        url: session.url,
      },
      msg: "success",
    });
  } catch (e) {
    next(e);
  }
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
