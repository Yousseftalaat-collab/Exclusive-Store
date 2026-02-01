import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/services/supabaseClient.ts";
import type {
  User as SupabaseUser,
  AuthChangeEvent,
  Session,
} from "@supabase/supabase-js";

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  address?: string;
  createdAt?: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;

  clearError: () => void;
  checkSession: () => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

// Helper function to transform Supabase user to our User type
const transformSupabaseUser = (supabaseUser: SupabaseUser): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    name:
      supabaseUser.user_metadata?.name ||
      supabaseUser.email?.split("@")[0] ||
      "User",
    avatar:
      supabaseUser.user_metadata?.avatar_url ||
      `https://ui-avatars.com/api/?name=${supabaseUser.email?.split("@")[0]}`,
    createdAt: supabaseUser.created_at,
  };
};

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login with email and password
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            const user = transformSupabaseUser(data.user);
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: unknown) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Register new user
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Sign up with Supabase
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            const user = transformSupabaseUser(data.user);
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: unknown) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Login with Google OAuth
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) throw error;

          // OAuth will redirect, so we don't need to set state here
          // The session will be handled by the callback
        } catch (error: unknown) {
          set({
            error:
              error instanceof Error ? error.message : "Google sign in failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        } catch (error: unknown) {
          set({
            error: error instanceof Error ? error.message : "Logout failed",
          });
          throw error;
        }
      },
      /* ---------- Send Reset Email ---------- */
      sendResetPasswordEmail: async (email) => {
        set({ isLoading: true, error: null });

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) throw error;

          set({ isLoading: false });
        } catch (err) {
          set({
            error:
              err instanceof Error ? err.message : "Failed to send reset email",
            isLoading: false,
          });
          throw err;
        }
      },

      /* ---------- Update Password ---------- */
      updatePassword: async (newPassword) => {
        set({ isLoading: true, error: null });

        try {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (error) throw error;

          set({ isLoading: false });
        } catch (err) {
          set({
            error:
              err instanceof Error ? err.message : "Password update failed",
            isLoading: false,
          });
          throw err;
        }
      },

      // Set user directly (for session restoration)
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },
      // Update user information
      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check for existing session
      checkSession: async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            const user = transformSupabaseUser(session.user);
            set({
              user,
              isAuthenticated: true,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error: unknown) {
          console.error("Session check failed:", error);
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage", // Key in localStorage
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Set up auth state listener
supabase.auth.onAuthStateChange(
  (_event: AuthChangeEvent, session: Session | null) => {
    if (session?.user) {
      const user = transformSupabaseUser(session.user);
      useAuthStore.getState().setUser(user);
    } else {
      useAuthStore.getState().setUser(null);
    }
  },
);
