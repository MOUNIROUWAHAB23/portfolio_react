import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // Utilisé pour Hugging Face

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === ENDPOINT CONTACT (déjà présent) ===
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
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
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ code: 200, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ code: 500, message: "Erreur d'envoi du message." });
  }
});

// === ENDPOINT HUGGING FACE CHATBOT (remplace OpenAI) ===
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const hfResponse = await fetch(
       "https://api-inference.huggingface.co/models/google/gemma-2b-it", // Remplacez par le modèle Hugging Face que vous souhaitez utiliser
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message,
          parameters: { max_new_tokens: 128, temperature: 0.7 }
        }),
      }
    );

    // On récupère la réponse brute
    const text = await hfResponse.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Si ce n'est pas du JSON, on retourne le texte brut
      return res.json({ reply: "Le modèle est en cours de chargement ou indisponible. Merci de réessayer dans quelques secondes." });
    }

    // Gestion des erreurs Hugging Face (ex: { error: "Model ... is currently loading" })
    if (data.error) {
      return res.json({ reply: data.error });
    }

    const reply = Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text
      : "Je n'ai pas compris, peux-tu reformuler ?";
    res.json({ reply });
  } catch (err) {
    console.error("Erreur HuggingFace:", err);
    res.status(500).json({ reply: "Erreur du serveur HuggingFace." });
  }
});
// Récupération du chemin actuel pour un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve les fichiers React buildés
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});