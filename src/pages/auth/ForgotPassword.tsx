import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ForgotPassword() {
  const { t } = useTranslation();

  const { sendResetPasswordEmail, isLoading, error, clearError } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    try {
      await sendResetPasswordEmail(email);
      setSuccess("Reset link sent! Check your email.");
      setEmail("");
    } catch {
      // error handled by store
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-[400px] py-12 px-4">
        <h2 className="text-3xl font-medium text-dark font-inter">
          {t("auth.forgotPassword.title")}
        </h2>
        <p className="mt-2 text-sm text-dark font-poppins">
          {t("auth.forgotPassword.subtitle")}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder={t("auth.forgotPassword.emailPlaceholder")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              clearError();
            }}
            className="w-full border-b-2 border-x-0 border-t-0 rounded-none px-0"
          />

          {emailError && <p className="text-sm text-red-500">{emailError}</p>}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="py-4"
          >
            {isLoading ? "Sending..." : t("auth.forgotPassword.sendButton")}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
