import { NextRequest, NextResponse } from "next/server";
import { applyTransform } from "@/lib/transforms";
import type { TransformType } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { content, transform } = body as {
    content: string;
    transform: TransformType;
  };

  if (!content || !transform) {
    return NextResponse.json(
      { error: "Content and transform type are required" },
      { status: 400 }
    );
  }

  const result = applyTransform(content, transform);

  return NextResponse.json({ result });
}
