//page.tsx
"use client";

import {useState } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';

import { IdeaPreview, IdeaPreviewSection } from "./IdeaPreviewSection";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [result, setResult] = useState<{
    analyze?: string;
    design?: string;
    architecture?: string;
  }>({});

  const [preview, setPreview] = useState<IdeaPreview | null>(null);

  const [loadingStep, setLoadingStep] = useState<"idle" | "analyzing" | "designing" | "architecting" | "done">("idle");

  const handleCreateLab = async () => {
    setSubmitted(true);

    // STEP 1 – Analyze
    setLoadingStep("analyzing");
    const analyzeRes = await fetch("/api/lab/analyze", {
      method: "POST",
      body: JSON.stringify({ idea }),
    }).then((r) => r.json());

    setResult(prev => ({
      ...prev,
      analyze: analyzeRes.content,
    }));

    setPreview(analyzeRes.preview as IdeaPreview);

    // STEP 2 – UI Design
    setLoadingStep("designing");

    const designRes = await fetch("/api/lab/design", {
      method: "POST",
      body: JSON.stringify({
        idea,
        analysis: analyzeRes.content,
       }),
    }).then((r) => r.json());

    setResult(prev => ({
      ...prev,
      design: designRes.content,
    }));

    // STEP 3 – Architecture
    setLoadingStep("architecting");
    const archRes = await fetch("/api/lab/architecture", {
      method: "POST",
      body: JSON.stringify({
      idea,
      analysis: analyzeRes.content,
      design: designRes.content,
    }),
    }).then((r) => r.json());

    setResult(prev => ({
      ...prev,
      architecture: archRes.content,
    }));

    setLoadingStep("done");

    console.log("LAB RESULT:", {
      analyzeRes,
      designRes,
      archRes,
    });

  };

  function stripMarkdownFence(text: string) {
    return text
      .replace(/^```(?:markdown)?\s*/i, "")
      .replace(/```$/, "")
      .trim();
  }

  function Section({
    title,
    loading,
    content,
  }: {
    title: string;
    loading: boolean;
    content?: string | undefined;
  }) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {content ? (
          <div className="prose prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl
            prose-p:text-slate-300 prose-strong:text-white
            prose-li:text-slate-300"  style={{textAlign: "left"}}>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {stripMarkdownFence(content)}
            </ReactMarkdown>
          </div>
        ) : loading ? (
            <p className="animate-pulse text-indigo-300">
              ⏳ AI đang xử lý...
            </p>
        ) : null}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Biến ý tưởng thành ứng dụng
        </h2>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Lab đổi mới sáng tạo dành cho sinh viên.
          <br />
          Nơi bạn thử – sai – học – và deploy thật. Version 002
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
            onClick={handleCreateLab}
            disabled={!idea.trim()}
            className="mt-6 w-full md:w-auto px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-lg disabled:opacity-50"
          >
            🚀 Tạo thiết kế cho ý tưởng này
          </button>

          {submitted && (
            <div className="mt-12 space-y-6">
              {/* STEP 1 */}
              <Section
                title="🔍 Phân tích ý tưởng"
                loading={loadingStep === "analyzing"}
                content={result.analyze}
              />

              {/* STEP 2 */}
              <Section
                title="🎨 Gợi ý giao diện Web / App"
                loading={loadingStep === "designing"}
                content={result.design}
              />

              {/* STEP 3 */}
              <Section
                title="🏗️ Kiến trúc & Công nghệ đề xuất"
                loading={loadingStep === "architecting"}
                content={result.architecture}
              />

              {loadingStep === "done" && (
                <div className="pt-6">
                  <button className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">
                    👉 Tạo trang Lab cho ý tưởng này
                  </button>
                </div>
              )}
            </div>
          )}

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
            <div className="space-y-6">
              {preview && <IdeaPreviewSection preview={preview} />}

              {/* sau này có thể thêm */}
              {/* <IdeaScore /> */}
              {/* <IdeaTags /> */}
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