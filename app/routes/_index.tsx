import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";

interface Kanji {
  kanji: string;
  meanings: string[];
}

export const loader = async () => {
  try {
    const res = await fetch("https://kanjiapi.dev/v1/grade/1");
    if (!res.ok) {
      throw new Error("Failed to fetch kanji data");
    }
    const data = await res.json();
    console.log("Fetched kanji data:", data); // Debug log
    return data.slice(0, 10); // Batasi jumlah kanji untuk demo
  } catch (error) {
    console.error("Error fetching kanji data:", error);
    return [];
  }
};

export default function Index() {
  const kanjiList = useLoaderData<Kanji[]>();
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    console.log("Kanji list:", kanjiList); // Debug log
  }, [kanjiList]);

  const translateMeaning = async (kanji: string, meaning: string) => {
    if (translations[kanji]) return;

    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: meaning,
          source: "en",
          target: "id",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch translation");
      }
      const data = await res.json();

      setTranslations((prev) => ({
        ...prev,
        [kanji]: data.translatedText,
      }));
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kanji N5</h1>
      <ul>
        {kanjiList.length > 0 ? (
          kanjiList.map((kanji) => (
            <li key={kanji.kanji} className="border p-4 mb-4">
              <p className="text-4xl font-bold">{kanji.kanji}</p>
              <p className="text-lg text-gray-500">Arti: {kanji.meanings.join(", ")}</p>
              <button
                className="bg-blue-500 text-white px-2 py-1 mt-2"
                onClick={() => translateMeaning(kanji.kanji, kanji.meanings.join(", "))}
              >
                Terjemahkan ke Bahasa Indonesia
              </button>
              {translations[kanji.kanji] && (
                <p className="text-green-700 mt-2">
                  Terjemahan: {translations[kanji.kanji]}
                </p>
              )}
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}