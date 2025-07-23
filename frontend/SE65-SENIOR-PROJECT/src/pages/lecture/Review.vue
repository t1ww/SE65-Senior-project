<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Question {
  id: number;
  name: string;
  description: string;
  hint: string;
  exampleInput: string;
  exampleOutput: string;
}
const questions = ref<Question[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:10601/questions');
    const data = await res.json();
    questions.value = data;
  } catch (err) {
    console.error('Failed to fetch questions:', err);
  }
});
</script>

<template>
  <div class="review-container">
    <h2>Question List</h2>
    <div v-for="question in questions" :key="question.id" class="review-box">
      <p><strong>Name:</strong> {{ question.name }}</p>
      <p><strong>Description:</strong> {{ question.description }}</p>
      <p><strong>Example Input:</strong> {{ question.exampleInput }}</p>
      <p><strong>Example Output:</strong> {{ question.exampleOutput }}</p>

      <div class="links">
        <router-link :to="`/view-test/${question.id}`" class="link">View Test Case</router-link>
        <router-link :to="`/edit-question/${question.id}`" class="link with-icon">
          <span class="icon">📝</span> Edit Question
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #f57c00;
  margin-bottom: 20px;
}

.review-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  gap: 20px;
}

.review-box {
  border: 1px solid #f57c00;
  border-radius: 12px;
  padding: 25px;
  background-color: #fff;
  width: 100%;
  max-width: 600px;
  text-align: left;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
}

.links {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.link {
  color: #f57c00;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
}

.link.with-icon {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  font-size: 16px;
}
</style>
