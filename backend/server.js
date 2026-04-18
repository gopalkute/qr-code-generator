const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");
const bodyParser = require("body-parser");
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const qrImage = await QRCode.toDataURL(url, {
      color: { dark: "#1E293B", light: "#FFFFFF" },
    });
    res.json({ qrImage });
  } catch (err) {
    res.status(500).json({ error: "Error generating QR code" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the QR Code Generator API!");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

export default serverless(app);