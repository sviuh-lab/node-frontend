// app/api/lab/design/route.ts
import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { idea, analysis } = await req.json();

  if (!idea || !analysis) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }

  const prompt = `
Bạn là chuyên gia UI/UX cho startup công nghệ.

Ý tưởng:
${idea}

Phân tích:
${analysis}

Hãy đề xuất:
1. Các màn hình chính
2. Layout từng màn hình
3. UX nổi bật
4. Phong cách thiết kế

KHÔNG vẽ hình. Trình bày rõ ràng.
`;

  const result = await callAI(prompt);

  return NextResponse.json({
    step: "design",
    content: result,
  });
}