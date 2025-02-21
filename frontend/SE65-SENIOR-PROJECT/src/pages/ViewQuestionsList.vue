<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import QuestionCard from "@/components/QuestionCard.vue";

const questions = ref<{
  id: number;
  questionName: string,
  questionDescription: string
}[]>([]);
const loading = ref(false);
const error = ref("");
const router = useRouter();

const fetchQuestions = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get("http://localhost:5000/questions");
    questions.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch questions";
  } finally {
    loading.value = false;
  }
};

const goToQuestion = (id: number) => {
  router.push(`/view-question/${id}`);
};

onMounted(fetchQuestions);
</script>

<template>
  <div class="question-list-container">
    <h2>Question List</h2>

    <div v-if="loading">Loading questions...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="questions.length">
      <li v-for="question in questions" :key="question.id" @click="goToQuestion(question.id)">
        <QuestionCard :questionData="question" />
      </li>
    </ul>

    <p v-if="!loading && questions.length === 0">No questions available.</p>
  </div>
</template>

<style scoped>
.question-list-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: background 0.3s;
}

li:hover {
  background-color: #ddd;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
