import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // npm install node-fetch@2

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === ENDPOINT CONTACT ===
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "wahab.mounirou@ynov.com",
    subject: "Message via formulaire de contact",
    text: `
      Nouveau message reçu :

      Prénom : ${firstName}
      Nom : ${lastName}
      Email : ${email}
      Téléphone : ${phone}

      Message :
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ code: 200, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ code: 500, message: "Erreur d'envoi du message." });
  }
});

// === ENDPOINT CHATBOT (Hugging Face - Mixtral) ===

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: message }
              ]
            }
          ]
        }),
      }
    );

    const data = await geminiResponse.json();

    // Extract the reply from the Gemini API response
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Réponse vide.";

    res.json({ reply });
  } catch (err) {
    console.error("Erreur Google Gemini:", err);
    res.status(500).json({ reply: "Erreur serveur. Veuillez réessayer plus tard." });
  }
});
// === SERVE REACT FRONTEND BUILD ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});
