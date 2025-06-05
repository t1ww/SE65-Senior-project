<script setup lang="ts">
import { onMounted } from 'vue'
import { logout } from '@/utils'

onMounted(() => {
  logout()
})
</script>
