<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { getUserData, isAuthenticated } from "@/store/auth";
import type { Question } from "@/types/types";

// Router
const route = useRoute();
const router = useRouter();

// State
const question = ref<Question | null>(null);
const loading = ref(false);
const error = ref("");
const code = ref("");
const submitting = ref(false);
const submissionMessage = ref("");
const submissionError = ref("");
const resultOutput = ref<string | null>(null);

// Fetch question from API
const fetchQuestion = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(`/questions/${route.params.id}`);
    question.value = response.data;
    code.value = response.data.startingCode;
    console.log(question.value);
  } catch (err) {
    error.value = "Failed to fetch question.";
  } finally {
    loading.value = false;
  }
};

// Handle file upload
const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    code.value = e.target?.result as string;
  };
  reader.readAsText(file);
};

// Submit to backend
const submitAnswer = async () => {
  const userData = getUserData();
  if (!isAuthenticated.value) {
    submissionError.value = "You must be logged in to submit an answer.";
    return;
  }
  if (userData == null) {
    submissionError.value =
      "Your logged in account is null, please try re-login.";
    return;
  }
  if (question.value == null) {
    submissionError.value = "question.value is null, please try again later.";
    return;
  }

  submitting.value = true;
  submissionMessage.value = "";
  submissionError.value = "";
  const cleanTestCases = JSON.parse(JSON.stringify(question.value.testCases));

  const payload = {
    code: code.value,
    testCases: cleanTestCases,
  };

  console.log("Submitting code:");
  console.log(code.value);
  console.log("testCases:");
  console.log(question.value.testCases);
  // Sending request
  try {
    const res = await axios.post("http://localhost:3000/run", payload, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    // Access returned response
    const result = res.data;
    console.log("Run Result:", result);

    // You can display part of the result or store it in a reactive variable
    submissionMessage.value = result.message || "Answer submitted successfully!";
    resultOutput.value = result.output;
    testResults.value = result.results || [];
    showResultsModal.value = true;
  } catch (err: any) {
    console.error("Submission Error:", err);
    submissionError.value =
      err.response?.data?.error || "Failed to submit answer.";
  } finally {
    submitting.value = false;
  }
};

// Show results
const showResultsModal = ref(false);
const testResults = ref<
  { input: string; output: string; expected: string; passed: boolean }[]
>([]);

onMounted(fetchQuestion);
</script>

<template>
  <div class="answer-page">
    <button @click="router.push('/view-question-list')" style="margin-bottom: 16px">
      ← Back to List
    </button>

    <div v-if="loading" class="loading">Loading question...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="question">
      <h2 class="heading">Question: {{ question.questionName }}</h2>

      <div class="question-box">
        <p><strong>Name:</strong> {{ question.questionName }}</p>
        <p><strong>Description:</strong> {{ question.questionDescription }}</p>
        <p><strong>Hint:</strong> {{ question.hint }}</p>
        <p><strong>Example Input:</strong> {{ question.exampleInput }}</p>
        <p><strong>Example Output:</strong> {{ question.exampleOutput }}</p>
        <p>
          <strong>Estimated Runtime:</strong> {{ question.estimatedRuntime }}
        </p>
        <p>
          <strong>Time Complexity O(n):</strong> {{ question.timeComplexity }}
        </p>

        <div class="code-upload">
          <textarea v-model="code" class="code-area" placeholder="Upload code here or write it..." rows="8"></textarea>

          <label class="upload-label" for="fileUpload">Upload Code</label>
          <input id="fileUpload" type="file" accept=".txt,.js,.ts,.py,.java,.cpp,.c" @change="handleFileUpload"
            class="hidden-file" />
        </div>
      </div>

      <button class="submit-button" :disabled="submitting" @click="submitAnswer">
        {{ submitting ? "Submitting..." : "Submit" }}
      </button>

      <div v-if="submissionMessage" class="success">
        {{ submissionMessage }}
      </div>
      <div v-if="submissionError" class="error">{{ submissionError }}</div>

      <!-- Submission resuts -->
      <div v-if="showResultsModal" class="modal-backdrop" @click.self="showResultsModal = false">
        <div class="modal-content">
          <h3>Test Case Results</h3>
          <ul>
            <li v-for="(result, index) in testResults" :key="index" :class="result.passed ? 'pass' : 'fail'">
              <p><strong>Input:</strong> {{ result.input }}</p>
              <p><strong>Output:</strong> {{ result.output }}</p>
              <p><strong>Expected:</strong> {{ result.expected }}</p>
              <p><strong>Status:</strong>
                <span :style="{ color: result.passed ? 'green' : 'red' }">
                  {{ result.passed ? "✔ Passed" : "✖ Failed" }}
                </span>
              </p>
            </li>
          </ul>
          <button @click="showResultsModal = false">Close</button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.answer-page {
  max-width: 50rem;
  margin: 60px auto;
  padding: 20px;
  text-align: center;
}

.heading {
  color: #f57c00;
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 24px;
}

.question-box {
  border: 1px solid #f57c00;
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
}

.question-box p {
  margin: 10px 0;
  font-size: 15px;
}

.code-upload {
  background-color: #fcd8b2;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
  position: relative;
}

.code-area {
  width: 100%;
  border: none;
  background: transparent;
  resize: vertical;
  min-height: 120px;
  font-family: monospace;
  font-size: 14px;
  color: #333;
  outline: none;
}

.code-area::placeholder {
  color: #efb07e;
  font-weight: 500;
  text-align: center;
}

.upload-label {
  display: inline-block;
  margin-top: 10px;
  background-color: #f57c00;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.upload-label:hover {
  background-color: #e06600;
}

.hidden-file {
  display: none;
}

.submit-button {
  background-color: #f57c00;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #e06600;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.success {
  color: green;
  font-size: 16px;
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 16px;
  margin-top: 10px;
}

/* Submission results */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
}

.modal-content h3 {
  margin-top: 0;
  color: #f57c00;
}

.modal-content ul {
  list-style: none;
  padding: 0;
}

.modal-content li {
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f5f5f5;
  border-left: 5px solid transparent;
}

.modal-content li.pass {
  border-color: #4caf50;
}

.modal-content li.fail {
  border-color: #f44336;
}

.modal-content button {
  background-color: #f57c00;
  color: white;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
