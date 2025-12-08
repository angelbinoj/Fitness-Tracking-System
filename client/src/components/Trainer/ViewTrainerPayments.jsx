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
        {  headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, }
      );
      console.log(data.payments);
      setPayments(data.payments);
      const total = data.payments.reduce((sum, payment) => sum + payment.trainerShare, 0);
    setTotalEarnings(total);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments()
  }, []);

if(payments.length === 0){
    return (
          <div className="bg-gradient-to-br from-green-200 to-gray-300 p-6 h-full flex justify-center items-center rounded-xl">
            <div className="border-2 w-2/4 p-10 rounded-xl flex flex-col bg-slate-100 border-white shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-900">No Payments Received Yet!</h2>
<p className="mt-2 text-gray-700 text-lg">
  None of your clients have made any payments so far. Once clients subscribe to your plans, 
  the payment transactions will appear here so you can track your earnings and plan your sessions.
</p>
            </div>
          </div>
        );
}

    return (
    <div className="py-6 px-20 h-full">
      <h2 className="text-3xl font-bold text-green-800 my-8">
        Payment History
      </h2>

<div className="flex justify-between items-center bg-green-200 border border-green-700 shadow-md rounded-xl p-5 mb-6">
  <div>
    <h3 className="text-xl font-bold text-green-900">Total Earnings</h3>
    <p className="text-gray-800 text-lg">Overall amount you’ve earned from client subscriptions</p>
  </div>

  <div className="text-4xl font-extrabold text-green-900 flex justify-center items-center gap-1">
    <BiRupee />
    {totalEarnings}
  </div>
</div>


      <table className="w-full text-left border border-black">
        <thead className="bg-green-300 text-center">
          <tr>
            <th className="p-3 border border-black">Sender(Client name)</th>
            <th className="p-3 border border-black">Plan</th>
            <th className="p-3 border border-black">Amount</th>
            <th className="p-3 border border-black">Platform Fee</th>
            <th className="p-3 border border-black">Your Earnings</th>
            <th className="p-3 border border-black">Transaction Date</th>
            <th className="p-3 border border-black">Payment Status</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {payments.map((p) => (
            <tr key={p._id} className="bg-green-100">
              <td className="p-3 border border-black capitalize">{p.userId?.name}</td>
              <td className="p-3 border border-black">{p.plan}</td>
              <td className="p-3 border border-black">
                <span className="flex justify-center items-center"><BiRupee />{p.amount}</span>
              </td>
              <td className="p-3 border border-black">
                <span className="flex justify-center items-center"><BiRupee />{p.platformCommission}</span>
              </td>
              <td className="p-3 border border-black">
                <span className="flex justify-center items-center"><BiRupee />{p.trainerShare}</span>
              </td>
              <td className="p-3 border border-black">{p.createdAt?.slice(0, 10)}</td>
              <td className="p-3 border border-black">{p.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default ViewTrainerPayments;