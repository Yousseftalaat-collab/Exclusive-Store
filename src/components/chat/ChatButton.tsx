import { MessageCircle, X } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

const ChatButton: React.FC = () => {
  const { isOpen, unreadCount, setIsOpen } = useChatStore();
  const { language } = useLanguageStore();

  const isRTL = language === "ar";

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} w-16 h-16 bg-gradient-to-r from-primary to-red-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group`}
      aria-label="Chat with us"
    >
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

      {/* Icon */}
      <div className="relative z-10">
        {isOpen ? (
          <X className="w-7 h-7 transition-transform group-hover:rotate-90 duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-12 duration-300" />
        )}
      </div>

      {/* Unread badge */}
      {unreadCount > 0 && !isOpen && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}

      {/* Tooltip */}
      {!isOpen && (
        <div
          className={`absolute bottom-full mb-2 ${isRTL ? "left-0" : "right-0"} bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        >
          Chat with us! 💬
        </div>
      )}
    </button>
  );
};

export default ChatButton;
