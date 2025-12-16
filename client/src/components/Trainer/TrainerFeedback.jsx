import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const TrainerFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/review/trainer`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReviews(data.reviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-500 mb-6 text-center">
        Client Feedback
      </h2>

      {reviews.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="bg-white dark:bg-green-50 border border-green-200 shadow-lg rounded-xl p-6 sm:p-10 text-center max-w-md w-full">
            <p className="text-gray-700 text-base sm:text-lg">
              No reviews or feedbacks yet.
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-4 w-full">
          {reviews.map((r) => (
            <li
              key={r._id}
              className="bg-white dark:bg-green-50 w-full flex flex-col  md:flex-row justify-between items-center p-6 rounded-xl shadow-md border border-green-200"
            >
              <p className="text-green-900 font-semibold ">
                Client Name:{" "}
                <span className="text-gray-800 capitalize">{r.clientId?.name}</span>
              </p>

              <div className="flex items-center gap-2 ">
                <span className="text-green-900 font-semibold">
                  Ratings:
                </span>
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  {r.rating}
                  <FaStar className="text-[#ffe925ee]" />
                </span>
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-green-900 font-semibold">
                  Comment:
                </span>
                <p className="text-gray-700 break-words">
                {r.comment}
              </p>
              </div>

            
              <p className="text-gray-900 text-sm ">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerFeedback;
