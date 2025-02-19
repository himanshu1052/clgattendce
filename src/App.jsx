import { Toaster } from "react-hot-toast"; // Import Toaster
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./Components/Home";
import Contact from "./pages/Contact";
import Applyform from "./Components/Applyform";
import Footer from "./pages/Footer";
import AdminLogin from "./Components/AdminLogin";
import Dashboard from "./Components/Dashboard";
import "./index.css";

const App = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  return (
    <div>
      {/* Add Toaster here */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Conditionally render Navbar and Footer */}
      {location.pathname !== "/admin" && location.pathname !== "/dashboard" && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Applyform />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin" />}
          />
        </Routes>
      </div>

      {location.pathname !== "/admin" && location.pathname !== "/dashboard" && <Footer />}
    </div>
  );
};

export default App;