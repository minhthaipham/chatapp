import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import Login from "./components/auth/Login";
import "./App.css";
import Register from "./components/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestDrawer from "./components/TestDrawer";
import { useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import { SocketProvider } from "./context/SocketContext";
import Error from "./pages/Error";
function App() {
  return (
    <SocketProvider url="http://localhost:5000">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestDrawer />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </Router>
    </SocketProvider>
  );
}

export default App;
