"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch("https://api.lab.sviuh.net/health")
      .then(res => res.json())
      .then(data => setStatus(JSON.stringify(data, null, 2)))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main>
      <h1>🚀 SVIUH Startup Lab – LOCAL PUSH TEST</h1>
      <p>Updated at {new Date().toISOString()}</p>
      <pre>{status}</pre>
    </main>
  );
}