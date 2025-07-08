<template>
  <div class="logout-modal">
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div class="modal-buttons">
          <button class="confirm" @click="confirmLogout">Yes, Log out</button>
          <button class="cancel" @click="cancelLogout">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logoutUser } from "@/stores/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showModal = ref(false);

const confirmLogout = () => {
  logoutUser();
  router.push("/login");
};

const cancelLogout = () => {
  router.back();
};

onMounted(() => {
  showModal.value = true;
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px 40px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

button.confirm {
  background-color: #f57c00;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

button.cancel {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

button.confirm:hover {
  background-color: #e06600;
}

button.cancel:hover {
  background-color: #999;
}
</style>
