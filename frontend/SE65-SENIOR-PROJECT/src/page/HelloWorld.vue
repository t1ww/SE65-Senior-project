<script setup lang="ts">
import Counter from "../components/Counter.vue"
import Footer from "../components/Footer.vue"

defineProps<{ msg: string }>()


</script>

<template>
  <h1>{{ msg }}</h1>

 <Counter>
  
 </Counter>
 <Footer>
  
 </Footer>

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
