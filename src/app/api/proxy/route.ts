import { NextRequest } from "next/server";

const API_BASE = "http://10.0.100.99:8888";

export async function POST(req: NextRequest) {
  try {
    const { path, method = "GET", headers = {}, body } = await req.json();

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Key: "BLUEADMIN123",
        ...headers,
      },
      body:
        method === "GET" || method === "HEAD"
          ? undefined
          : JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") ?? "";
    const rawText = await res.text();

    return new Response(
      contentType.includes("application/json")
        ? rawText
        : JSON.stringify({ message: rawText }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: "Internal Proxy Error", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
