import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on 'Sign Up' in the navigation menu, fill in your details (name, email, password), and submit the form. You'll receive a confirmation email to verify your account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including Credit/Debit Cards (Visa, Mastercard), Bank transfers, bKash, Nagad, and Cash on Delivery for eligible orders.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days within Bangladesh. Express shipping is available for 1-2 business days. International orders typically take 7-14 business days depending on the destination.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 14-day return policy for most items. Products must be unused and in their original packaging. Simply go to 'My Orders', select the item, and click 'Return Item'. We'll process your refund within 5-7 business days.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email. You can also view your order status by logging into your account and going to 'My Orders' section.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before it's shipped. Go to 'My Orders', find your order, and click 'Cancel Order'. Once shipped, you'll need to use our return process instead.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer free shipping on orders over $100 within Bangladesh. For orders below $100, standard shipping costs $10.",
    },
    {
      question: "How do I use a coupon code?",
      answer:
        "Enter your coupon code in the 'Coupon Code' field on the cart or checkout page and click 'Apply Coupon'. The discount will be applied to your order total automatically.",
    },
    {
      question: "What if I receive a damaged or wrong item?",
      answer:
        "We apologize for any inconvenience. Please contact our customer support within 48 hours of receiving your order with photos of the damaged item or wrong product. We'll arrange a replacement or full refund immediately.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us via email at exclusive@gmail.com, call us at +88015-88888-9999, or use the Contact form on our website. Our support team is available Monday-Saturday, 9 AM - 6 PM.",
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer:
        "If your order hasn't been shipped yet, contact our customer support immediately and we'll update the address. Once shipped, address changes are not possible.",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-2 text-sm mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            Home
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark">FAQ</span>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-dark pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                )}
              </button>
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0",
                )}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-border">
                  <p className="text-dark leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-border text-center">
          <h3 className="text-lg font-heading font-semibold text-dark mb-2">
            Still have questions?
          </h3>
          <p className="text-muted mb-4">
            Can't find the answer you're looking for? Please contact our
            customer support team.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-block px-6 py-3 bg-primary text-white rounded hover:bg-red-600 transition-colors font-medium"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
