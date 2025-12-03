
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HomeLayout from './Layouts/HomeLayout';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './Routes/ProtectedRoutes';
import UserLayout from './Layouts/UserLayout';
import UserOnboarding from './pages/UserOnboarding';
import TrainerLayout from './Layouts/TrainerLayout';
import TrainerOnboarding from './pages/TrainerOnboarding';
import AdminLayout from './Layouts/AdminLayout';
import UserDashboard from './components/User/UserDashboard';
import TrainerDashboard from './components/Trainer/TrainerDashboard';
import UserUpdateProfile from './components/User/UserUpdateProfile';
import TrainerUpdateProfile from './components/Trainer/TrainerUpdateProfile';
import TrainerInfo from './components/User/TrainerInfo';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminUpdateProfile from './components/Admin/AdminUpdateProfile';
import TrainerList from './components/Admin/TrainerList';
import ClientList from './components/Admin/ClientList';
import Logout from './components/Logout';
import PaymentPlans from './pages/PaymentPlans';
import PaymentStatusPage from './pages/PaymentStatusPage';
import AssignedClient from './components/Trainer/AssignedClient';


function App() {
  return (
    <Routes>

        {/* Public Pages */}
        <Route element={<HomeLayout/>}>
        <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<Logout/>} />

        {/* User Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["client"]} ><UserLayout /></ProtectedRoute>}>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path='/user/updateProfile' element={<UserUpdateProfile/>}/>
          <Route path='/trainer' element={<TrainerInfo/>}/>
          <Route path='/paymentPlans' element={<PaymentPlans/>}/>
          <Route path="/payment/success" element={<PaymentStatusPage/>} />
          <Route path="/payment/cancel" element={<PaymentStatusPage />} />
          {/* <Route path="/user/logs" element={<UserLogs />} />
          <Route path="/user/plans" element={<UserPlans />} /> */}
          </Route>
          <Route path="/user/onboarding" element={<ProtectedRoute allowedRoles={["client"]} ><UserOnboarding /></ProtectedRoute>} />

        {/* Trainer Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerLayout /></ProtectedRoute>}>
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path='/trainer/updateProfile' element={<TrainerUpdateProfile/>}/>
          <Route path="/trainer/clients" element={<AssignedClient/>} />
          {/* <Route path="/trainer/client-logs/:id" element={<ClientLogs />} /> */}
        </Route>
        <Route path="/trainer/onboarding" element={<ProtectedRoute allowedRoles={["trainer"]} ><TrainerOnboarding /></ProtectedRoute>} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path='/admin/updateProfile' element={<AdminUpdateProfile/>}/>
          <Route path="/trainerList" element={<TrainerList/>} />
          <Route path="/clientList" element={<ClientList/>} />
          {/* <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/trainers" element={<ManageTrainers />} /> */}
        </Route> 

      </Routes>
  );
}

export default App;

