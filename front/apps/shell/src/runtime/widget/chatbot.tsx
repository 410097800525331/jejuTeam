import { createRoot, Root } from "react-dom/client";
import { ChatbotPanel } from "@runtime/components/widget/ChatbotPanel";
import { Language } from "@runtime/types";

let chatbotRoot: Root | null = null;
let chatbotHost: HTMLElement | null = null;
let chatbotOpen = false;
let language: Language = localStorage.getItem("jeju_fab_lang") === "en" ? "en" : "ko";

const rerender = () => {
  if (!chatbotRoot) {
    return;
  }

  chatbotRoot.render(
    <ChatbotPanel
      isOpen={chatbotOpen}
      onOpen={() => {
        chatbotOpen = true;
        rerender();
      }}
      onClose={() => {
        chatbotOpen = false;
        rerender();
      }}
      language={language}
      onLanguageChange={(nextLanguage) => {
        language = nextLanguage;
        localStorage.setItem("jeju_fab_lang", nextLanguage);
        rerender();
      }}
    />
  );
};

const ensureHost = () => {
  if (chatbotHost) {
    return;
  }

  chatbotHost = document.getElementById("jeju-chatbot-root");
  if (!chatbotHost) {
    chatbotHost = document.createElement("div");
    chatbotHost.id = "jeju-chatbot-root";
    document.body.appendChild(chatbotHost);
  }

  chatbotRoot = createRoot(chatbotHost);
  rerender();
};

export const setupLegacyChatbot = () => {
  ensureHost();

  window.hotelChatbot = {
    openChatbot: () => {
      chatbotOpen = true;
      rerender();
    },
    closeChatbot: () => {
      chatbotOpen = false;
      rerender();
    },
    toggleChatbot: () => {
      chatbotOpen = !chatbotOpen;
      rerender();
    },
    updateLanguage: (nextLanguage: Language) => {
      language = nextLanguage;
      localStorage.setItem("jeju_fab_lang", nextLanguage);
      rerender();
    }
  };
};
