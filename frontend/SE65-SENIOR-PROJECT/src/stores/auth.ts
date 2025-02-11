import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { email: string },
    token: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        this.$patch({
          user: response.data.user,
          token: response.data.token,
        });

        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.error("Login error:", error); // ✅ Log error for debugging
        throw new Error("Invalid credentials");
      }
    },
  },
});
