// app/api/lab/analyze/route.ts
import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { idea } = await req.json();

  if (!idea?.trim()) {
    return NextResponse.json({ error: "Missing idea" }, { status: 400 });
  }

  const prompt = `
Bạn là mentor khởi nghiệp và kỹ sư phần mềm cấp cao.

Phân tích ý tưởng sau:

"${idea}"

YÊU CẦU OUTPUT (BẮT BUỘC):

1. Trả về JSON hợp lệ, KHÔNG kèm giải thích ngoài JSON.
2. Gồm 2 phần:

A. preview (ngắn gọn, dùng cho UI):
- type: loại sản phẩm (Web / App / AI / Khác)
- target: đối tượng người dùng chính
- problem: vấn đề chính (≤ 20 từ)
- goal: mục tiêu cốt lõi (≤ 20 từ)

B. content (markdown):
- Phân tích chi tiết bằng Markdown, tiếng Việt
- Gồm các mục:
  1. Vấn đề thực tế
  2. Đối tượng người dùng
  3. Giá trị cốt lõi
  4. Mức độ khả thi (1–5)
  5. Phù hợp triển khai trong Lab đại học
- Viết ngắn gọn, rõ ràng

FORMAT MẪU:

{
  "preview": {
    "type": "...",
    "target": "...",
    "problem": "...",
    "goal": "..."
  },
  "content": "## Vấn đề thực tế\\n..."
}
`;

  const aiResult = await callAI(prompt);

  let parsed;
  try {
    parsed = JSON.parse(aiResult);
  } catch (e) {
    // fallback an toàn: không làm sập hệ thống
    return NextResponse.json({
      step: "analyze",
      preview: null,
      content: aiResult,
      warning: "AI output is not valid JSON",
    });
  }

  return NextResponse.json({
    step: "analyze",
    preview: parsed.preview ?? null,
    content: parsed.content ?? "",
  });
}