import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";
import { supabase } from "@/services/supabaseClient";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { updatePassword, isLoading, error, clearError } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  // 🔑 IMPORTANT: Read session from URL (access_token)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login");
      }
    });

    return () => clearError();
  }, [navigate, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      await updatePassword(password);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-[400px] py-12 px-4">
        <h2 className="text-3xl font-medium text-dark font-inter">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-dark font-poppins">
          Enter your new password below
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <PasswordInput
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {(formError || error) && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{formError || error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            fullWidth
            className="py-4"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
