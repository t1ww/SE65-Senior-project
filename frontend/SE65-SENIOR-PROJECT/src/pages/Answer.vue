<script setup lang="ts">
import { ref } from "vue";

const question = {
  name: "Q1",
  description: "Find the biggest number",
  hint: "2 5 8 9 = 9",
  input: "2 5 8 7 4 9 6 2 4 7 7 4 8 5 1 3 10 5",
  output: "10",
};

const code = ref("");

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    code.value = e.target?.result as string;
  };
  reader.readAsText(file);
};
</script>

<template>
  <div class="answer-page">
    <h2 class="heading">Question: {{ question.name }}</h2>

    <div class="question-box">
      <p><strong>Name:</strong> {{ question.name }}</p>
      <p><strong>Description:</strong> {{ question.description }}</p>
      <p><strong>Hint:</strong> {{ question.hint }}</p>
      <p><strong>Example Input :</strong> {{ question.input }}</p>
      <p><strong>Example Output :</strong> {{ question.output }}</p>

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

    <button class="submit-button">Submit</button>
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
</style>
