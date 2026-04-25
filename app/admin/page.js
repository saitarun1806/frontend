"use client";

import { useEffect, useState } from "react";
import { API } from "../api";

export default function Admin() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API}/requests`, {
      headers: {
        "x-admin-key": "9fK8xL2pQ7mZ"
      }
    })
      .then(res => res.json())
      .then(setRequests);
  }, []);

  const approve = async (id) => {
    await fetch(`${API}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": "9fK8xL2pQ7mZ"
      },
      body: JSON.stringify({ id })
    });

    alert("Approved!");
    location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔐 Admin Panel</h1>

      {requests.map((r) => (
        <div key={r.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><b>Roll:</b> {r.roll}</p>
          <p><b>Subject:</b> {r.code}</p>
          <p><b>New Marks:</b> {r.internal} + {r.external}</p>

          <button onClick={() => approve(r.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
