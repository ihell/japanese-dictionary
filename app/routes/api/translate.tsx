import { json } from "@remix-run/node";

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const text = url.searchParams.get("text");

  if (!text) {
    return json({ error: "Text is required" }, { status: 400 });
  }

  const response = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en", // Source: English
      target: "id", // Target: Indonesian
    }),
  });

  const data = await response.json();
  return json(data);
};
