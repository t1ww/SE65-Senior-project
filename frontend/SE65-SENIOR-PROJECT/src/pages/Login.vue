<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";


const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  try {
    await authStore.login(email.value, password.value);
    router.push("/home");
  } catch (err: any) {
    error.value = err.message || "Invalid login credentials";
  } finally {
    loading.value = false;
  }
};



</script>

<template>
    <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">{{ loading ? "Logging in..." : "Login" }}</button>
      <div class="forget">
        <p>forget password</p>
      </div>
      <p v-if="error" class="error">{{ error }}</p>

    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 50px;
  text-align: center;
}
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #c155ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
