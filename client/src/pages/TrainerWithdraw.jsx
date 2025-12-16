import axios from "axios";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const TrainerWithdraw = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const availableBalance = Number(
    localStorage.getItem("available balance") || 0
  );

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (Number(amount) > availableBalance) {
      setError("Withdrawal amount cannot exceed available balance");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/payment/withdraw`,
          { amount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("available balance");
        navigate("/trainer/viewPayments");
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }, 3000);
  };

  const handleCancel = () => {
    setAmount("");
    setError("");
    navigate("/trainer/viewPayments");
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-900 flex justify-center items-center p-4">
      <div className="bg-white border border-green-200 shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent mb-4"></div>
            <h3 className="text-xl font-bold text-green-800">
              Withdrawing amount...
            </h3>
            <p className="text-gray-600 text-sm mt-2 text-center">
              Please wait while we process your request
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-800 text-center mb-4">
              Withdraw Earnings
            </h2>

            <p className="text-center text-green-900 font-semibold mb-6">
              Available Balance:{" "}
              <span className="font-bold">₹{availableBalance}</span>
            </p>

            <label className="block text-green-900 font-semibold mb-2">
              Enter Amount
            </label>
            <div className="flex items-center border rounded-lg px-3 mb-4">
              <BiRupee className="text-xl text-green-700" />
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                className="w-full p-2 outline-none"
                placeholder="Enter amount"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancel}
                className="w-full sm:w-1/2 border border-green-700 text-green-700 hover:bg-green-100 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleWithdraw}
                className="w-full sm:w-1/2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg"
              >
                Confirm Withdraw
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainerWithdraw;
