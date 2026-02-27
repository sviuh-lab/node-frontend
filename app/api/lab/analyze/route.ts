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

Yêu cầu:
1. Vấn đề thực tế
2. Đối tượng người dùng
3. Giá trị cốt lõi
4. Mức độ khả thi (1–5)
5. Phù hợp triển khai trong Lab đại học

Trả về markdown, tiếng Việt, ngắn gọn.
`;

  const result = await callAI(prompt);

  return NextResponse.json({
    step: "analyze",
    content: result,
  });
}