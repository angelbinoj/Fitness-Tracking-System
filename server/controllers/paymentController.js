import Stripe from "stripe";
import { PaymentDb } from "../models/paymentModel.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
    const { plan, amount, trainerId, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Training Plan: ${plan}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        trainerId,
        plan,
      },
       success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

    const platformCommission = amount * 0.1; // example
    const trainerShare = amount - platformCommission;

     const paymentDetails=await PaymentDb.create({
      userId,
      trainerId,
      plan,
      amount,
      platformCommission,
      trainerShare,
      paymentMethod: "Stripe",
      transactionId: session.id, // store the session id for reference
      paymentStatus: "Pending",
      startDate: new Date(),
      expiryDate: plan === "Monthly"
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : plan === "Quarterly"
        ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
  
    res.status(200).json({success:true, sessionId: session.url ,PaymentDetails: paymentDetails});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
