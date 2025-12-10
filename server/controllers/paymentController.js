import Stripe from "stripe";
import { PaymentDb } from "../models/paymentModel.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { plan, amount, trainerId, userId } = req.body;

    const platformCommission = amount * 0.1;
    const trainerShare = amount - platformCommission;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Training Plan: ${plan}` },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        trainerId,
        plan,
        amount,
        platformCommission,
        trainerShare,
      },
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

    res.status(200).json({
      success: true,
      url: session.url,      
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const updatePayment = async (req, res) => {
  try {
    const { userId, trainerId, plan, amount } = req.body;

    const platformCommission = amount * 0.1;
    const trainerShare = amount - platformCommission;

    const newPayment = await PaymentDb.create({
      userId,
      trainerId,
      plan,
      amount,
      platformCommission,
      trainerShare,
      paymentStatus: "Success",
      paymentMethod: "Stripe",
      startDate: new Date(),
      expiryDate:
        plan === "Monthly"
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : plan === "Quarterly"
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({ success: true, payment: newPayment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await PaymentDb.find({ userId })
      .sort({ createdAt: -1 })
      .populate("trainerId", "name email");

      
      if(payments.length===0){
        return res.status(404).json({ error: "No Payments found!"});
      }

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getTrainerPayments = async (req, res) => {
  try {
     const trainerId = req.user.id; 

    const payments = await PaymentDb.find({ trainerId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

      if(payments.length===0){
        return res.status(404).json({ error: "No Payments found!"});
      }
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentDb.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("trainerId", "name email");

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
