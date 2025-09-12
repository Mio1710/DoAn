<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="text-center justify-center d-flex flex-column flex-grow-1 h-full">
        <h1 class="text-h3 mb-4">Truy cập không hợp lệ</h1>
        <div><v-btn color="success" @click="$router.go(-1)">Quay lại trang chủ</v-btn></div>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
