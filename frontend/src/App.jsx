import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");

  const generateQR = async () => {
    if (!url) return alert("Please enter a URL!");
    try {
      const res = await axios.post("https://qr-code-generator-five-indol.vercel.app/generate", { url });
      setQrImage(res.data.qrImage);
    } catch (err) {
      alert("Error generating QR code");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          URL to QR Code Generator
        </h1>
        <input
          type="text"
          placeholder="Enter your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={generateQR}
          className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Generate QR Code
        </button>
        {qrImage && (
          <div className="mt-6 flex flex-col items-center">
            <img src={qrImage} alt="QR Code" className="shadow-md rounded-lg" />
            <a
              href={qrImage}
              download="qrcode.png"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
