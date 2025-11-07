import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.DEFEND_API_KEY) {
    return NextResponse.json(
      { error: "DEFEND_API_KEY is not set" },
      { status: 500 }
    );
  }
  const response = await fetch(`${process.env.DEFEND_API_URL}/api/v2/agents`, {
    headers: {
      "Content-Type": "application/json",
      Key: process.env.DEFEND_API_KEY,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
