import axios from "axios";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";

const ViewAllPayments = () => {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/allPayments`,
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

  if (!payments || payments.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-green-200 max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-900">No Payments Found!</h2>
          <p className="mt-4 text-gray-700 text-sm sm:text-base">
            There are currently no payment transactions in the system. Once users and trainers make payments,
            all transactions will appear here so you can monitor platform activity and track earnings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10 min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 my-6 sm:my-8 text-center md:text-left">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse shadow-md rounded-2xl overflow-hidden">
          <thead className="bg-green-300 text-green-900">
            <tr>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Sender(Client)</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Receiver(Trainer)</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Plan</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Amount</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Trainer Share</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Platform Fee</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Transaction Date</th>
              <th className="p-2 sm:p-3 border border-green-400 text-center text-sm sm:text-base">Payment Status</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {payments.map((p) => (
              <tr key={p._id} className="bg-green-100 hover:bg-green-200 transition-colors">
                <td className="p-2 sm:p-3 border border-green-200 capitalize text-sm sm:text-base">{p.userId?.name}</td>
                <td className="p-2 sm:p-3 border border-green-200 capitalize text-sm sm:text-base">{p.trainerId?.name}</td>
                <td className="p-2 sm:p-3 border border-green-200 text-sm sm:text-base">{p.plan}</td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.amount}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.trainerShare}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-center text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.platformCommission}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-green-200 text-sm sm:text-base">{p.createdAt?.slice(0, 10)}</td>
                <td className="p-2 sm:p-3 border border-green-200 text-sm sm:text-base">{p.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllPayments;
