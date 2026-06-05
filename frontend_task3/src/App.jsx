import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BlogDashboard from "./pages/BlogDashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/blogs"
        element={
          localStorage.getItem("token") ? (
            <BlogDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
