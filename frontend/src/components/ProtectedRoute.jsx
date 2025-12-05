import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return user ? children : null;
}
