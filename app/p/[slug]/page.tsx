// app/p/[slug]/page.tsx
import { DesignPreviewSection } from "@/app/previewSections";
import { projects } from "@/lib/project";
import ReactMarkdown from "react-markdown";

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];

  function LabSection({
    title,
    children,
    }: {
    title: string;
    children: React.ReactNode;
    }) {
    return (
        <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        </section>
    );
    }

  if (!project) {
    return <div className="p-20">❌ Không tìm thấy Lab</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-slate-400 mt-2">
          Dự án Lab sinh viên · {project.brand}
        </p>
      </header>

      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 space-y-4">
        <div>
            <h2 className="text-lg font-semibold">💡 Tổng quan</h2>
            <p className="text-sm text-slate-300 mt-1">
            {project.preview.analysis.summary}
            </p>
        </div>

        <div className="text-sm space-y-1 text-slate-300">
            <div><b>Loại:</b> {project.preview.analysis.type}</div>
            <div><b>Đối tượng:</b> {project.preview.analysis.target}</div>
            <div><b>Vấn đề:</b> {project.preview.analysis.problem}</div>
            <div><b>Mục tiêu:</b> {project.preview.analysis.goal}</div>
        </div>

        <div className="pt-4 border-t border-slate-700 text-xs text-slate-400">
            <div>Slug: /p/{slug}</div>
            <div>Owner: ẩn</div>
        </div>
        </section>

      {/* ANALYSIS */}
      <LabSection title="🔍 Phân tích ý tưởng">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>
            {project.content.analysis}
            </ReactMarkdown>
        </article>
      </LabSection>

      <LabSection title="🔍 Phân tích ý tưởng">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>
            {project.content.analysis}
            </ReactMarkdown>
        </article>
      </LabSection>

        <LabSection title="🎨 Thiết kế UI/UX">
        <DesignPreviewSection preview={project.preview.design} />

        <div className="mt-6 prose prose-invert max-w-none">
            <ReactMarkdown>
            {project.content.design}
            </ReactMarkdown>
        </div>
        </LabSection>

        <section className="text-center pt-20">
            <h3 className="text-2xl font-bold">
                Bạn có thể phát triển dự án này дальше 🚀
            </h3>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <button className="px-6 py-3 rounded-xl bg-emerald-600 font-semibold">
                ✏️ Chỉnh sửa Lab
                </button>

                <button className="px-6 py-3 rounded-xl bg-slate-800">
                📤 Chia sẻ
                </button>
            </div>
        </section>

    </main>
  );
}