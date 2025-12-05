import React, { useState, useEffect } from "react";
import { getJSON, putJSON } from "../api";
import Notification from "../components/Notification";

export default function Profile({ user, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load profile on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getJSON("/user/me")
      .then(data => {
        if (!mounted) return;
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone || ""
        });
        setUser && setUser(data);
      })
      .catch(err => {
        if (err.status === 401) {
          setMessage({ text: "Session expired. Please login again.", type: "error" });
          setUser(null);
        } else {
          setMessage({ text: err.message, type: "error" });
        }
      })
      .finally(() => setLoading(false));

    return () => { mounted = false };
  }, []);

  const save = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      setMessage({ text: "Name and email required", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await putJSON("/user/me", form);
      setMessage({ text: "Profile updated successfully", type: "info" });
    } catch (err) {
      if (err.status === 401) {
        setMessage({ text: "Session expired. Please login again.", type: "error" });
        setUser(null);
      } else {
        setMessage({ text: err.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Profile</h2>

      <Notification message={message?.text} type={message?.type} />

      <form onSubmit={save}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label><br />
          <input
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Phone</label><br />
          <input
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
