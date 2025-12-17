import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { GiCheckMark } from "react-icons/gi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPlans = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const trainerId = user?.assignedTrainer;
  const token = localStorage.getItem("token");

  const plans = [
    {
      name: "Monthly",
      price: 300,
      duration: "30 Days",
      description: "Perfect for starters looking to get consistent and structured training.",
      features: ["Access to workout plan", "Basic nutrition guidance", "Chat support", "Weekly progress tracking"],
    },
    {
      name: "Quarterly",
      price: 800,
      duration: "90 Days",
      description: "Best value choice for committed individuals wanting stable transformation.",
      features: ["Customized plans every month", "Advanced nutrition lists", "Chat & video support", "Detailed progress reports"],
    },
    {
      name: "Yearly",
      price: 3000,
      duration: "365 Days",
      description: "For long-term goals and complete body transformation journey.",
      features: ["Fully customized training", "Premium nutrition plans", "Unlimited support", "Complete assessment reports"],
    },
  ];

  const handleCheckout = async (plan) => {
    const stripe = await stripePromise;
    if (!stripe) return console.error("Stripe failed to initialize");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/makePayment`,
        {
          userId: user._id,
          trainerId,
          plan: plan.name,
          amount: plan.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem(
        "paymentInfo",
        JSON.stringify({
          userId: user._id,
          trainerId,
          plan: plan.name,
          amount: plan.price,
        })
      );

      console.log("Stripe session data:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.log("No sessionId returned from backend");
      }
    } catch (err) {
      console.error("Payment request failed:", err);
    }
  };




  return (
    <div className="min-h-screen bg-[#ebffe6] flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-[#074f2a] mb-2">Choose Your Training Plan</h1>
      <p className="text-lg text-gray-600 mb-10">Select a subscription to continue booking your trainer</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-11/12 md:w-3/4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 text-center border border-green-600 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-extrabold text-[#06451e] mb-2">{plan.name}</h2>
            <p className="text-gray-700">{plan.description}</p>

            <div className="mt-6">
              <p className="text-4xl font-extrabold text-green-700">₹{plan.price}</p>
              <p className="mt-1 text-gray-500 font-semibold">{plan.duration}</p>
            </div>

            <ul className="mt-4 text-gray-700 text-sm space-y-1">
              {plan.features.map((f, i) => (
                <li className="flex justify-between items-center" key={i}><GiCheckMark />{f}</li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan)}
              className="mt-6 bg-[#0b7a38] text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlans;
