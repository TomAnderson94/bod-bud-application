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


function App() {

  return (
    <>
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<ExerciserDashboard />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/strengthtraining" element={<StrengthTraining />} />
        <Route path="exerciser-dashboard/" element={<ExerciserDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/myprofile" element={<ProfilePage />} />

      </Routes>
    </Layout>
  </BrowserRouter>
  </>
  );
}
export default App;
