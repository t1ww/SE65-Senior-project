<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { getUserData } from "@/store/auth";

// Define the Question interface
interface Question {
    id: number;
    questionName: string;
    questionDescription: string;
    hint: string;
    startingCode: string;
    correctAnswerCode: string;
    testCases: { input: string; output: string }[];
    estimatedRuntime: string;
    timeComplexity: string;
}

// Vue Router
const route = useRoute();
const router = useRouter();

// Reactive variables
const question = ref<Question | null>(null);
const loading = ref(false);
const error = ref("");
const code = ref(""); // User's code input
const submitting = ref(false); // Submission state

const submissionMessage = ref(""); // Success message
const submissionError = ref(""); // Error message

// Fetch question from API
const fetchQuestion = async () => {
    loading.value = true;
    error.value = "";
    try {
        const response = await axios.get(`http://localhost:5000/questions/${route.params.id}`);
        question.value = response.data;
        code.value = response.data.startingCode; // Pre-fill code editor
    } catch (err) {
        error.value = "Failed to fetch question.";
    } finally {
        loading.value = false;
    }
};

// Submit answer to API
const submitAnswer = async () => {
    const userData = getUserData();
    
    // Ensure userData is not null before accessing token
    if (!userData || !userData.token) {
        submissionError.value = "You must be logged in to submit an answer.";
        return;
    }

    const token = userData.token; // Get token from localStorage

    submitting.value = true;
    submissionError.value = "";
    submissionMessage.value = "";

    console.log("Token being sent:", token); // Debugging token presence

    try {
        await axios.post(
            "http://localhost:5000/answers",
            {
                question_id: question.value?.id,
                answerCode: code.value, // Fix reference to user input
                result: null, // Backend will process this
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token
                },
            }
        );

        submissionMessage.value = "Answer submitted successfully!";
    } catch (err) {
        submissionError.value = "Failed to submit answer.";
    } finally {
        submitting.value = false;
    }
};


// Fetch the question when component is mounted
onMounted(fetchQuestion);
</script>

<template>
    <div class="question-container">
        <button @click="router.push('/view-question-list')">← Back to List</button>

        <div v-if="loading" class="loading">Loading question...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="question" class="question-content">
            <div class="question-card">
                <h2>{{ question.questionName }}</h2>
                <p>{{ question.questionDescription }}</p>
                <p class="hint">Hint: {{ question.hint }}</p>
            </div>

            <div class="code-editor">
                <label for="code">Your Code:</label>
                <textarea id="code" v-model="code" rows="10"></textarea>
            </div>

            <button class="submit-btn" :disabled="submitting" @click="submitAnswer">
                {{ submitting ? "Submitting..." : "Submit Answer" }}
            </button>

            <div v-if="submissionMessage" class="success">{{ submissionMessage }}</div>
            <div v-if="submissionError" class="error">{{ submissionError }}</div>
        </div>
    </div>
</template>

<style scoped>
.question-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    text-align: left;
    font-family: Arial, sans-serif;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    transition: background 0.2s ease-in-out;
}

button:hover {
    background: #0056b3;
}

.loading {
    font-size: 16px;
    color: #666;
}

.error {
    color: red;
    font-size: 16px;
    margin-top: 10px;
}

.success {
    color: green;
    font-size: 16px;
    margin-top: 10px;
}

.question-card {
    padding: 15px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.question-card h2 {
    margin: 0 0 10px;
    font-size: 24px;
    color: #222;
}

.question-card p {
    font-size: 16px;
    color: #555;
}

.question-card .hint {
    font-style: italic;
    color: #888;
    margin-top: 10px;
}

.code-editor {
    margin-bottom: 15px;
}

.code-editor label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.code-editor textarea {
    width: 100%;
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
}

.submit-btn {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
</style>
