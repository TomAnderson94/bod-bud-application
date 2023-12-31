import StrengthTraining from "./components/pages/StrengthTraining";
import PageNotFound from "./components/pages/PageNotFound";
import ContactUs from "./components/pages/ContactUs";
import SignIn from "./components/pages/SignIn";
import Home from "./components/pages/Home";
import Layout from "./components/layouts/Layout";

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/strengthtraining" element={<StrengthTraining />} />

      </Routes>
    </Layout>
  </BrowserRouter>
  </>
  );
}
export default App;
