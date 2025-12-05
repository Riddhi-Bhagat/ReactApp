import React from "react";

export default function Notification({ message, type="info" }) {
  if (!message) return null;
  const bg = type === "error" ? "#f8d7da" : "#d1e7dd";
  const color = type === "error" ? "#842029" : "#0f5132";
  return (
    <div style={{ padding: "10px 14px", background: bg, color, borderRadius: 6, marginBottom: 12 }}>
      {message}
    </div>
  );
}
