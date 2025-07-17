import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import botIcon from "../assets/img/bot.png"; // Assurez-vous que le chemin est correct
import userIcon from"../assets/img/user.png"; // Assurez-vous que le chemin est correct

const theme = {
  background: "#f5f7fa",
  fontFamily: "Arial",
  headerBgColor: "#5170FF",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#5170FF",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#232946",
};

// Composant personnalisé pour appeler l'API Gemini via ton backend
function OpenAIStep({ steps, triggerNextStep }) {
  const userMessage = steps["user-input"].value;
  const [reply, setReply] = useState("...");

  useEffect(() => {
    axios
      .post("https://my-pfoolio2.onrender.com/api/chat", { message: userMessage })
      .then((res) => setReply(res.data.reply))
      .catch(() => setReply("Désolé, une erreur est survenue."));
  }, [userMessage]);

  useEffect(() => {
    if (reply !== "...") {
      setTimeout(() => triggerNextStep(), 2500); // Laisse le temps de lire
    }
  }, [reply, triggerNextStep]);

  return <span>{reply}</span>;
}

const steps = [
  {
    id: "1",
    message: "Bonjour 👋 ! Je suis l'assistant AI de ce portfolio. Posez-moi une question.",
    trigger: "user-input",
  },
  {
    id: "user-input",
    user: true,
    trigger: "openai-step",
  },
  {
    id: "openai-step",
    component: <OpenAIStep />,
    waitAction: true,
    trigger: "ask-again",
  },
  {
    id: "ask-again",
    message: "Voulez-vous poser une autre question ?",
    trigger: "choice",
  },
  {
    id: "choice",
    options: [
      { value: "oui", label: "Oui", trigger: "user-input" },
      { value: "non", label: "Non, merci", trigger: "end" },
    ],
  },
  {
    id: "end",
    message: "Merci d'avoir utilisé le chatbot ! 👋",
    end: true,
  },
];

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 9999,
          background: "linear-gradient(90deg, #5170FF 40%, #ff66c4 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          boxShadow: "0 4px 16px rgba(79,140,255,0.18)",
          fontSize: 28,
          cursor: "pointer",
        }}
        aria-label="Ouvrir le chatbot"
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 32,
            zIndex: 9999,
            width: 340,
            maxWidth: "90vw",
          }}
        >
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              floating={false}
              headerTitle="AI Chatbot"
              placeholder="Écrivez votre question..."
              recognitionEnable={true}
              botAvatar={botIcon}      // avatar du bot
              userAvatar={userIcon}    // avatar utilisateur
              hideSubmitButton={false}
              hideBotAvatar={false}
              hideUserAvatar={false}
              style={{ borderRadius: 16, boxShadow: "0 4px 24px rgba(79,140,255,0.13)" }}
            />
          </ThemeProvider>
        </div>
      )}
    </>
  );
}
