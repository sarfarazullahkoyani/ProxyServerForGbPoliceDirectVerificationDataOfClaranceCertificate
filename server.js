import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
  const { cnic } = req.query;

  if (!cnic) {
    return res.status(400).json({ error: "CNIC required" });
  }

  try {
    const response = await fetch(process.env.POLICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      },
      body: new URLSearchParams({
        type: process.env.POLICE_TYPE,
        code: process.env.POLICE_CODE,
        cnic: cnic,
      }),
    });

    const text = await response.text();
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
