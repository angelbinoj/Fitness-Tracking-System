import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatusPage = () => {
  const location = useLocation();
  const isSuccess = location.pathname === "/payment/success";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const planInfo = JSON.parse(localStorage.getItem("paymentInfo"));

  if (isSuccess && planInfo) {
     axios.post(
      `${import.meta.env.VITE_API_URL}/payment/update`,
      { ...planInfo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

    setTimeout(() => {
      if (isSuccess) {
        navigate("/client/dashboard");
      } else {
        navigate("/paymentPlans");
      }
      localStorage.removeItem("paymentId");
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isSuccess ? (
        <div className="bg-green-50 p-10 rounded-lg text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-700">Thank you for subscribing. Your plan is now active.</p>
        </div>
      ) : (
        <div className="bg-red-50 p-10 rounded-lg text-center">
          <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
          <p className="text-lg text-gray-700">Your payment was not completed. You can try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusPage;
