"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/health`)
      .then(res => res.json())
      .then(data => setStatus(data.status || "ok"))
      .catch(() => setStatus("API error"));
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Startup Lab – Demo Platform</h1>
      <p>Frontend: lab.sviuh.net</p>
      <p>Backend: api.lab.sviuh.net</p>
      <p><b>API status:</b> {status}</p>
    </main>
  );
}