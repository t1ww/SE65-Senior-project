<script setup lang="ts">
const testCases = [
  { input: '2 3 5', expectedOutput: '10' },
  { input: '1 1 1', expectedOutput: '3' }
];
</script>

<template>
  <div class="page-container">
    <div class="back-button">
      <router-link to="/review">⬅ Back</router-link>
    </div>

    <h2>View Test Case</h2>

    <div class="case-box" v-for="(tc, index) in testCases" :key="index">
      <p><strong>Test Case {{ index + 1 }}</strong></p>
      <p><strong>Input:</strong> {{ tc.input }}</p>
      <p><strong>Expected Output:</strong> {{ tc.expectedOutput }}</p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  text-align: center;
  padding: 50px;
}

.back-button {
  text-align: left;
  margin-bottom: 20px;
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

h2 {
  color: #f57c00;
  margin-bottom: 30px;
}

.case-box {
  border: 1px solid #f57c00;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  text-align: left;
  background-color: #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 300px;
}
</style>
