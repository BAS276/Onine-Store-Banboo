import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../client/components/home"
// import AdminContainer from "./componente/AdminContainer"
import Productdetail from "../client/components/productdetail"
import Category from "../client/components/category"
import Help from "../client/components/help"
import Search from "../client/components/Search"
import Fllcategory from "../client/components/fullcategory"
import Cart from "../client/components/Cart"
import Navbar from "../client/layout/navbar"
import Login from '../auth/components/Login';
import Register from '../auth/components/Register';
import Forgotpassword from '../auth/components/Forgot-password';
import UserProfile from '../client/components/userprofile';


function AppClient() {
  const faqs = [
    { question: "How do I reset my password?", answer: "To reset your password, go to settings and click 'Reset Password'." },
    { question: "Where can I find my order history?", answer: "Your order history is available under your account section." }
  ];

  const links = [
    { text: "Customer Support", url: "/support" },
    { text: "Privacy Policy", url: "/privacy-policy" },
    { text: "Terms of Service", url: "/terms" }
  ];
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category/:id" element={<Productdetail />} />
        <Route path="/Help" element={<Help title="Support Center" description="Here are some commonly asked questions and useful links." faqs={faqs} links={links} />} />
        <Route path="/Laptops" element={<Category category="Laptops" />} />
        <Route path="/Phones" element={<Category category="Phones" />} />
        <Route path="/Consoles" element={<Category category="Consoles" />} />
        <Route path="/Earbuds" element={<Category category="Earbuds" />} />
        <Route path="/Smartwatche" element={<Category category="Smartwatche" />} />
        <Route path="/Accesrise" element={<Category category="Accesrise" />} />
        <Route path="/fullcategory" element={<Fllcategory />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Cart" element={    <Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Forgot password" element={<Forgotpassword />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      
    </div>
  );
}

export default AppClient;
