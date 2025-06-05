<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

const correctCode = ref("");

const loadTestCases = () => {
  const storedTestCases = localStorage.getItem("testCases");
  if (storedTestCases) {
    const parsedCases = JSON.parse(storedTestCases);
    return parsedCases.length > 0 ? parsedCases : [{ input: "", output: "" }];
  }
  return [{ input: "", output: "" }];
};

const saveTestCases = () => {
  localStorage.setItem("testCases", JSON.stringify(questionData.value.testCases));
};

const saveCurrentPage = () => {
  localStorage.setItem("currentPage", JSON.stringify(currentPage.value));
};

const loadCurrentPage = () => {
  const storedPage = localStorage.getItem("currentPage");
  return storedPage ? JSON.parse(storedPage) : 0;
};

const questionData = ref({
  testCases: loadTestCases(),
});

const currentPage = ref(loadCurrentPage());
const itemsPerPage = 2;

const paginatedTestCases = computed(() => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  return questionData.value.testCases.slice(start, end);
});

const nextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < questionData.value.testCases.length) {
    currentPage.value++;
    saveCurrentPage();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    saveCurrentPage();
  }
};

const addTestCase = () => {
  questionData.value.testCases.push({ input: "", output: "" });
  saveTestCases();

  if (questionData.value.testCases.length > (currentPage.value + 1) * itemsPerPage) {
    currentPage.value++;
    saveCurrentPage();
  }
};

const deleteTestCase = (index: number) => {
  const actualIndex = currentPage.value * itemsPerPage + index;
  questionData.value.testCases.splice(actualIndex, 1);
  saveTestCases();

  if (currentPage.value > 0 && paginatedTestCases.value.length === 0) {
    currentPage.value--;
    saveCurrentPage();
  }
};

watch(
  () => questionData.value.testCases,
  () => {
    saveTestCases();
  },
  { deep: true }
);

onMounted(() => {
  questionData.value.testCases = loadTestCases();
  currentPage.value = 0;
  saveTestCases();
});
</script>

<template>
  <div class="container">
    <div class="content-box">
      <div class="back-button">
        <router-link to="/create-question">⬅ Back</router-link>
      </div>

      <h3>Test Cases</h3>

      <div class="test-case-list">
        <div v-for="(testCase, index) in paginatedTestCases" :key="index" class="test-case-item">
          <div class="test-case-header">
            <strong>Test Case {{ currentPage * itemsPerPage + index + 1 }}</strong>
            <button @click="deleteTestCase(index)" class="delete-button">🗑 Delete</button>
          </div>
          <div class="input-group">
            <label>Input:</label>
            <input v-model="testCase.input" placeholder="Enter test case input" />
          </div>
          <div class="input-group">
            <label>Output:</label>
            <input v-model="testCase.output" placeholder="Enter expected output" />
          </div>
          <div class="input-group">
            <label>Correct Answer Code:</label>
            <textarea v-model="correctCode" required />
          </div>
        </div>
      </div>

      <div class="add-button">
        <button @click="addTestCase">Add Test Case</button>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 0">⬅ Previous</button>
        <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= questionData.testCases.length">Next ➡</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}

.content-box {
  border: 2px solid #f57c00;
  border-radius: 15px;
  padding: 25px;
  background-color: #fff3e6;
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
  margin-bottom: 20px;
}

.test-case-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.test-case-item {
  background-color: #ffe2c2;
  border-left: 5px solid #f57c00;
  padding: 20px;
  border-radius: 10px;
}

.test-case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.input-group label {
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
