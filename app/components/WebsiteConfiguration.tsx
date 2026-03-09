// app/components/WebsiteConfiguration.tsx
"use client";

import { TemplateMode, templateModes } from "@/lib/template";
import { generateSectionsDraft } from "@/lib/generateSectionsDraft";
import { getOptionsForMode } from "@/lib/modeConfig";
import { useEffect } from "react";
import { SectionDraft } from "@/lib/project";
import { getPresetByMode } from "@/lib/getPreset";

interface Props {
  project: any;
  onChange: (patch: Partial<any>) => void;
}

const inputBase = "w-full rounded-lg px-4 py-2 bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500";

export function WebsiteConfiguration({ project, onChange }: Props) {
  const currentOptions = getOptionsForMode(project.mode);

  useEffect(() => {
    // Khi component được tải, nếu project đã có mode nhưng chưa có template,
    // hãy tự động tạo template và sectionsDraft dựa trên mode đó.
    if (project.mode && !project.template) {
      onChange({
        template: getPresetByMode(project.mode as TemplateMode),
        sectionsDraft: generateSectionsDraft(project.mode as TemplateMode),
      });
    }
  }, []); // Chạy một lần duy nhất khi component mount

  return (
    <section className="mt-12 p-6 rounded-2xl border border-slate-700 bg-slate-900 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-6">
        B. Website Configuration
      </h2>

      {/* MODE */}
      <Field label="Website type">
        <select
          className={inputBase}
          value={project.mode || ""}
          onChange={(e) => onChange({ 
            mode: e.target.value,
            template: getPresetByMode(e.target.value as TemplateMode),
            sectionsDraft: generateSectionsDraft(e.target.value as TemplateMode),
            status: "configured", })}
        >
          <option value="">— Chọn loại website —</option>
          {templateModes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      {/* GOALS */}
      <Field label="Primary goals">
        <TagSelector
          options={currentOptions.goals}
          value={project.goals || []}
          onChange={(v) => onChange({ goals: v })}
        />
      </Field>

      {/* AUDIENCE */}
      <Field label="Target audience">
        <TagSelector
          options={currentOptions.audience}
          value={project.audience || []}
          onChange={(v) => onChange({ audience: v })}
        />
      </Field>

      {/* TONE */}
      <Field label="Tone & style">
        <select
          className={inputBase}
          value={project.tone || ""}
          onChange={(e) => onChange({ tone: e.target.value })}
        >
          <option value="">— Chọn giọng điệu —</option>
          {currentOptions.tones.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      {/* EMAIL */}
      <Field label="Contact email">
        <input
          type="email"
          className={inputBase}
          placeholder="you@email.com"
          value={project.ownerEmail || ""}
          onChange={(e) => onChange({ ownerEmail: e.target.value })}
        />
      </Field>

        {project.sectionsDraft && (
        <div>
            <h3 className="text-lg font-semibold text-white mb-4">
            🧱 Cấu trúc trang web
            </h3>
            <span className="text-xs text-emerald-400">Tự động sinh theo Website type</span>

            <div className="space-y-3">
            {project.sectionsDraft.map((section: SectionDraft, index: number) => (
                <div
                key={index}
                className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <input
                    type="checkbox"
                    checked={section.enabled}
                    className="accent-emerald-500"
                    onChange={() => {
                        const next = [...project.sectionsDraft!];
                        next[index] = {
                        ...section,
                        enabled: !section.enabled,
                        };
                        onChange({ sectionsDraft: next });
                    }}
                    />

                    <span className="font-medium text-slate-100">
                    {section.type}
                    </span>

                    <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                    {section.source}
                    </span>
                </div>

                <input
                placeholder="Ghi chú cho AI (tuỳ chọn)"
                className="mt-2 w-[80%] mx-auto bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 text-sm"
                value={section.note ?? ""}
                onChange={(e) => {
                    const next = [...project.sectionsDraft!];
                    next[index] = {
                    ...section,
                    note: e.target.value,
                    };
                    onChange({ sectionsDraft: next });
                }}
                />

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                    {/* UP */}
                    <button
                    disabled={index === 0}
                    className="text-slate-400 hover:text-white disabled:opacity-30"
                    onClick={() => {
                        if (index === 0) return;
                        const next = [...project.sectionsDraft!];
                        [next[index - 1], next[index]] = [
                        next[index],
                        next[index - 1],
                        ];
                        onChange({ sectionsDraft: next });
                    }}
                    >
                    ↑
                    </button>

                    {/* DOWN */}
                    <button
                    disabled={index === project.sectionsDraft!.length - 1}
                    className="text-slate-400 hover:text-white disabled:opacity-30"
                    onClick={() => {
                        const next = [...project.sectionsDraft!];
                        [next[index], next[index + 1]] = [
                        next[index + 1],
                        next[index],
                        ];
                        onChange({ sectionsDraft: next });
                    }}
                    >
                    ↓
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        )}

    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function TagSelector({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((i) => i !== item));
    } else {
      onChange([...value, item]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => toggle(item)}
          className={`px-3 py-1 rounded-full text-sm border ${
            value.includes(item)
              ? "bg-emerald-600 border-emerald-500 text-white"
              : "border-slate-600 text-slate-300"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
