import { Link } from "react-router-dom";

function PendingApproval() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 p-6">
      <div className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          Your account is pending for approval
        </h1>
        <p className="mb-6">
          Admin is reviewing your trainer profile.  Once approved, you'll be able to access the dashboard and start connecting with clients.<br/> Thank you for your patience!
        </p>
        <Link
          to="/login"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default PendingApproval;
