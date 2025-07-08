<script setup lang="ts">
import { ref } from 'vue';

const question = ref({
  name: 'Q1',
  description: 'Find the biggest number',
  hint: '2 5 8 9 = 9',
  exampleInput: '2 5 8 7 4 9 6 2 4 7 7 4 8 5 1 3 10 5',
  exampleOutput: '10'
});
</script>

<template>
  <div class="review-container">
    <h2>Question: {{ question.name }}</h2>
    <div class="review-box">
      <p><strong>Name:</strong> {{ question.name }}</p>
      <p><strong>Description:</strong> {{ question.description }}</p>
      <p><strong>Hint:</strong> {{ question.hint }}</p>
      <p><strong>Example Input:</strong> {{ question.exampleInput }}</p>
      <p><strong>Example Output:</strong> {{ question.exampleOutput }}</p>

      <div class="links">
        <router-link to="/view-test" class="link">View Test Case</router-link>
        <router-link to="/edit-question" class="link with-icon">
          <span class="icon">📝</span> Edit Question
        </router-link>

      </div>
    </div>
  </div>
</template>

<style scoped>
.review-container {
  text-align: center;
  padding: 50px;
}

h2 {
  color: #f57c00;
  margin-bottom: 20px;
}

.review-box {
  border: 1px solid #f57c00;
  border-radius: 12px;
  padding: 25px;
  background-color: #fff;
  display: inline-block;
  min-width: 350px;
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
