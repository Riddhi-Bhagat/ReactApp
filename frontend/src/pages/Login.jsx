import React, { useState } from "react";
import { postJSON } from "../api";
import Notification from "../components/Notification";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Test@123");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ text: "Email and password required", type: "error" });
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const data = await postJSON("/auth/login", { email, password });

      localStorage.setItem("token", data.token);

      setMessage({ text: "Login successful", type: "info" });
      onLogin({ email });

    } catch (err) {
      setMessage({ text: err.message || "Login failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Notification message={message?.text} type={message?.type} />

      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        <button disabled={loading} type="submit">
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
}
