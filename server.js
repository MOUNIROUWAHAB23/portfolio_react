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
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${message} [/INST]`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
          },
        }),
      }
    );

    const raw = await hfResponse.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res.json({ reply: `Erreur de parsing JSON: ${raw}` });
    }

    if (data.error) {
      return res.json({ reply: data.error });
    }

    // Parsing correct pour ne renvoyer que la réponse générée
    const fullText = data[0]?.generated_text || "";
    const reply = fullText.split("[/INST]")[1]?.trim() || fullText.trim() || "Réponse vide.";

    res.json({ reply });
  } catch (err) {
    console.error("Erreur HuggingFace:", err);
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
