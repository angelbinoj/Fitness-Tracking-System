import axios from "axios";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";

const ViewTrainerPayments = () => {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");
  const [totalEarnings, setTotalEarnings] = useState(0);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/trainerPayments`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setPayments(data.payments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    const total = payments.reduce(
      (sum, payment) => sum + (payment.trainerShare || 0),
      0
    );
    setTotalEarnings(total);
  }, [payments]);

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-green-50 p-6 min-h-screen flex justify-center items-center">
        <div className="bg-white border border-green-200 shadow-lg rounded-xl p-6 sm:p-10 max-w-full sm:max-w-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
            No Payments Received Yet!
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-lg">
            None of your clients have made any payments so far. Once clients subscribe to your plans,
            the payment transactions will appear here so you can track your earnings and plan your sessions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-green-50">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center">
        Payment History
      </h2>

      {/* Total Earnings Card */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-green-200 border border-green-400 shadow-md rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-green-900">Total Earnings</h3>
          <p className="text-gray-800 text-sm sm:text-lg">
            Overall amount you’ve earned from client subscriptions
          </p>
        </div>
        <div className="text-2xl sm:text-4xl font-extrabold text-green-900 flex justify-center items-center gap-1">
          <BiRupee />
          {totalEarnings}
        </div>
      </div>

      {/* Payments Table */}
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
            {payments.map((p) => (
              <tr key={p._id} className="bg-green-100 hover:bg-green-200 transition-all">
                <td className="p-2 sm:p-3 border border-green-200 capitalize text-center text-sm sm:text-base">{p.userId?.name}</td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">{p.plan}</td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.amount}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.platformCommission}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.trainerShare}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">{p.createdAt?.slice(0, 10)}</td>
                <td className="p-2 sm:p-3 border border-green-200 capitalize text-center text-sm sm:text-base">{p.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTrainerPayments;
