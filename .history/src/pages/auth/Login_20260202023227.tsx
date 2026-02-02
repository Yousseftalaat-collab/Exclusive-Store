import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/ui/PasswordInput";

export default function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email) {
      errors.email = t("auth.login.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("auth.login.emailInvalid");
    }

    // Password validation
    if (!formData.password) {
      errors.password = t("auth.login.passwordRequired");
    } else if (formData.password.length < 6) {
      errors.password = t("auth.login.passwordLength");
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      // Navigation will happen automatically via useEffect when isAuthenticated changes
    } catch (err) {
      // Error is handled by the store
      console.error("Login error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-[1305px] flex gap-[130px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Image */}
        <div className="hidden lg:flex flex-[1.2] items-center justify-start bg-[#CBE4E8] rounded-lg p-12">
          <img
            src="/images/login-image.png"
            alt="Shopping"
            className="max-w-full h-auto -ml-10"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.src =
                "https://via.placeholder.com/600x600?text=Shopping+Cart";
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-[375px] h-[530px] space-y-[48px]">
          <div>
            <h2 className="text-3xl font-medium text-dark font-inter">
              {t("auth.login.title")}
            </h2>
            <p className="mt-2 text-sm text-dark font-poppins">
              {t("auth.login.subtitle")}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("auth.login.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border-b-2 border-t-0 border-x-0 rounded-none px-0 py-2 focus:ring-0 ${
                    formErrors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder={t("auth.login.passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border-b-2 border-t-0 border-x-0 rounded-none px-0 py-2 focus:ring-0 ${
                    formErrors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Error Message from Store */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button and Forgot Password */}
            <div className="flex items-center justify-between gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="flex-1 py-4 text-base font-medium"
              >
                {isLoading ? t("common.loading") : t("auth.login.loginButton")}
              </Button>

              <Link
                to="/forgot-password"
                className="text-primary hover:text-primary/80 text-base font-poppins whitespace-nowrap"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
