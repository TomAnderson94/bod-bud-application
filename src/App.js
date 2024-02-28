import ProfilePage from "./components/pages/ProfilePage";
import AdminDashboard from "./components/pages/AdminDashboard";
import TrainerDashboard from "./components/pages/TrainerDashboard";
import StrengthTraining from "./components/pages/StrengthTraining";
import PageNotFound from "./components/pages/PageNotFound";
import ContactUs from "./components/pages/ContactUs";
import LoginPage from "./components/pages/LoginPage";
import ExerciserDashboard from "./components/pages/ExerciserDashboard";
import Layout from "./components/layouts/Layout";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rehabilitation from "./components/pages/Rehabilitation";
import Cardio from "./components/pages/CardioExercise";
import StretchingExercises from "./components/pages/StretchingExercises";
import UserProfileView from "./components/pages/UserProfileView";


function App() {

  return (
    <>
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/strengthtraining" element={<StrengthTraining />} />
        <Route path="/exerciser-dashboard" element={<ExerciserDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/myprofile" element={<ProfilePage />} />
        <Route path="/myprofile/:profileID" element={<ProfilePage />} />
        <Route path="/rehabilitation" element={<Rehabilitation />} />
        <Route path="/cardioexercise" element={<Cardio />} />
        <Route path="/stretching" element={<StretchingExercises />} />
        <Route path="/user-profile-view/:profileID" element={<UserProfileView />} />

      </Routes>
    </Layout>
  </BrowserRouter>
  </>
  );
}
export default App;
