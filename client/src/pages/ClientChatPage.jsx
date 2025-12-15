import { useNavigate } from "react-router-dom";
import ClientChat from "../components/ClientChat";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientChatPage() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = user._id;
    const trainerId = user.assignedTrainer;
    console.log(trainerId);
    

    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/payment/userPayments`,
                    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
                );
                setPayments(data.payments);
                console.log(data.payments);

            } catch (err) {
                console.error(err);
            }
        };

        fetchPayments();
    }, [])

if (payments.length === 0) {
    return (
        <div className="bg-green-50 p-4 sm:p-6 min-h-screen flex justify-center items-center">
            <div className="border-2 w-full sm:w-3/4 lg:w-1/2 p-6 sm:p-10 rounded-2xl bg-[#eeffb5ee] shadow-lg flex flex-col justify-center items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                    Complete Payment To Access Chat
                </h2>
                <button
                    onClick={() => navigate("/paymentPlans")}
                    className="mt-6 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold uppercase text-lg shadow-md transition-all"
                >
                    Make Payment
                </button>
            </div>
        </div>
    );
}

return <ClientChat userId={userId} trainerId={trainerId} />;
}
