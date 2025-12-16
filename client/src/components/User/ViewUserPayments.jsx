import axios from "axios";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";

const ViewUserPayments = () => {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/userPayments`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
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
      <div className="p-6 min-h-screen flex justify-center items-center rounded-xl">
        <div className="border-2 w-full sm:w-3/4 md:w-2/5 p-10 rounded-xl flex flex-col bg-slate-100 dark:bg-green-50 border-white shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">No Payments Yet!</h2>
          <p className="mt-3 text-gray-700 text-base sm:text-lg">
            You haven't made any payments yet. Once you subscribe to a plan, your payment transactions
            will appear here so you can keep track of your subscriptions and access your services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 md:px-10 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-500 mb-6 text-center md:text-left">
        Payment History
      </h2>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border-collapse text-center">
          <thead className="bg-green-300 text-green-900">
            <tr>
              <th className="p-2 sm:p-3 border border-black">Plan</th>
              <th className="p-2 sm:p-3 border border-black">Amount</th>
              <th className="p-2 sm:p-3 border border-black">Start Date</th>
              <th className="p-2 sm:p-3 border border-black">Expiry Date</th>
              <th className="p-2 sm:p-3 border border-black">Payed to(Trainer)</th>
              <th className="p-2 sm:p-3 border border-black">Transaction Date</th>
              <th className="p-2 sm:p-3 border border-black">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="bg-green-100 hover:bg-green-200 transition">
                <td className="p-2 sm:p-3 border border-black">{p.plan}</td>
                <td className="p-2 sm:p-3 border border-black">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <BiRupee />
                    {p.amount}
                  </span>
                </td>
                <td className="p-2 sm:p-3 border border-black">{p.startDate?.slice(0, 10)}</td>
                <td className="p-2 sm:p-3 border border-black">{p.expiryDate?.slice(0, 10)}</td>
                <td className="p-2 sm:p-3 border border-black capitalize">{p.trainerId?.name}</td>
                <td className="p-2 sm:p-3 border border-black">{p.createdAt?.slice(0, 10)}</td>
                <td className="p-2 sm:p-3 border border-black">{p.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUserPayments;
