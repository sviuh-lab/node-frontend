//page.tsx
"use client";

import {useEffect, useState } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';

import { AnalysisPreview, AnalysisPreviewSection,
  DesignPreview, DesignPreviewSection,
  ArchitecturePreview, ArchitecturePreviewSection} from "./previewSections";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/project";
import { TemplateMode } from "@/lib/template";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [result, setResult] = useState<{
    analysis?: string;
    design?: string;
    architecture?: string;
  }>({});

  const [preview, setPreview] = useState<{
    analysis?: AnalysisPreview;
    design?: DesignPreview;
    architecture?: ArchitecturePreview;
  }>({});

  const [loadingStep, setLoadingStep] = useState<"idle" | "analyzing" | "designing" | "architecting" | "done">("idle");
  const [mode, setMode] = useState<TemplateMode>();

  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (preview.analysis?.brand && !slugEdited) {
      setSlug(slugify(preview.analysis.brand));
    }
  }, [preview.analysis, slugEdited]);

  const handleAnalyzeLab = async () => {
    setSubmitted(true);

    // STEP 1 – Analyze
    setLoadingStep("analyzing");
    const analyzeRes = await fetch("/api/lab/analyze", {
      method: "POST",
      body: JSON.stringify({ idea }),
    }).then((r) => r.json());

    setResult(prev => ({ ...prev, analysis: analyzeRes.content,}));
    setPreview(prev => ({
      ...prev,
      analysis: analyzeRes.preview.analysis as AnalysisPreview,
      design: analyzeRes.preview.design as DesignPreview,
      architecture: analyzeRes.preview.architecture as ArchitecturePreview,
    }));
    setMode(analyzeRes.mode);
    
    setLoadingStep("done");

    console.log("LAB RESULT:", {
      analyzeRes
    });

  };

  function PreviewLoading({ label }: { label: string }) {
    return (
      <div className="flex items-center gap-3 text-slate-400 animate-pulse">
          <div className="h-5 w-5 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
          <span className="text-sm">{label}</span>
      </div>
    );
  }

  function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  }

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
      <div>
        {content ? ( 
          null
        ) : loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">{title}
              <p className="animate-pulse text-indigo-400">
                ⏳ AI đang xử lý...
              </p>
            </h3>
          </div>
        ) : null}
      </div>
    );
  }

  const router = useRouter();

  const handleCreateLab = () => {
    if (!slug || !preview.analysis) return;

    let project: Project = {
      idea: idea,
      slug,
      title: preview.analysis.title,
      brand: preview.analysis.brand,
      mode: mode,

      preview,
      content: result,
    };

    //project = initProjectTemplate(project, "ecommerce");
    // sau này mode có thể do AI hoặc user chọn
    
    localStorage.setItem(`lab:${slug}`, JSON.stringify(project));

    router.push(`/p/${slug}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Từ Ý tưởng đến Sản phẩm số
        </h2>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Lab đổi mới sáng tạo dành cho sinh viên.
          <br />
          Nơi bạn thử – sai – học – và deploy thật. Version 002
        </p>

        {/* IDEA INPUT */}
        <div className="mt-12 max-w-3xl mx-auto">
          {!submitted && (
          <>
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Bạn muốn tạo dự án web / app hay sản phẩm số gì? Hãy mô tả ý tưởng của bạn"
              className="w-full px-6 py-4 rounded-xl bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />

            <button
              onClick={handleAnalyzeLab}
              disabled={!idea.trim()}
              className="mt-6 w-full md:w-auto px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-lg disabled:opacity-50"
            >
              🚀 Phân tích & thiết kế ý tưởng
            </button>
          </>
          )}

          {submitted && (
            <>
              <div className="mt-12 space-y-6">
                {/* STEP 1 */}
                <Section
                  title="🔍 Phân tích ý tưởng"
                  loading={loadingStep === "analyzing"}
                  content={result.analysis}
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
              </div>

              {loadingStep !== "done" && (
                <div className="mt-6 max-w-md mx-auto">
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width:
                          loadingStep === "analyzing"
                            ? "30%"
                            : loadingStep === "designing"
                            ? "60%"
                            : loadingStep === "architecting"
                            ? "90%"
                            : "0%",
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 text-center">
                    {loadingStep === "analyzing" && "AI đang phân tích ý tưởng"}
                    {loadingStep === "designing" && "AI đang đề xuất thiết kế"}
                    {loadingStep === "architecting" && "AI đang dựng kiến trúc hệ thống"}
                  </p>
                </div>
              )}

              {loadingStep === "done" && (
                <div className="mt-20 text-center">
                  <h3 className="text-2xl font-bold">
                    Mỗi ý tưởng đều xứng đáng được thử
                  </h3>

                  {/* SLUG */}
                  <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
                    <label className="text-sm text-slate-400">URL trang Lab</label>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-slate-400 text-sm">lab.sviuh.net/p/</span>

                      <input
                        value={slug}
                        onChange={(e) => {
                          setSlug(slugify(e.target.value));
                          setSlugEdited(true);
                        }}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Có thể chỉnh, sẽ được khóa sau khi tạo trang Lab
                    </p>
                  </div>
                  {/* CREATE LAB BUTTON */}
                  <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={handleCreateLab}
                      disabled={loadingStep !== "done"}
                      className={`
                        px-6 py-3 rounded-xl font-semibold transition
                        ${
                          loadingStep === "done"
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : "bg-slate-700 cursor-not-allowed opacity-50"
                        }
                      `}
                    >
                      🚀 Tạo dự án
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
                  <p className="mt-3 text-sm text-slate-400">
                    Lưu lại & triển khai thật cho dự án của bạn!
                  </p>
                </div>
              )}
            </>  
          )}
        </div>
      </section>

      {/* PREVIEW */}
      {submitted && (
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-6">
              <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  🔍 Phân tích ý tưởng
                </h3>
                {preview.analysis && <AnalysisPreviewSection preview={preview.analysis} />}
                {result.analysis &&
                  <div className="prose prose-invert prose-slate max-w-none 
                    prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-base
                    prose-h3:text-sm prose-p:text-sm prose-p:leading-relaxed
                    prose-li:text-sm prose-strong:text-white"
                      style={{textAlign: "left"}}>
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {stripMarkdownFence(result.analysis || "")}
                    </ReactMarkdown>
                  </div>
                }
                {/* CHƯA CÓ PREVIEW → HARD-CODE */}
                {!preview.design && (
                  <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 space-y-2">

                    <PreviewLoading label="Ý tưởng đang được phân tích..." />

                    <div className="flex justify-between text-sm">
                      <span>Thực trạng vấn đề: ...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Đối tượng người dùng: ...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Giá trị cốt lõi: ...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mức độ khả thi: ...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Khả năng triển khai: ...</span>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                🎨 Gợi ý giao diện
              </h3>

              {/* ĐÃ CÓ PREVIEW → RENDER THẬT */}
              {preview.design && <DesignPreviewSection preview={preview.design} />}

              {/* CHƯA CÓ PREVIEW → HARD-CODE */}
              {!preview.design && (
                <>

                  <PreviewLoading label="Giao diện đang được thiết kế..." />

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
                </>
              )}

            </div>
          </div>

          {/* ARCHITECTURE */}

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              🏗 Kiến trúc gợi ý
            </h2>

              {/* ĐÃ CÓ PREVIEW → RENDER THẬT */}
              {preview.architecture && <ArchitecturePreviewSection preview={preview.architecture} />}

              {/* CHƯA CÓ PREVIEW → HARD-CODE */}
              {!preview.architecture && (
                <>
                <PreviewLoading label="Kiến trúc đang được suy luận..." />
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
                </>
              )}
          </div>

          {/* CTA */}
          {loadingStep === "done" && (
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold">
                Mỗi ý tưởng đều xứng đáng được thử
              </h3>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <button className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">
                  🚀 Tạo dự án
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
              <p className="mt-3 text-sm text-slate-400">
                Lưu lại & triển khai thật cho dự án của bạn!
              </p>
            </div>
          )}

        </section>
        
      )}
    </main>
  );
}