<script setup lang="ts">
import { ref } from 'vue'

// Simulated fetched data
const name = ref('Q1')
const description = ref('Find the biggest number')
const hint = ref('2 5 8 9 = 9')
const estimatedRuntime = ref('1.2s')
const timeComplexity = ref('O(n)')

const saveChanges = () => {
  console.log({
    name: name.value,
    description: description.value,
    hint: hint.value,
    estimatedRuntime: estimatedRuntime.value,
    timeComplexity: timeComplexity.value,
  })
}
</script>

<template>
  <div class="container">
    <div class="back-button">
      <router-link to="/review">⬅ Back</router-link>
    </div>

    <h2>Edit Question</h2>
    <form @submit.prevent="saveChanges">
      <div class="input-group">
        <label for="name">Name:</label>
        <input v-model="name" type="text" required />
      </div>

      <div class="input-group">
        <label for="description">Description:</label>
        <input v-model="description" required />
      </div>

      <div class="input-group">
        <label for="hint">Hint:</label>
        <input v-model="hint" required />
      </div>

      <div class="input-group">
        <label for="estimatedRuntime">Estimated Runtime:</label>
        <input v-model="estimatedRuntime" required />
      </div>

      <div class="input-group">
        <label for="timeComplexity">Time Complexity:</label>
        <input v-model="timeComplexity" required />
      </div>

      <div class="input-group">
        <router-link to="/edit-test-case">View Test Case</router-link>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<style scoped>
h2 {
  color: #ff9233;
}
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}
.back-button {
  text-align: left;
  margin-bottom: 10px;
}
.back-button a {
  color: #f57c00;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}
.back-button a:hover {
  text-decoration: underline;
}
label {
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input {
  padding: 10px;
  background-color: white;
  border: 2px solid #9d7643;
  border-radius: 8px;
  font-size: 14px;
  color: black;
}
button {
  background-color: #f57c00;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
textarea {
  height: 100px;
  resize: none;
}
</style>
