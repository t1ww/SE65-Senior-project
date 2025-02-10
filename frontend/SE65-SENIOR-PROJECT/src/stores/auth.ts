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
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password
        }, { withCredentials: true });

        // ✅ Fix: Use $patch to update state correctly
        this.$patch({
          user: response.data.user,
          token: response.data.token
        });

        // ✅ Fix: Store token in localStorage properly
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        throw new Error("Invalid credentials");
      }
    },
  },
});
