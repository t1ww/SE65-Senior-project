<script setup lang="ts">
import { ref } from 'vue';

const testCases = [
  { name: 'Test case 1', score: '100/100' },
  { name: 'Test case 2', score: '50/100' }
];

const questionTitle = 'Student A: Question 1 : TSP';
</script>

<template>
  <div class="review-container">
    <div class="review-box">
      <div class="review-header">
        <strong>{{ questionTitle }}</strong>
      </div>

      <div class="test-cases">
        <div v-for="(tc, i) in testCases" :key="i" class="test-case">
          {{ tc.name }} : {{ tc.score }}
        </div>
      </div>

      <div class="buttons">
        <button class="btn">View Test Input</button>
        <button class="btn">View Test Output</button>
        <button class="btn red">View Answer Code</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.review-box {
  border: 1px solid #000;
  padding: 20px;
  background-color: #fff;
  width: 300px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
}

.review-header {
  border-bottom: 1px solid #000;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
  text-align: center;
}

.test-cases {
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}

.test-case {
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #000;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #f0f0f0;
}

.btn.red {
  background-color: #f4cccc;
  border-color: #d88;
}

.btn.red:hover {
  background-color: #e99;
}
</style>
