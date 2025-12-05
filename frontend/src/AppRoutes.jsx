import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(()=>{});
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "Arial" }}>
      
      {/* NAV BAR */}
      <header style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> {" | "}
        {user ? (
          <>
            Welcome {user.name} |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<div>Welcome — use Login page to continue</div>} />

        <Route
          path="/login"
          element={
            <Login
              onLogin={(u) => {
                setUser(u);
                navigate("/profile");
              }}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
