<script setup lang="ts">
import { logoutUser } from "@/store/auth";
import { onMounted } from "vue";

onMounted(() => {
  logoutUser();
});
</script>