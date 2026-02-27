"use client";

import {useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Biến ý tưởng thành ứng dụng
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Lab đổi mới sáng tạo dành cho sinh viên.
          <br />
          Nơi bạn thử – sai – học – và deploy thật.
        </p>

        {/* IDEA INPUT */}
        <div className="mt-12 max-w-3xl mx-auto">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Bạn muốn tạo ứng dụng gì?"
            className="w-full px-6 py-4 rounded-xl bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />

          <button
            onClick={() => setSubmitted(true)}
            disabled={!idea.trim()}
            className="mt-6 w-full md:w-auto px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-lg disabled:opacity-50"
          >
            🚀 Tạo Lab cho ý tưởng này
          </button>

          <p className="mt-3 text-sm text-slate-400">
            Không cần đăng nhập · Chỉ để khám phá
          </p>
        </div>
      </section>

      {/* PREVIEW */}
      {submitted && (
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">💡 Ý tưởng của bạn</h3>
              <p className="text-slate-300 italic">"{idea}"</p>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">🧠 AI hiểu ý tưởng này là</h4>
                <ul className="space-y-1 text-slate-300">
                  <li>• Loại: Web / App</li>
                  <li>• Đối tượng: Sinh viên</li>
                  <li>• Mục tiêu: Giải quyết một vấn đề thực tế</li>
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                🎨 Gợi ý giao diện
              </h3>

              <div className="space-y-4">
                <div className="h-24 rounded-lg bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-slate-200">
                  Web layout preview
                </div>
                <div className="h-24 rounded-lg bg-gradient-to-r from-sky-500/30 to-cyan-500/30 flex items-center justify-center text-slate-200">
                  Mobile app preview
                </div>
              </div>

              <div className="mt-6 flex gap-3 flex-wrap">
                <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm">
                  Xem giao diện Web
                </button>
                <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm">
                  Xem giao diện App
                </button>
              </div>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              🏗 Ứng dụng này có thể được xây như sau
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Frontend", desc: "Web / Mobile UI" },
                { title: "Backend", desc: "API & xử lý logic" },
                { title: "AI", desc: "Gợi ý, chat, phân tích" },
                { title: "Deploy", desc: "Cloud + domain riêng" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
                >
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold">
              Mỗi ý tưởng đều xứng đáng được thử
            </h3>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold">
                🚀 Deploy thật trên Lab
              </button>
              <button
                onClick={() => {
                  setIdea("");
                  setSubmitted(false);
                }}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700"
              >
                Thử ý tưởng khác
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}