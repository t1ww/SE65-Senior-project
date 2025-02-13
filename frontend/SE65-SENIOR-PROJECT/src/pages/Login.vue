<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  console.log("Logging in")

  try {
    const { data } = await axios.post('/users/login', {
      email: email.value,
      password: password.value
    })
    console.log(data)
    localStorage.setItem('token', data.token)
    router.push({ path: "/" })
  } catch (err: any) {
    console.error(err)
    error.value = err.response?.data?.error || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
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
      <br>
      <div class="forget">
        <a href="https://translate.google.co.th/?sl=en&tl=th&op=translate">forget password</a>
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
