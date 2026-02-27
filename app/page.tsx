"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main>
      <h1>🚀 SVIUH Startup Lab</h1>
      <p>Status: {status}</p>
    </main>
  );
}