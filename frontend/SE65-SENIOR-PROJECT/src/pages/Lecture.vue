<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
    <div class="container">
    <h1 class="title">Lecturer Main Page</h1>
    <div class="menu">
      <button @click="navigateTo('/upload-students')">Upload Students</button>
      <button @click="navigateTo('/view-students')">View Students</button>
      <button @click="navigateTo('/upload-question')">Upload Question</button>
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
  color: #ffffff;
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
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
</style>