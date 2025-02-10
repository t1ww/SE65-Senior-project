<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const name = ref('');
const detail = ref('');
const goal = ref('');
const example = ref('');
const testCase = ref('');

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
                <input id="name" v-model="name" type="text" required />
            </div>

            <div class="input-group">
                <label for="detail">Detail:</label>
                <input id="detail" v-model="detail" required />
            </div>

            <div class="input-group">
                <label for="goal">Goal:</label>
                <input id="goal" v-model="goal" required />
            </div>

            <div class="input-group">
                <label for="example">Example:</label>
                <input id="example" v-model="example" required />
            </div>

            <div class="input-group">
                <label for="testCase">Test Case:</label>
                <input id="testCase" v-model="testCase" required />
                <router-link to="/view-question">View Test Case</router-link>
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
</style>