<script setup lang="ts">
import { ref } from 'vue';


const name = ref('');
const description = ref('');
const hint = ref('');
const estimatedRuntime = ref('');
const timeComplexity = ref('');

const submitQuestion = () => {
    console.log({ name: name.value, description: description.value, hint: hint.value, estimatedRuntime: estimatedRuntime.value, timeComplexity: timeComplexity.value });
};
</script>

<template>
    <div class="container">
        <h2>Create Question</h2>
        <form @submit.prevent="submitQuestion">
            <div class="input-group">
                <label for="name">Name:</label>
                <input v-model="name" type="text" required />
            </div>

            <div class="input-group">
                <label for="description">Dscription:</label>
                <input v-model="description" required />
            </div>

            <div class="input-group">
                <label for="hint">Hint:</label>
                <input v-model="hint" required />
            </div>

            <div class="input-group">
                <label for="estimatedRuntime">estimated Runtime:</label>
                <input v-model="estimatedRuntime" required />
            </div>

            <div class="input-group">
                <label for="timeComplexity">Time Complexity:</label>
                <input v-model="timeComplexity" required />
            </div>

            <div class="input-group">
                <router-link to="/test-case">View Test Case</router-link>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
h2{
    color: #ff9233;
}
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
}
label {
    font-weight: bold;
}

input, textarea {
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
    resize: none;  /* Prevent resizing */
}


</style>