<script setup lang="ts">
import { ref, computed } from "vue";

const questionData = ref({
  testCases: [
    { input: "1 2", output: "3" },
    { input: "5 7", output: "12" },
    { input: "10 20", output: "30" },
    { input: "100 200", output: "300" },
    { input: "3 3", output: "6" }
  ]
});

const currentPage = ref(0);
const itemsPerPage = 2;

const paginatedTestCases = computed(() => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  return questionData.value.testCases.slice(start, end);
});

const nextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < questionData.value.testCases.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="container">
    <div class="back-button">
      <router-link to="/create-question">⬅ Back</router-link>
    </div>

    <h3>Test Cases:</h3>

    <div class="test-case-list">
      <div v-for="(testCase, index) in paginatedTestCases" :key="index" class="test-case-item">
        <div class="test-case-header">
          <strong>Test Case {{ currentPage * itemsPerPage + index + 1 }}</strong>
        </div>
        <div class="test-case-content">
          <span><strong>Input:</strong> {{ testCase.input }}</span>
          <span><strong>Output:</strong> {{ testCase.output }}</span>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">⬅ Previous</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= questionData.testCases.length">Next ➡</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  float: left;
  max-width: 100%;
  margin-left: 20px;
  padding: 20px;
  text-align: left;
}

.back-button {
  margin-bottom: 15px;
}

.back-button a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.back-button a:hover {
  text-decoration: underline;
}

h3 {
  color: #d70cff;
  text-align: left;
  margin-bottom: 15px;
}

.test-case-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
}

.test-case-item {
  width: 100%;
  padding: 10px;
  border-left: 5px solid #007bff;
  background: rgb(0, 0, 0);
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.test-case-header {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.test-case-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}

button {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
