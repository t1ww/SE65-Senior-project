<script setup lang="ts">
defineProps<{
    student: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    }
}>();
</script>

<template>
    <div class="student-card">
        <h3>{{ student.name }}</h3>
        <p><strong>Email:</strong> {{ student.email }}</p>
        <p><strong>Role:</strong> {{ student.role }}</p>
        <p><strong>Joined:</strong> {{ new Date(student.created_at).toLocaleDateString() }}</p>
    </div>
</template>

<style scoped>
.student-card {
    padding: 16px;
    background: #fdfdfd;
    border-left: 5px solid #3b82f6;
    /* Blue accent */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.1s ease, box-shadow 0.2s ease;
    font-family: Arial, sans-serif;
    color: #333;
}

.student-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

h3 {
    margin: 0 0 8px;
    font-size: 18px;
    color: #111;
}

p {
    margin: 4px 0;
    font-size: 14px;
}
</style>
