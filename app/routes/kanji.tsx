import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "~/tailwind.css";

export async function loader() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Set timeout to 10 seconds

  try {
    const response = await fetch("https://jisho.org/api/v1/search/words?keyword=%23jlpt-n5", {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Error fetching kanji data: ${response.status} ${response.statusText}`);
      throw new Error("Failed to fetch kanji data");
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Error fetching kanji data: Request timed out");
    } else {
      console.error("Error fetching kanji data:", error);
    }
    throw new Response("Error fetching kanji data", { status: 500 });
  }
}

export default function Kanji() {
  const data = useLoaderData();
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Kanji N5 List</h1>
      <ul className="space-y-2 w-full max-w-2xl mx-auto">
        {data.data.map((item: any) => (
          <li key={item.slug} className="bg-gray-800 p-2 rounded text-center">
            <span className="font-bold">{item.japanese[0].word || item.japanese[0].reading}</span> - {item.senses[0].english_definitions.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}