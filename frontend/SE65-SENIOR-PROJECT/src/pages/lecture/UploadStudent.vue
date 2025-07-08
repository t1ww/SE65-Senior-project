<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const success = ref(false);
const loading = ref(false);
const error = ref("");

const handleRegister = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    await axios.post("/users/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    // Show success
    success.value = true;
    console.log("Registration successful");
  } catch (err: any) {
    error.value = err?.response?.data?.message || "Registration failed";
    success.value = false;
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister" class="auth-form">
      <h2 class="form-title">Upload student</h2>
      <div v-if="success" class="success-box">
        <p>Upload successful!  
          <router-link to="ViewStudents" class="view-link">View student list →</router-link>
        </p>
      </div>


      <label for="name">Full Name</label>
      <input id="name" v-model="name" type="text" placeholder="Enter your name" required />

      <label for="email">Email Address</label>
      <input id="email" v-model="email" type="email" placeholder="Enter your email" required />

      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" placeholder="Enter password" required />

      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm password" required />

      <button :disabled="loading" type="submit">
        {{ loading ? "Registering..." : "Register" }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>


<style scoped>
/* Success popup */
.success-box {
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.success-box p {
  margin: 0;
  font-size: 14px;
  color: #2e7d32;
  display: inline;
}

.view-link {
  margin-left: 8px;
  color: #f57c00;
  font-weight: 500;
  text-decoration: underline;
}


/* Page container */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
}

.auth-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  color: #f57c00;
  text-align: center;
  margin-bottom: 10px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 12px;
  background-color: #f57c00;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
