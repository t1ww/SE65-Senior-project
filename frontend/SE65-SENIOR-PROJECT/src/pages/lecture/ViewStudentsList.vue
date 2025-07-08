<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import StudentCard from "@/components/StudentCard.vue";

const students = ref<
  {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
  }[]
>([]);
const loading = ref(false);
const error = ref("");

const fetchStudents = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get("/users");
    students.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch users";
  } finally {
    loading.value = false;
  }
};
onMounted(fetchStudents);
</script>

<template>
  <div class="student-list-container">
    <h2>User List</h2>

    <div v-if="loading">Loading users...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="students.length">
      <li v-for="student in students" :key="student.id">
        <StudentCard :student="student" />
      </li>
    </ul>

    <p v-if="!loading && students.length === 0">No users available.</p>
  </div>
</template>

<style scoped>
.student-list-container {
  max-width: 600px;
  margin: auto;
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  cursor: default;
  background-color: #f9f9f9;
  transition: background 0.3s;
}

li:hover {
  background-color: #ddd;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
