import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "product" | "order" | "quick-reply";
  data?: any;
};

type ChatState = {
  isOpen: boolean;
  messages: Message[];
  unreadCount: number;
  isTyping: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearUnread: () => void;
  setIsTyping: (isTyping: boolean) => void;
  clearChat: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [
        {
          id: "welcome-1",
          text: "Hello! 👋 Welcome to Exclusive Store! How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
      ],
      unreadCount: 0,
      isTyping: false,

      setIsOpen: (isOpen) => {
        set({ isOpen });
        if (isOpen) {
          set({ unreadCount: 0 });
        }
      },

      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}-${Math.random()}`,
          timestamp: new Date(),
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
          unreadCount:
            !state.isOpen && message.sender === "bot"
              ? state.unreadCount + 1
              : state.unreadCount,
        }));
      },

      clearUnread: () => set({ unreadCount: 0 }),

      setIsTyping: (isTyping) => set({ isTyping }),

      clearChat: () =>
        set({
          messages: [
            {
              id: "welcome-1",
              text: "Chat cleared! How can I help you?",
              sender: "bot",
              timestamp: new Date(),
              type: "text",
            },
          ],
          unreadCount: 0,
        }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ messages: state.messages }),
    },
  ),
);
