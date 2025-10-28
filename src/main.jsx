import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AiAgentPlans from "./pages/AiAgentPlans.jsx";
import About from "./pages/About.jsx";
import AiChat from "./pages/AiChat.jsx";
import Home from "./pages/home.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Services from "./home_page/services.jsx";
import Details from "./pages/details.jsx";
import DeveloperDashboardPage from "./pages/DeveloperDashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import "./index.css";
import { myStore } from "./redux/index.js";
import { Provider } from "react-redux";
import SellerProfilePage2 from "./pages/SellerProfilePage2.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./protectedComponant/ProtectedRoute.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Provider store={myStore}>
        <Routes>
          <Route path="/chat-agent" element={<ProtectedRoute><AiAgentPlans /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/ai-chat" element={<ProtectedRoute><AiChat /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/details" element={<ProtectedRoute><Details /></ProtectedRoute>} />
          <Route
            path="/developer-dashboard"
            element={<ProtectedRoute><DeveloperDashboardPage /></ProtectedRoute>}
          />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/sellerProfile" element={<ProtectedRoute><SellerProfilePage2 /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
