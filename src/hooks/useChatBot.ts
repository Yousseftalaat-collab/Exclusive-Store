import { useTranslation } from "react-i18next";
import { useChatStore } from "@/stores/useChatStore";

// AI/FAQ Response System
export const useChatBot = () => {
  const { t } = useTranslation();
  const { addMessage, setIsTyping } = useChatStore();

  // Simulate typing delay
  const simulateTyping = async (delay = 1000) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setIsTyping(false);
  };

  // Process user message and generate response
  const processMessage = async (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    await simulateTyping(800);

    // Greetings
    if (
      lowerMessage.match(
        /^(hi|hello|hey|good morning|good evening|سلام|مرحبا|hola)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.greeting"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Product search
    if (
      lowerMessage.match(
        /(search|find|looking for|show me|أبحث عن|أريد|buscar|encontrar)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.productSearch"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Shipping
    if (
      lowerMessage.match(
        /(shipping|delivery|when|arrive|شحن|توصيل|envío|entrega)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.shipping"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Payment
    if (
      lowerMessage.match(/(payment|pay|credit|visa|دفع|بطاقة|pago|tarjeta)/i)
    ) {
      addMessage({
        text: t("chat.responses.payment"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Return/Refund
    if (
      lowerMessage.match(
        /(return|refund|cancel|استرجاع|إلغاء|devolver|reembolso)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.returns"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Track order
    if (
      lowerMessage.match(
        /(track|order|status|where is my|تتبع|طلب|rastrear|pedido)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.trackOrder"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Discount/Offers
    if (
      lowerMessage.match(
        /(discount|offer|deal|coupon|sale|خصم|عرض|descuento|oferta)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.discounts"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Contact support
    if (
      lowerMessage.match(
        /(help|support|contact|problem|issue|مساعدة|مشكلة|ayuda|problema)/i,
      )
    ) {
      addMessage({
        text: t("chat.responses.support"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Thank you
    if (lowerMessage.match(/^(thank|thanks|شكرا|gracias)/i)) {
      addMessage({
        text: t("chat.responses.thanks"),
        sender: "bot",
        type: "text",
      });
      return;
    }

    // Default response
    addMessage({
      text: t("chat.responses.default"),
      sender: "bot",
      type: "text",
    });
  };

  return { processMessage };
};
