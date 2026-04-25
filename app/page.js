"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roll, setRoll] = useState("");
  const router = useRouter();

  return (
    <div style={{ padding: 40 }}>
      <h1>🎓 Student Result Portal</h1>

      <input
        placeholder="Enter Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />

      <button onClick={() => router.push(`/student/${roll}`)}>
        Search
      </button>
    </div>
  );
}
