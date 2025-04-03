<script setup lang="ts">
import { ref } from 'vue';

const question = {
  name: 'Q1',
  description: 'Find the biggest number',
  hint: '2 5 8 9 = 9',
  input: '2 5 8 7 4 9 6 2 4 7 7 4 8 5 1 3 10 5',
  output: '10'
};

const code = ref('');
</script>

<template>
  <div class="answer-page container-fluid d-flex align-items-center justify-content-center min-vh-100">
    <div class="card p-4 rounded shadow" style="max-width: 600px; width: 100%;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <button class="btn btn-link">
          <i class="bi bi-arrow-left-circle" style="font-size: 1.5rem;"></i>
        </button>
        <h4 class="text-center w-100 text-purple">Question: {{ question.name }}</h4>
        <i class="bi bi-person-circle" style="font-size: 1.5rem;"></i>
      </div>

      <div class="mb-3">
        <p><strong>Name:</strong> {{ question.name }}</p>
        <p><strong>Description:</strong> {{ question.description }}</p>
        <p><strong>Hint:</strong> {{ question.hint }}</p>
        <p><strong>Input:</strong> {{ question.input }}</p>
        <p><strong>Output:</strong> {{ question.output }}</p>
      </div>

      <div class="Area">
        <textarea
          v-model="code"
          class="form-control bg-light-purple text-dark"
          placeholder="Upload code here or write it..."
          rows="8"
        ></textarea>
      </div>

      <button class="btn btn-purple w-100">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.mb-3{
    text-align: left;
}
.text-purple {
  color: #7b2cbf;
}

.btn-purple {
  background-color: #7b2cbf;
  color: white;
  font-weight: bold;
  border: none;
}

.btn-purple:hover {
  background-color: #5a189a;
}

.bg-light-purple {
  background-color: #e0bbf8;
}

textarea {
  width: 100%;
}
</style>
