"use client";

import { useEffect, useState } from "react";
import { API } from "../../api";

export default function Student({ params }) {
  const { roll } = params;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/student?roll=${roll}`)
      .then(res => res.json())
      .then(setData);
  }, [roll]);

  if (!data) return <p>Loading...</p>;
  if (data.error) return <p>{data.error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.name}</h1>
      <h3>{data.roll}</h3>

      {Object.entries(data.semesters).map(([sem, semData]) => (
        <div key={sem} style={{ marginTop: 20 }}>
          <h2>{sem}</h2>

          {semData.subjects.map((sub, i) => (
            <div key={i} style={{ borderBottom: "1px solid gray", padding: 10 }}>
              <b>{sub.name}</b>
              <p>
                Internal: {sub.internal} | External: {sub.external}
              </p>
              <p>Total: {sub.total} | Result: {sub.result}</p>

              <button
                onClick={() => requestChange(data.roll, sem, sub.code)}
              >
                Request Change
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

async function requestChange(roll, sem, code) {
  const internal = prompt("Enter new Internal marks:");
  const external = prompt("Enter new External marks:");

  if (!internal || !external) return;

  await fetch("https://nameless-dawn-298e.workers.dev/request-change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      roll,
      sem,
      code,
      internal,
      external,
      total: Number(internal) + Number(external),
      result: "P"
    })
  });

  alert("Request sent successfully!");
}
