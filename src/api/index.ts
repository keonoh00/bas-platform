const proxyCache = new Map<string, unknown>();

export async function proxyFetch({
  path,
  method = "GET",
  headers = {},
  body,
  cache = true,
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  cache?: boolean;
}) {
  const cacheKey = `${method}:${path}:${body ? JSON.stringify(body) : ""}`;

  if (method === "GET" && cache && proxyCache.has(cacheKey)) {
    return proxyCache.get(cacheKey);
  }

  const res = await fetch("/api/proxy", {
    method: "POST", // always POST to proxy endpoint
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, method, headers, body }),
  });

  const raw = await res.text();

  try {
    const data = JSON.parse(raw);
    if (method === "GET" && cache) {
      proxyCache.set(cacheKey, data);
    }
    return data;
  } catch {
    throw new Error(`Proxy fetch failed: ${res.status} ${res.statusText}`);
  }
}
