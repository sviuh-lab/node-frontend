//IdeaPreviewSection.tsx
export interface IdeaPreview {
  type: string;
  target: string;
  problem: string;
  goal: string;
}

export function IdeaPreviewSection({ preview }: { preview: IdeaPreview }) {
  if (!preview) return null;

  return (
    <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">💡 Ý tưởng này là</h3>

      <ul className="space-y-2 text-slate-300 text-sm">
        <li>
          <span className="font-semibold text-slate-200">Loại:</span>{" "}
          {preview.type}
        </li>
        <li>
          <span className="font-semibold text-slate-200">Đối tượng:</span>{" "}
          {preview.target}
        </li>
        <li>
          <span className="font-semibold text-slate-200">Vấn đề:</span>{" "}
          {preview.problem}
        </li>
        <li>
          <span className="font-semibold text-slate-200">Mục tiêu:</span>{" "}
          {preview.goal}
        </li>
      </ul>
    </section>
  );
}