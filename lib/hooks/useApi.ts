"use client";

import { useCallback, useMemo, useState } from "react";

type HttpMethod = "GET" | "POST";

type RequestOptions = {
  method?: HttpMethod;
  body?: BodyInit | Record<string, unknown> | null;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

const DEFAULT_ERROR = "Request failed";

function normalizeBaseUrl(url: string | undefined) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function createUrl(baseUrl: string, path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function useApi<TResponse = unknown>() {
  const baseUrl = useMemo(
    () => normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL),
    [],
  );
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (path: string, options: RequestOptions = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const method = options.method ?? "GET";
        const headers = new Headers(options.headers);
        let requestBody: BodyInit | undefined;

        if (options.body instanceof FormData) {
          requestBody = options.body;
        } else if (options.body != null && typeof options.body === "object") {
          headers.set("Content-Type", "application/json");
          requestBody = JSON.stringify(options.body);
        } else if (typeof options.body === "string") {
          requestBody = options.body;
        }

        const response = await fetch(createUrl(baseUrl, path), {
          method,
          body: requestBody,
          headers,
          signal: options.signal,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || `${DEFAULT_ERROR}: ${response.status}`);
        }

        if (response.status === 204) {
          setData(null);
          return null;
        }

        const responseData = (await response.json()) as TResponse;
        setData(responseData);
        return responseData;
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : DEFAULT_ERROR;
        setError(message);
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    error,
    isLoading,
    request,
    reset,
  };
}
// "use client";
// import { useApi } from "@/lib/hooks/useApi";

// type ContactResponse = { ok: boolean };

// export default function Example() {
//   const { data, error, isLoading, request } = useApi<ContactResponse>();

//   const onSubmit = async () => {
//     await request("/contacts", {
//       method: "POST",
//       body: { name: "John", email: "john@mail.com" },
//     });
//   };

//   return <button onClick={onSubmit} disabled={isLoading}>Send</button>;
// }
