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
        {  headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, }
      );
      console.log(data);
      setPayments(data.payments);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments()
  }, []);

if(!payments || payments.length === 0){
    return (
          <div className="bg-gradient-to-br from-green-200 to-gray-300 p-6 h-full flex justify-center items-center rounded-xl">
            <div className="border-2 w-2/4 p-10 rounded-xl flex flex-col bg-slate-100 border-white shadow-lg text-center">
             <h2 className="text-2xl font-bold text-green-900">No Payments Yet!</h2>
<p className="mt-2 text-gray-700 text-lg">
  You haven't made any payments yet. Once you subscribe to a plan, your payment transactions 
  will appear here so you can keep track of your subscriptions and access your services.
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

      <table className="w-full text-left border border-black">
        <thead className="bg-green-300 text-center">
          <tr>
            <th className="p-3 border border-black">Plan</th>
            <th className="p-3 border border-black">Amount</th>
            <th className="p-3 border border-black">Start Date</th>
            <th className="p-3 border border-black">Expiry Date</th>
            <th className="p-3 border border-black">Payed to(Trainer)</th>
            <th className="p-3 border border-black">Transaction Date</th>
            <th className="p-3 border border-black">Payment Status</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {payments.map((p) => (
            <tr key={p._id} className="bg-green-100">
              <td className="p-3 border border-black">{p.plan}</td>
              <td className="p-3 border border-black">
                <span className="flex justify-center items-center"><BiRupee />{p.amount}</span>
              </td>
              <td className="p-3 border border-black">{p.startDate?.slice(0, 10)}</td>
              <td className="p-3 border border-black">{p.expiryDate?.slice(0, 10)}</td>
              <td className="p-3 border border-black capitalize">{p.trainerId?.name}</td>
              <td className="p-3 border border-black">{p.createdAt?.slice(0, 10)}</td>
              <td className="p-3 border border-black">{p.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default ViewUserPayments;