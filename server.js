import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import * as cheerio from "cheerio";

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
    const $ = cheerio.load(text);

    const officialUrl = `${process.env.POLICE_URL}?cnic=${cnic}`;
    $("body").prepend(
      `<div style="background:#fffae6;padding:10px;text-align:center;font-weight:bold;">
         🔗 Official Verification Link: 
         <a href="${officialUrl}" target="_blank">${officialUrl}</a>
       </div>`
    );

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send($.html());
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
