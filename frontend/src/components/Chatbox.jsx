import React, { useState } from "react";

// Replace this with your deployed backend URL
const BACKEND_URL = "https://personal-website-backend-980616278291.northamerica-northeast1.run.app";

const Chatbox = () => {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !food) {
      setResponse("Please fill out both fields.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, food }),
      });

      if (!res.ok) {
        console.error("Error status:", res.status, await res.text());
        setResponse("Error saving data.");
        return;
      }

      const data = await res.json();
      setResponse(data.message || "Saved successfully!");
      setName("");
      setFood("");
    } catch (err) {
      console.error(err);
      setResponse("Error saving data.");
    }
  };

  const handleShowUsers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users`);
      if (!res.ok) {
        console.error("Error fetching users:", res.status, await res.text());
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>Chatbox</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Favorite Food"
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {response && <p style={{ textAlign: "center" }}>{response}</p>}

      <button
        onClick={handleShowUsers}
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#28a745",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Show Existing Users
      </button>

      {users.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u, idx) => (
            <li key={idx} style={{ padding: "0.25rem 0" }}>
              {u.name} likes {u.food}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chatbox;
