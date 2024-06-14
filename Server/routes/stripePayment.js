const router = require("express").Router();
const cookieParser = require("cookie-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const base_url_frontend = process.env.BASE_URL_FRONTEND;
router.post("/", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "INR",
      product_data: {
        name: product.title,
        images: [product.imageAsset],
      },
      unit_amount: parseFloat(product.price) * 100,
    },
    quantity: product.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${base_url_frontend}successPayment`,
      cancel_url: `${base_url_frontend}failPayment`,
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

module.exports = router;
