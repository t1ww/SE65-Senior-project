<!-- src/pages/lecture/create_question/CreateQuestion.vue -->
<script setup lang="ts">
import { useQuestionStore } from "@/stores/questionStore";
import axios from "axios";
import { useRouter } from "vue-router";

const { question, reset } = useQuestionStore();
const router = useRouter();

const submitQuestion = async () => {
  try {
    const response = await axios.post("/questions", question);
    console.log("Question posted successfully:", response.data);
    reset();                  // clear form after success
    router.push("/view-question-list");
  } catch (error: any) {
    console.error("Error posting question:", error.response?.data || error.message);
  }
};
</script>

<template>
  <div class="container">
    <h2>Create Question</h2>
    <form @submit.prevent="submitQuestion">
      <div class="input-group">
        <label>Name:</label>
        <input v-model="question.questionName" required />
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
        <router-link to="/test-case">Configure Test Cases</router-link>
      </div>

      <button type="submit">Submit Question</button>
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
  margin-top: 2rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
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
  width: 100%;
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
  width: 100%;
  height: 100px; /* Set fixed height */
  resize: none; /* Prevent resizing */
}
</style>
