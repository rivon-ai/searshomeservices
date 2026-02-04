/**
 * Auth Service
 * Handles sign-in, sign-up, forgot password, and verification logic.
 * Currently uses mock delays to simulate API calls.
 */

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const validations = {
  validateEmail: (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  },
  validatePassword: (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
  },
  validateUsername: (username: string): string | null => {
    if (!username) return "Full name is required";
    if (username.trim().length < 2) return "Full name must be at least 2 characters";
    return null;
  }
};

export const authService = {
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(1000);
    // Mock user for testing
    if (email === "test@example.com" && password === "password123") {
      return { success: true, message: "Signed in successfully" };
    }
    return { success: false, message: "Invalid email or password" };
  },

  signUp: async (data: any): Promise<AuthResponse> => {
    await delay(1200);
    // Mock success
    return { success: true, message: "Account created successfully" };
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    await delay(800);
    // Mock success
    return { success: true, message: "If an account exists for this email, you will receive a reset link shortly." };
  }
};
