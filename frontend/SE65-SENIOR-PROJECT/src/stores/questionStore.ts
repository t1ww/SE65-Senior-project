import type { Question } from "@/types/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("question", () => {
    const question = ref(<Question>{
        id: 0,
        questionName: "",
        questionDescription: "",
        hint: "",
        exampleInput: "",
        exampleOutput: "",
        startingCode: "",
        correctAnswerCode: "",
        testCases: [],
        estimatedRuntime: "",
        timeComplexity: "",
    });

    const reset = () => {
        question.value = <Question>{
            id: 0,
            questionName: "",
            questionDescription: "",
            hint: "",
            exampleInput: "",
            exampleOutput: "",
            startingCode: "",
            correctAnswerCode: "",
            testCases: [],
            estimatedRuntime: "",
            timeComplexity: "",
        }
    }

    return { question, reset };
});
