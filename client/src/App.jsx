
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
import UserLogsList from './components/Trainer/UserLogsList';
import ViewLogs from './components/User/ViewLogs';
import ViewWorkoutPlan from './components/User/ViewWorkoutPlan';
import ViewNutritionPlan from './components/User/ViewNutritionPlan';
import CreatePlan from './components/Trainer/CreatePlan';
import ViewUserPlan from './components/Trainer/ViewUserPlan';
import CreateLog from './components/User/CreateLog';
import ViewUserLogs from './components/Trainer/ViewUserLog';
import ViewUserPayments from './components/User/ViewUserPayments';
import ViewTrainerPayments from './components/Trainer/ViewTrainerPayments';
import ViewAllPayments from './components/Admin/ViewAllPayments';
import TrainerSessions from './components/Trainer/TrainerSessions';
import TrainerCalendarPage from './components/Trainer/TrainerCalendarPage';
import ClientCalendarPage from './components/User/ClientCalendarPage';
import AdminCalendarPage from './components/Admin/AdminCalendarPage';
import BookSession from './components/User/BookSession';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PendingApproval from './pages/pendingApprovalPage';
import ChatPage from './pages/ClientChatPage';
import ClientChatPage from './pages/ClientChatPage';
import TrainerChatPage from './pages/TrainerChatPage';
import TrainerWithdraw from './pages/TrainerWithdraw';
import ClientReview from './components/User/ClientReview';
import TrainerFeedback from './components/Trainer/TrainerFeedback';
import AdminReport from './components/Admin/AdminReport';


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
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />
        

        {/* User Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["client"]} ><UserLayout /></ProtectedRoute>}>
          <Route path="/client/dashboard" element={<UserDashboard/>} />
          <Route path='/user/updateProfile' element={<UserUpdateProfile/>}/>
          <Route path='/trainer' element={<TrainerInfo/>}/>
          <Route path='/paymentPlans' element={<PaymentPlans/>}/>
          <Route path="/payment/success" element={<PaymentStatusPage/>} />
          <Route path="/payment/cancel" element={<PaymentStatusPage />} />
          <Route path="/user/logs" element={<ViewLogs/>} />
          <Route path="/user/createLog" element={<CreateLog/>} />
          <Route path="/user/workoutPlan" element={<ViewWorkoutPlan/>} />
          <Route path="/user/nutritionPlan" element={<ViewNutritionPlan/>} />
          <Route path="/user/viewPayments" element={<ViewUserPayments/>} />
          <Route path="/user/sessions" element={<BookSession/>} />
          <Route path="/user/sessionCalender" element={<ClientCalendarPage/>} />
          <Route path="/user/chat" element={<ClientChatPage/>} />
          <Route path="/user/review" element={<ClientReview/>} />
          </Route>
          <Route path="/user/onboarding" element={<ProtectedRoute allowedRoles={["client"]} ><UserOnboarding /></ProtectedRoute>} />

        {/* Trainer Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerLayout /></ProtectedRoute>}>
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path='/trainer/updateProfile' element={<TrainerUpdateProfile/>}/>
          <Route path="/trainer/clients" element={<AssignedClient/>} />
          <Route path="/trainer/createPlan/:id" element={<CreatePlan/>} />
          <Route path="/trainer/viewPlan/:id" element={<ViewUserPlan/>} />
          <Route path="/trainer/client/logs" element={<UserLogsList/>} />
          <Route path="/trainer/viewLog/:id" element={<ViewUserLogs />} />
          <Route path="/trainer/viewPayments" element={<ViewTrainerPayments/>} />
          <Route path="/trainer/sessions" element={<TrainerSessions/>} />
          <Route path="/trainer/sessionCalender" element={<TrainerCalendarPage/>} />
          <Route path="/trainer/chat/:id" element={<TrainerChatPage/>} />
           <Route path="/trainer/feedbacks" element={<TrainerFeedback/>} />
        </Route>
          <Route path="/trainer/withdraw" element={<ProtectedRoute allowedRoles={["trainer"]} ><TrainerWithdraw /></ProtectedRoute>} />
        <Route path="/trainer/onboarding" element={<ProtectedRoute allowedRoles={["trainer"]} ><TrainerOnboarding /></ProtectedRoute>} />
        <Route path="/trainer/pendingApproval" element={<ProtectedRoute allowedRoles={["trainer"]} ><PendingApproval /></ProtectedRoute>} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path='/admin/updateProfile' element={<AdminUpdateProfile/>}/>
          <Route path="/trainerList" element={<TrainerList/>} />
          <Route path="/clientList" element={<ClientList/>} />
          <Route path="/admin/viewAllPayments" element={<ViewAllPayments/>} />
          <Route path="/admin/sessionCalender" element={<AdminCalendarPage/>} />
          <Route path="/admin/reports" element={<AdminReport/>} />
        </Route> 

      </Routes>
  );
}

export default App;

