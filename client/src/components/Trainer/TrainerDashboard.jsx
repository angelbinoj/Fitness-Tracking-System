import { useEffect, useState } from "react";
import Notification from "../Notification";
import axios from "axios";
import TrainerProgressChart from "./TrainerProgressChart";
import MiniCalendar from "../MiniCalendar";

const TrainerDashboard = () => {
  const [trainer, setTrainer] = useState(null);
  const [earnings, setEarnings] = useState('');
  const [bookingsCount, setBookingsCount] = useState('');
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    earnings: [],
    clients: []
  });

  const token = localStorage.getItem('token');

  const fetchTrainerSessions = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/session/trainer`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const upcoming = res.data.Sessions
      .filter(s => s.status === "Upcoming")
      .map(s => {
        const start = new Date(s.dateTime);
        const end = new Date(
          start.getTime() + (s.duration || 60) * 60000
        );

        return {
          title: s.title,
          start,
          end
        };
      });

    setEvents(upcoming);
  };

  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/trainerPayments`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const total = data.payments.reduce(
        (sum, payment) => sum + (payment.trainerShare || 0),
        0
      );
      setEarnings(total);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/session/trainer`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const bookings = res.data.Sessions.map((s) => {
        return s.bookedUsers.length
      })
      const totalBookings = bookings.reduce(
        (sum, booking) => sum + (booking || 0),
        0
      );
      setBookingsCount(totalBookings);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrainerProgress = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/progress`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      setChartData(data);

    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setTrainer(storedUser);
    fetchDetails();
    fetchTrainerProgress();
    fetchTrainerSessions();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    !user.trainerInfo ||
    !user.trainerInfo.specialization ||
    !user.trainerInfo.experience ||
    !user.trainerInfo.availability
  ) {
    window.location.href = "/trainer/onboarding";
    return null;
  }

  if (user.status == "pending") {
    window.location.href = "/trainer/pendingApproval";
    return null;
  }

  if (!trainer) return <p>Loading...</p>;

  const hasClients = trainer.assignedClients && trainer.assignedClients.length > 0;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="bg-[#1e6b3e] rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Notification />
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <span className="text-[#1e6b3e] font-medium capitalize">Hi, {trainer.name}</span>
            <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              {trainer.profilePic ? (
                <img src={trainer.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 font-bold">{trainer.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
            Welcome Back, <span className="text-[#d8e700] capitalize">{trainer.name}</span>
          </h1>
          <p className="text-[#7fb069] text-lg font-medium mb-6">
            Let's help your clients stay on track today!"
          </p>

          {hasClients ? (
            <div>
              <section className="bg-[#28a745] p-6 rounded-2xl mb-6">
                <h2 className="text-white text-2xl font-bold mb-4">OVERVIEW</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-[#28a745] mb-2">Total Clients</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">{trainer.assignedClients.length}</p>
                  </div>

                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-[#28a745] mb-2">Total Bookings</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">{bookingsCount}</p>
                  </div>

                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-[#28a745] mb-2">Total Earnings</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">{earnings}</p>
                  </div>
                </div>
              </section>

              <section className="bg-[#f5f5e8] border-2 border-gray-300 p-6 rounded-2xl min-h-[300px]">
                <h2 className="font-bold text-2xl mb-4 text-black">Progress Chart</h2>
                <div className="w-full h-64">
                  <TrainerProgressChart
                    labels={chartData.labels}
                    earnings={chartData.earnings}
                    clients={chartData.clients}
                  />
                </div>

              </section>
            </div>
          ) : (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-bold">No clients assigned yet</h2>
                <p className="text-gray-600 mt-2">
                  Once clients are assigned to you, their details will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-96 bg-[#8fa894] rounded-2xl p-5">
          <section className="bg-[#f5f5e8] border-2 border-gray-200 rounded-2xl p-4">
            <h3 className="font-bold text-xl mb-3">CALENDAR</h3>
            <p className="border-b border-gray-400 mb-3 pb-1 text-sm">
              Upcoming Sessions
            </p>
            <MiniCalendar events={events} />
          </section>

         <div className="pt-10">
  <h4 className="text-[#fffffb] text-lg border-b border-[#f5f5e8] font-bold mb-4">
    My Assigned Role
  </h4>

  <div className="space-y-3 text-sm">
    {/* Role */}
    <div className="bg-white/30 border border-white/30 rounded-xl px-4 py-3">
      <p className="text-[#fffffb] text-xs uppercase tracking-wide">
        Role
      </p>
      <p className="text-white text-base font-semibold">
        {trainer.trainerInfo.specialization} Trainer
      </p>
    </div>

    {/* Schedule */}
    <div className="bg-white/30 border border-white/30 rounded-xl px-4 py-3">
      <p className="text-[#ffffff] text-xs uppercase tracking-wide">
        Assigned Schedule
      </p>
      <p className="text-white text-base font-semibold">
        {trainer.trainerInfo.availability}
      </p>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>


  );
};

export default TrainerDashboard;