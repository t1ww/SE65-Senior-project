<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { getUserData } from "@/store/auth";
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

// Fetch question from API
const fetchQuestion = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(`/questions/${route.params.id}`);
    question.value = response.data;
    code.value = response.data.startingCode;
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
  if (!userData || !userData.token) {
    submissionError.value = "You must be logged in to submit an answer.";
    return;
  }

  submitting.value = true;
  submissionMessage.value = "";
  submissionError.value = "";

  try {
    await axios.post(
      "http://localhost:5000/answers",
      {
        question_id: question.value?.id,
        answerCode: code.value,
        result: null,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    submissionMessage.value = "Answer submitted successfully!";
  } catch (err) {
    submissionError.value = "Failed to submit answer.";
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchQuestion);
</script>

<template>
  <div class="answer-page">
    <button @click="router.push('/view-question-list')" style="margin-bottom: 16px;">← Back to List</button>

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

        <div class="code-upload">
          <textarea
            v-model="code"
            class="code-area"
            placeholder="Upload code here or write it..."
            rows="8"
          ></textarea>

          <label class="upload-label" for="fileUpload">Upload Code</label>
          <input
            id="fileUpload"
            type="file"
            accept=".txt,.js,.ts,.py,.java,.cpp,.c"
            @change="handleFileUpload"
            class="hidden-file"
          />
        </div>
      </div>

      <button class="submit-button" :disabled="submitting" @click="submitAnswer">
        {{ submitting ? "Submitting..." : "Submit" }}
      </button>

      <div v-if="submissionMessage" class="success">{{ submissionMessage }}</div>
      <div v-if="submissionError" class="error">{{ submissionError }}</div>
    </div>
  </div>
</template>

<style scoped>
.answer-page {
  max-width: 480px;
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
</style>
