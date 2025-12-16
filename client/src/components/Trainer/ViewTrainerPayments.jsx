import axios from "axios";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ViewTrainerPayments = () => {
  const [payments, setPayments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const token = localStorage.getItem("token");
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/trainerPayments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPayments(data.payments);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/allWithdrawals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWithdrawals(data.withdrawals || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchWithdrawals();
  }, []);

  useEffect(() => {
    const total = payments.reduce(
      (sum, payment) => sum + (payment.trainerShare || 0),
      0
    );
    setTotalEarnings(total);
  }, [payments]);

  const withdrawnAmount = withdrawals.reduce(
    (sum, w) => sum + w.amount,
    0
  );

  const availableBalance = totalEarnings - withdrawnAmount;
  localStorage.setItem("available balance", availableBalance);

  if (!payments || payments.length === 0) {
    return (
      <div className=" p-6 min-h-screen flex justify-center items-center">
        <div className="bg-white dark:bg-green-50 border border-green-200 shadow-lg rounded-xl p-6 sm:p-10 max-w-full sm:max-w-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
            No Payments Received Yet!
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-lg">
            None of your clients have made any payments so far.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10">

      <div className="flex flex-col md:flex-row justify-between items-center bg-green-200 border border-green-400 shadow-md rounded-xl p-4 sm:p-6 mb-4 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-green-900">
            Total Earnings
          </h3>
          <p className="text-gray-800 text-sm sm:text-lg">
            Overall amount you’ve earned from client subscriptions
          </p>
        </div>
        <div className="text-2xl sm:text-4xl font-extrabold text-green-900 flex justify-center items-center gap-1">
          <BiRupee />
          {totalEarnings}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center mb-8 gap-4">
        <div className="text-green-900 dark:text-green-500 border-4 rounded-lg p-2 border-green-600 dark:border-green-500 font-semibold text-lg">
          Available Balance:
          <span className="ml-2 font-bold text-green-800 dark:text-green-500">
            ₹{availableBalance}
          </span>
        </div>

        <button
          disabled={availableBalance <= 0}
          onClick={() => navigate("/trainer/withdraw")}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
        >
          Withdraw
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-500 mb-4">
        Withdrawal History
      </h2>

      {withdrawals.length === 0 ? (
        <div className="bg-white border border-green-200 shadow rounded-lg p-6 text-center mb-8">
          <p className="text-gray-700 text-lg">
            No withdrawals yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="w-full min-w-[600px] table-auto border-collapse shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-300 text-green-900">
              <tr>
                <th className="p-3 border border-green-400 text-center">Amount</th>
                <th className="p-3 border border-green-400 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w._id} className="bg-green-100">
                  <td className="p-3 border text-center">₹{w.amount}</td>
                  <td className="p-3 border text-center">
                    {w.createdAt?.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-500 mb-6">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] table-auto border-collapse shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-300 text-green-900">
            <tr>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Sender</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Plan</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Amount</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Platform Fee</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Your Earnings</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Transaction Date</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (<tr key={p._id} className="bg-green-100 hover:bg-green-200 transition-all">
              <td className="p-2 sm:p-3 border border-green-200 capitalize text-center text-sm sm:text-base">{p.userId?.name}</td>
              <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">{p.plan}</td>
              <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <BiRupee /> {p.amount}
                </span>
              </td>
              <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <BiRupee /> {p.platformCommission}
                </span>
              </td>
              <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <BiRupee /> {p.trainerShare}
                </span>
              </td>
              <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">{p.createdAt?.slice(0, 10)}</td>
              <td className="p-2 sm:p-3 border border-green-200 capitalize text-center text-sm sm:text-base">{p.paymentStatus}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTrainerPayments;
