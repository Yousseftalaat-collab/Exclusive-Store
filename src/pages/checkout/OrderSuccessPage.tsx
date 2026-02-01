import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home } from "lucide-react";
import Button from "@/components/ui/Button";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-border p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-heading font-bold text-dark mb-3">
          Order Placed Successfully!
        </h2>
        <p className="text-muted mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-dark">Order Confirmation</p>
          </div>
          <p className="text-xs text-muted">
            A confirmation email has been sent to your email address
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/orders")}
            variant="primary"
            fullWidth
            className="h-12"
          >
            View My Orders
          </Button>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            fullWidth
            className="h-12 gap-2"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted">
            Need help? Contact our{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-primary hover:underline"
            >
              customer support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
