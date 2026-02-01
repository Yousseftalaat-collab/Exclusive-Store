import { useState, useRef, useEffect } from "react";
import { Send, Bot, Trash2, Minimize2 } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";
import { useChatBot } from "@/hooks/useChatBot";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/stores/useLanguageStore";

const ChatWindow: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { isOpen, messages, isTyping, setIsOpen, addMessage, clearChat } =
    useChatStore();
  const { processMessage } = useChatBot();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRTL = language === "ar";

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message
    addMessage({
      text: userMessage,
      sender: "user",
      type: "text",
    });

    // Process and get bot response
    await processMessage(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    { text: t("chat.quickReplies.products"), icon: "🛍️" },
    { text: t("chat.quickReplies.shipping"), icon: "🚚" },
    { text: t("chat.quickReplies.orders"), icon: "📦" },
    { text: t("chat.quickReplies.support"), icon: "💬" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-20 ${isRTL ? "left-4" : "right-4"} w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4 duration-300`}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-red-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{t("chat.title")}</h3>
            <p className="text-xs text-white/80">{t("chat.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            title={t("chat.clear")}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            title={t("chat.close")}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? `justify-${isRTL ? "start" : "end"}` : `justify-${isRTL ? "end" : "start"}`}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className="text-[10px] opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-500 mb-2">{t("chat.quickStart")}</p>
          <div className="grid grid-cols-2 gap-2">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputValue(reply.text);
                  handleSend();
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition text-left flex items-center gap-2"
              >
                <span>{reply.icon}</span>
                <span>{reply.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("chat.placeholder")}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`px-4 py-3 bg-primary text-white rounded-xl hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? "rotate-180" : ""}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
