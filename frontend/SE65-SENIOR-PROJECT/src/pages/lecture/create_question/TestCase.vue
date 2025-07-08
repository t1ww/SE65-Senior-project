<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuestionStore } from "@/stores/questionStore";

const { question } = useQuestionStore();

const itemsPerPage = 2;
const currentPage = ref(0);

const paginated = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return question.testCases.slice(start, start + itemsPerPage);
});

function nextPage() {
  if ((currentPage.value + 1) * itemsPerPage < question.testCases.length) {
    currentPage.value++;
  }
}
function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}
function addTestCase() {
  question.testCases.push({ input: "", expectedOutput: "" });
  if (question.testCases.length > (currentPage.value + 1) * itemsPerPage) {
    currentPage.value++;
  }
}
function deleteTestCase(idx: number) {
  const realIndex = currentPage.value * itemsPerPage + idx;
  question.testCases.splice(realIndex, 1);
  if (currentPage.value > 0 && paginated.value.length === 0) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="container">
    <div class="content-box">
      <div class="back-button">
        <router-link to="/create-question">⬅ Back</router-link>
      </div>

      <h3>Correct Answer Code</h3>
      <div class="test-case-item">
        <div class="input-wrapper">
          <label>Correct Answer Code:</label>
          <textarea v-model="question.correctAnswerCode" placeholder="Enter correct answer code" />
        </div>
      </div>
      
      <h3>Test Cases</h3>
      <div class="test-case-list">
        <div v-for="(testCase, index) in paginated" :key="index" class="test-case-item">
          <div class="test-case-header">
            <strong>Test Case {{ currentPage * itemsPerPage + index + 1 }}</strong>
            <button @click="deleteTestCase(index)" class="delete-button">🗑 Delete</button>
          </div>

          <div class="input-wrapper">
            <label>Input:</label>
            <input v-model="testCase.input" placeholder="Enter test case input" />
          </div>

          <div class="input-wrapper">
            <label>Output:</label>
            <input v-model="testCase.expectedOutput" placeholder="Enter expected output" />
          </div>
        </div>
      </div>

      <div class="add-button">
        <button @click="addTestCase">Add Test Case</button>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 0">⬅ Previous</button>
        <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= question.testCases.length">Next
          ➡</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
}

.content-box {
  border: 2px solid #f57c00;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.back-button {
  margin-bottom: 15px;
  text-align: left;
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

h3 {
  color: #f57c00;
  text-align: center;
}

.test-case-list {
  display: flex;
  flex-direction: column;
}

.test-case-item {
  background-color: #ffe2c2;
  border: 2px solid #f57c00;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.test-case-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
}

.input-wrapper label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

input,
textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  font-family: monospace;
  resize: none;
  box-sizing: border-box;
}

.add-button {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #f57c00;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

button:hover {
  background-color: #e06600;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.delete-button {
  background-color: #ff4d4d;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
}

.delete-button:hover {
  background-color: #cc0000;
}
</style>
