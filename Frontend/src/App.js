import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AppClient from "./container/containers/AppClient"
import AppDashboard from "./container/containers/AppDashboard"

function App() {
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
        <Routes>
          <Route path="/*" element={<AppClient />} />
          <Route path="/admin/*" element={<AppDashboard />} />
        </Routes>
    </div>
  );
}

export default App;
