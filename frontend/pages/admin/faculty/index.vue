<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
</script>

<template>
  <div>Bảng điều khiển</div>
</template>

<style scoped>

</style>
