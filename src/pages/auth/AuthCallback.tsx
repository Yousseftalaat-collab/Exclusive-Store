import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { checkSession, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await checkSession();

        setTimeout(() => {
          if (isAuthenticated) {
            navigate("/", { replace: true });
          } else {
            navigate("/login", { replace: true });
          }
        }, 500);
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [checkSession, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
