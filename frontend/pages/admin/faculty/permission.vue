<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
</script>

<template>
  <div>Phân quyền</div>
</template>

<style scoped>

</style>
