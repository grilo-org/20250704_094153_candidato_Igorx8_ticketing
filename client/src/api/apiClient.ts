import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiClientOptions extends RequestInit {
  method?: HttpMethod;
  body?: any;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { method = "GET", body, headers, ...rest } = options;

  const cks = await cookies();

  const session = cks.get("session")?.value;

  const response = await fetch(`http://easytickets.dev${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Cookie: `session=${session}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
}
