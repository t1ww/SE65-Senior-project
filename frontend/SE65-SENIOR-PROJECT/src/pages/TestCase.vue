<script setup lang="ts">
import { ref, computed } from "vue";

// Initialize test cases as an empty array
const questionData = ref({
  testCases: [
    // You can start with an empty array or add a default test case if needed
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

// Function to add a new test case
const addTestCase = () => {
  questionData.value.testCases.push({ input: "", output: "" });

  // Check if the new test case exceeds the current page limit and move to the next page if needed
  if (questionData.value.testCases.length > (currentPage.value + 1) * itemsPerPage) {
    currentPage.value++;
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
        <div class="input-group">
          <label>Input:</label>
          <textarea v-model="testCase.input" placeholder="Enter test case input"></textarea>
        </div>
        <div class="input-group">
          <label>Output:</label>
          <textarea v-model="testCase.output" placeholder="Enter expected output"></textarea>
        </div>
      </div>
    </div>

    <!-- Add Test Case button -->
    <div class="add-button">
      <button @click="addTestCase">Add Test Case</button>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">⬅ Previous</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= questionData.testCases.length">Next ➡</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.back-button {
  margin-bottom: 15px;
  text-align: left;
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
  color: #9c33ff;
  text-align: center;
  margin-bottom: 15px;
}

.test-case-list {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.test-case-item {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  border-left: 5px solid #007bff;
  background: rgb(236, 203, 255);
  border-radius: 6px;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  max-width: 400px;
  min-height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}

.add-button {
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
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
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
textarea {
    width: 100%;
    height: 100px; /* Set fixed height */
    resize: none;  /* Prevent resizing */
}
</style>
