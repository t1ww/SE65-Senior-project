<script setup lang="ts">
import { ref, computed } from 'vue';

const questionData = ref({
  testCases: [
    {
      input: "1 2",
      output: "3"
    },
    {
      input: "5 7",
      output: "12"
    },
    {
      input: "10 20",
      output: "30"
    },
    {
      input: "100 200",
      output: "300"
    },
    {
      input: "3 3",
      output: "6"
    }
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
        <router-link to="/create-question">Back</router-link>
      </div>
  
      <h3>Test Cases:</h3>
      <ul class="test-case-list">
        <li v-for="(testCase, index) in paginatedTestCases" :key="index" class="test-case-item">
          <strong>Test case {{ currentPage * itemsPerPage + index + 1 }}</strong><br>
          <strong>Input:</strong> {{ testCase.input }} <br>
          <strong>Output:</strong> {{ testCase.output }}
          <hr />
        </li>
      </ul>
  
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
        <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= questionData.testCases.length">Next</button>
      </div>
      
    </div>
  </template>
  

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  
}

.back-button {
  text-align: left;
  margin-bottom: 20px;
}

.back-button a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.back-button a:hover {
  text-decoration: underline;
}

h2, h3 {
  color: #333;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
