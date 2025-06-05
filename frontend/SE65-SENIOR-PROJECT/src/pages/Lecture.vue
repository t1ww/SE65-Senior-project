<script setup lang="ts">
import { useRouter, type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from 'vue-router';
const router = useRouter();

const navigateTo = (path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  router.push(path);
};
</script>

<template>
  <div class="container">
    <div class="menu">
      <button @click="navigateTo('/register')">Upload Students</button>
      <button @click="navigateTo('/view-students')">View Students</button>
      <button @click="navigateTo('/create-question')">Create Question</button>
      <button @click="navigateTo('/view-question-list')">View Questions</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #f57c00; /* Orange title */
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  width: 300px;
  padding: 15px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #f57c00; /* Orange button */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e06600; /* Darker orange on hover */
}
</style>
