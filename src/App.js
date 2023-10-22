import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import SignIn from "./components/pages/SignIn";
import ContactUs from "./components/pages/ContactUs";
import Layout from "./components/layouts/Layout";

import './App.css';


function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} /> 
        <Route path='/contact' element={<ContactUs />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
}
export default App;
