import { json } from "@remix-run/node";

export const loader = async () => {
  // Ambil data kanji N5 dari API Kanji
  const response = await fetch("https://kanjiapi.dev/v1/grade/1"); // Grade 1 sesuai untuk kanji N5
  const data = await response.json();

  // Batasi ke 10 kanji pertama untuk demo
  return json(data.slice(0, 10));
};
