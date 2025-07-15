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

// uploading testcase files
function handleTestCaseUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const fileMap: Record<string, { input?: string; output?: string }> = {};

  const fileReads = Array.from(files).map((file) => {
    return new Promise<void>((resolve) => {
      const match = file.name.match(/^(\d+)\.(in|sol)$/);
      if (!match) return resolve();

      const index = match[1];
      const type = match[2];

      const reader = new FileReader();
      reader.onload = () => {
        const content = (reader.result as string).trim();
        if (!fileMap[index]) fileMap[index] = {};
        if (type === "in") fileMap[index].input = content;
        else fileMap[index].output = content;
        resolve();
      };
      reader.readAsText(file);
    });
  });

  Promise.all(fileReads).then(() => {
    const sortedKeys = Object.keys(fileMap).sort((a, b) => Number(a) - Number(b));
    for (const key of sortedKeys) {
      const idx = Number(key) - 1;
      const data = fileMap[key];

      if (question.testCases[idx]) {
        if (data.input !== undefined) question.testCases[idx].input = data.input;
        if (data.output !== undefined) question.testCases[idx].expectedOutput = data.output;
      } else {
        question.testCases[idx] = {
          input: data.input || "",
          expectedOutput: data.output || ""
        };
      }
    }

    // Force to last page to see newest
    currentPage.value = Math.floor((question.testCases.length - 1) / itemsPerPage);
  });
}
function handleDrop(event: DragEvent) {
  const files = event.dataTransfer?.files;
  if (!files) return;

  const input = document.getElementById("fileUpload") as HTMLInputElement;
  const dataTransfer = new DataTransfer();

  Array.from(files).forEach(file => {
    dataTransfer.items.add(file);
  });

  input.files = dataTransfer.files;

  // Reuse the same handler
  handleTestCaseUpload({ target: input } as unknown as Event);
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

      <div class="upload-dropzone" @dragover.prevent @dragenter.prevent @drop.prevent="handleDrop">
        <label for="fileUpload" class="upload-label">
          <div class="upload-icon">📂</div>
          <div>Click or drag & drop .in/.sol files here</div>
          <input id="fileUpload" type="file" @change="handleTestCaseUpload" multiple accept=".in,.sol"
            style="display: none" />
        </label>
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

/* Upload test case */
.upload-dropzone {
  border: 2px dashed #f57c00;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  margin: 20px 0;
  background-color: #fff7f0;
  color: #f57c00;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.upload-dropzone:hover {
  background-color: #fff0e0;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.upload-icon {
  font-size: 30px;
}

</style>
