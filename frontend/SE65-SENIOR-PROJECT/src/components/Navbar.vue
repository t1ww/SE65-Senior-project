<script setup lang="ts">
  import router from "@/router";
  const filteredRoutes = router.getRoutes().filter(route => route.path !== '/view-question');
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Chiang_mai_university_logo.png/225px-Chiang_mai_university_logo.png" class="logo" to="/view-question">
    </router-link>
    <ul class="nav-links">
      <li v-for="item in filteredRoutes" :key="item.path">
        <router-link :to="item.path">
          <div :class="{ 'green-text': item.path === $route.path }">
            {{ item.name }}
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.green-text {
  color: #42b883;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  background: #333;
  padding: 1rem 2rem;
  color: white;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #42b883;
}
</style>
