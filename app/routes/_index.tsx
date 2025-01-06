import { Link } from "@remix-run/react";
import "~/tailwind.css";

export default function Index() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Japanese Dictionary</h1>
      <p className="mb-4 text-center">Explore the world of Japanese Kanji and vocabulary.</p>
      <Link to="/kanji" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Kanji List
      </Link>
    </div>
  );
}