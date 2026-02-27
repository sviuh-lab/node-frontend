// app/api/lab/architecture/route.ts
import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { idea, analysis, design } = await req.json();

  if (!idea || !analysis || !design) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }

  const prompt = `
Bạn là kiến trúc sư hệ thống cho startup sinh viên.

Ý tưởng:
${idea}

Phân tích:
${analysis}

Thiết kế:
${design}

Hãy đề xuất:
1. Kiến trúc tổng thể
2. Công nghệ đề xuất
3. Luồng dữ liệu
4. Cách triển khai trong lab.sviuh.net
5. Hướng mở rộng

Trình bày bullet point, dễ hiểu.
`;

  const result = await callAI(prompt);

  return NextResponse.json({
    step: "architecture",
    content: result,
  });
}