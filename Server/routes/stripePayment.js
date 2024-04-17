const router = require("express").Router();
const cookieParser = require("cookie-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  //   console.log(process.env.STRIPE_SECRET_KEY);
  //   console.log("1233");
  const { products } = req.body;
  //   console.log(products);
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
  //   console.log(lineItems);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      //   success_url: "http://localhost:3000/successPayment",
      success_url: "https://fruits-wala.vercel.app/successPayment",
      //   cancel_url: "http://localhost:3000/failPayment",
      cancel_url: "https://fruits-wala.vercel.app/failPayment",
    });
    // console.log("H12233arsh");
    // console.log(session);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

module.exports = router;
