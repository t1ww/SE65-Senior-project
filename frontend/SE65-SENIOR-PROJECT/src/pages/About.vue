<script setup lang="ts">
import type { TeamMember } from "@/types/types";
import { ref } from "vue";

const teamMembers = ref<TeamMember[]>([
  {
    name: "Karanthaphong Areerak",
    role: "Frontend Developer",
    description: "Some text that describes me lorem ipsum ipsum lorem.",
    email: "ocpe278@gmail.com",
    image: "",
  },
  {
    name: "Krittayot Khueanchan",
    role: "Art Director",
    description: "Some text that describes me lorem ipsum ipsum lorem.",
    email: "partyzero00789@gmail.com",
    image: "",
  },
  {
    name: "Narongchai Rongthong",
    role: "Fullstack Developer",
    description: "Some text that describes me lorem ipsum ipsum lorem.",
    email: "nongtews@gmail.com",
    image: "",
  },
  {
    name: "Phiriya Promkaewma",
    role: "Frontend Developer",
    description: "Some text that describes me lorem ipsum ipsum lorem.",
    email: "rainy2snowy.3051@gmail.com",
    image: "",
  },
]);
</script>

<template>
  <header>
    <h1>This is the practice program for programming contest</h1>
  </header>

  <hr id="Line" />
  <h3>This program is designed for coding practice before contests.</h3>
  <h3>It simulates real competitive programming scenarios.</h3>

  <h2 class="text-center">Our Team</h2>
  <div class="container">
    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="(member, _index) in teamMembers"
        :key="member.name"
      >
        <div class="card text-center">
          <img :src="member.image" :alt="member.name" class="card-img-top" />
          <div class="card-body">
            <h2>{{ member.name }}</h2>
            <p class="title">{{ member.role }}</p>
            <p>{{ member.description }}</p>
            <p>{{ member.email }}</p>
            <button class="btn btn-dark">Contact</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  background-color: #66666638;
  padding: 30px;
  text-align: center;
  font-size: 17px;
  color: white;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col-md-6 {
  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
}

.card img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 15px;
}

.btn {
  width: 100%;
}
</style>
