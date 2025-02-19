<script setup lang="ts">
import { ref } from 'vue';


const name = ref('');
const description = ref('');
const hint = ref('');
const startingCode = ref('');
const correctCode = ref('');
const estimatedRuntime = ref('');
const timeComplexity = ref('');

const submitQuestion = () => {
    console.log({ name: name.value, detail: detail.value, goal: goal.value, example: example.value, testCase: testCase.value });
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
                <label for="startingCode">Starting Code:</label>
                <textarea v-model="startingCode" required />
            </div>

            <div class="input-group">
                <label for="correctCode">Correct Answer Code:</label>
                <textarea v-model="correctCode" required />
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
button {
    background-color: #007bff;
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