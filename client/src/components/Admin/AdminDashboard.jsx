import Notification from "../Notification";

function AdminDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-[#1e6b3e] rounded-lg p-4 mb-6 flex items-center justify-between">
                  <div className="flex-1"></div>
                  <div className="flex items-center gap-4">
                    <Notification />
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                      <span className="text-[#1e6b3e] font-medium">{user.name}</span>
                      <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                        {user.profilePic ? (
                          <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-600 font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-green-700 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-6">OVERVIEW</h2>
          
          {/* Stats Cards */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#e8f442] rounded-2xl p-6 text-center">
                <h3 className="text-gray-700 font-semibold text-lg mb-2">CLIENTS</h3>
                <p className="text-6xl font-bold text-gray-800">345</p>
              </div>
              <div className="bg-gray-300 rounded-2xl p-6 text-center flex flex-col justify-center">
                <h3 className="text-gray-700 font-semibold text-lg mb-2">TRAINERS</h3>
                <p className="text-6xl font-bold text-gray-800">120</p>
              </div>
            </div>
          </div>

          {/* Recent Members */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Members</h3>
            <div className="flex gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white mb-2"></div>
                  <span className="text-sm">Name</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-[#e8e8dc] border-2 border-gray-400 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">CALENDER</h2>
          <div className="border-b border-gray-400 mb-4 pb-2">
            <span className="text-sm">BOOKINGS</span>
          </div>
          
        </div>

        {/* Chart Section - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 bg-gray-400 rounded-2xl p-6 relative h-96">
          <h2 className="text-3xl font-bold text-white mb-4">CHART</h2>
          
        </div>

        {/* Reviews Section */}
        <div className="bg-green-700 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-6">REVIEWS</h2>
          
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;