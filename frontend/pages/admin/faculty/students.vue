<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
</script>

<template>
  <div>Toàn DS đăng ký</div>
</template>

<style scoped>

</style>
