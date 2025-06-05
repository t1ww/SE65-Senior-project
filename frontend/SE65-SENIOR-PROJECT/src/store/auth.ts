import { ref } from "vue";
import { useRouter } from "vue-router";
import type { UserData } from "@/types/types";

export const isAuthenticated = ref(!!localStorage.getItem("user_token"));

export function getUserData(): UserData | null {
  const token = localStorage.getItem("user_token");
  if (!token) return null;

  return {
    token,
    id: localStorage.getItem("user_id"),
    name: localStorage.getItem("user_name"),
    email: localStorage.getItem("user_email"),
    role: localStorage.getItem("user_role"),
  };
}

export function loginUser(user: {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}) {
  localStorage.setItem("user_token", user.token);
  localStorage.setItem("user_id", user.id);
  localStorage.setItem("user_name", user.name);
  localStorage.setItem("user_email", user.email);
  localStorage.setItem("user_role", user.role);
  isAuthenticated.value = true;

  console.log("Logged in user data:", user);
}

export function logoutUser() {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_role");

  isAuthenticated.value = false;

  const router = useRouter(); // works inside Vue components only
  setTimeout(() => {
    router.push({ name: "Login" });
  }, 300);
}
