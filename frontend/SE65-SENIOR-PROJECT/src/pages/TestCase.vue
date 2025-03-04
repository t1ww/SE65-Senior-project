<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

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
    <div class="back-button">
      <router-link to="/create-question">⬅ Back</router-link>
    </div>

    <div class="input-group">
        <label for="correctCode">Correct Answer Code:</label>
        <textarea v-model="correctCode" required />
    </div>

    <h3>Test Cases:</h3>

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

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;
}

.delete-button:hover {
  background-color: #cc0000;
}

textarea {
    width: 100%;
    
    resize: none;  /* Prevent resizing */
}
</style>
