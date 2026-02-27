"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Checking backend...");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.lab.sviuh.net/health")
      .then((res) => res.json())
      .then((json) => {
        setStatus("Backend connected ✅");
        setData(json);
      })
      .catch(() => {
        setStatus("Backend unreachable ❌");
      });
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 SVIUH Startup Lab</h1>

      <p>
        <strong>Status:</strong> {status}
      </p>

      {data && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <p>
        Đây là frontend demo cho các nhóm sinh viên kết nối tới nền tảng
        <strong> OpenLab Platform</strong>.
      </p>
    </main>
  );
}