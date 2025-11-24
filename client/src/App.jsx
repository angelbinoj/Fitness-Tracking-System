
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomeLayout from './Layouts/HomeLayout';
// import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUp';
// import ProtectedRoute from './Routes/ProtectedRoutes';
// import MainLayout from './layout/MainLayout';
// import Tasks from './pages/Tasks';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<MainLayout />}>
    //     <Route index element={<Home />} />
    //     <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<SignUpPage />} />
    //   </Route>
    // </Routes>
    <Routes>

        {/* Public Pages */}
        {/* <Route element={<HomeLayout/>}>
          <Route path="/" element={<Home />} />
        </Route> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} />

        {/* User Dashboard */}
        {/* <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/logs" element={<UserLogs />} />
          <Route path="/user/plans" element={<UserPlans />} />
        </Route> */}

        {/* Trainer Dashboard */}
        {/* <Route element={<TrainerLayout />}>
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path="/trainer/clients" element={<ClientList />} />
          <Route path="/trainer/client-logs/:id" element={<ClientLogs />} />
        </Route> */}

        {/* Admin Dashboard */}
        {/* <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/trainers" element={<ManageTrainers />} />
        </Route>  */}

      </Routes>
  );
}

export default App;

