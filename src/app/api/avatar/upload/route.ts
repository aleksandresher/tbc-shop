import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") as string;

  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is null" },
      { status: 400 }
    );
  }

  const blob = await put(filename, request.body as ReadableStream<Uint8Array>, {
    access: "public",
  });

  return NextResponse.json(blob);
}
