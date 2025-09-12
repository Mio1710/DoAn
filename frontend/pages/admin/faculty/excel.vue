<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
</script>

<template>
  <div>Xuất file excel</div>
</template>

<style scoped>

</style>
