<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useQuestionStore } from "@/stores/questionStore";

const questionStore = useQuestionStore();

interface Question {
  id: number;
  questionName: string;
  questionDescription: string;
  hint: string;
  exampleInput: string;
  exampleOutput: string;
  startingCode: string;
  correctAnswerCode: string;
  testCases: any[];
  estimatedRuntime: string;
  timeComplexity: string;
}

const question = computed(() => questionStore.question);

const route = useRoute();

const submitQuestion = async () => {
  try {
    const rawQuestion: Question = {
      id: questionStore.question.id,
      questionName: questionStore.question.questionName,
      questionDescription: questionStore.question.questionDescription,
      hint: questionStore.question.hint,
      exampleInput: questionStore.question.exampleInput,
      exampleOutput: questionStore.question.exampleOutput,
      startingCode: questionStore.question.startingCode,
      correctAnswerCode: questionStore.question.correctAnswerCode,
      testCases: [...questionStore.question.testCases],
      estimatedRuntime: questionStore.question.estimatedRuntime,
      timeComplexity: questionStore.question.timeComplexity,
    };
    const response = await axios.put(
      `http://localhost:10601/questions/${question.value.id}`,
      rawQuestion
    );
    console.log("Question edited successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error editing question:", error.response?.data || error.message);
    throw error;
  }
};

onMounted(async () => {
  const id = Number(route.params.id);
  if (!questionStore.question.id || questionStore.question.id !== id) {
    try {
      const response = await axios.get(`http://localhost:10601/questions/${id}`);
      questionStore.question = response.data;
    } catch (error: any) {
      console.error("Failed to fetch question:", error.response?.data || error.message);
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="back-button">
      <router-link to="/review">⬅ Back</router-link>
    </div>

    <h2>Edit Question</h2>
    <form @submit.prevent="submitQuestion">
      <div class="input-group">
        <label>Name:</label>
        <input v-model="question.questionName" type="text" required />
      </div>

      <div class="input-group">
        <label>Description:</label>
        <input v-model="question.questionDescription" required />
      </div>

      <div class="input-group">
        <label>Hint:</label>
        <input v-model="question.hint" />
      </div>

      <div class="input-group">
        <label>Example Input:</label>
        <input v-model="question.exampleInput" />
      </div>

      <div class="input-group">
        <label>Example Output:</label>
        <input v-model="question.exampleOutput" />
      </div>

      <div class="input-group">
        <label>Estimated Runtime:</label>
        <input v-model="question.estimatedRuntime" />
      </div>

      <div class="input-group">
        <label>Time Complexity:</label>
        <input v-model="question.timeComplexity" />
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

a {
  color: #ff9233;
  text-decoration: underline;
}

.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  margin-top: 2rem;
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
