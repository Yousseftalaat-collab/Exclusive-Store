import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/ui/PasswordInput";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    loginWithGoogle,
    isLoading,
    error,
    isAuthenticated,
    clearError,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
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
      name: "",
      email: "",
      password: "",
    };

    // Name validation
    if (!formData.name) {
      errors.name = t("auth.register.nameRequired");
    } else if (formData.name.length < 2) {
      errors.name = t("auth.register.nameRequired");
    }

    // Email validation
    if (!formData.email) {
      errors.email = t("auth.register.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("auth.register.emailInvalid");
    }

    // Password validation
    if (!formData.password) {
      errors.password = t("auth.register.passwordRequired");
    } else if (formData.password.length < 6) {
      errors.password = t("auth.register.passwordLength");
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Google Sign Up error:", err);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-[1305px] flex gap-[130px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Image */}
        <div className="hidden lg:flex flex-[1.2] items-center justify-start bg-[#CBE4E8] rounded-lg p-12">
          {" "}
          <img
            src="/assets/images/login-image.png"
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
              {t("auth.register.title")}
            </h2>
            <p className="mt-2 text-sm text-dark font-poppins">
              {t("auth.register.subtitle")}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("auth.register.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border-b-2 border-t-0 border-x-0 rounded-none px-0 py-2 focus:ring-0 ${
                    formErrors.name
                      ? "border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("auth.register.emailPlaceholder")}
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
                  placeholder={t("auth.register.passwordPlaceholder")}
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

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                fullWidth
                className="py-4 text-base font-medium"
              >
                {isLoading
                  ? t("common.loading")
                  : t("auth.register.createButton")}
              </Button>
            </div>

            {/* Google Sign Up */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-base text-gray-600 font-poppins">
                {t("auth.register.haveAccount")}{" "}
                <Link
                  to="/login"
                  className="font-medium text-dark hover:text-primary underline ms-2"
                >
                  {t("auth.register.logIn")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
