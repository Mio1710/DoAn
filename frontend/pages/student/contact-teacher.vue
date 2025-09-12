<script setup lang="ts">

definePageMeta({
  layout: 'auth',
})

</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Liên hệ giảng viên</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div>
        <span class="font-weight-bold">Giảng viên hướng dẫn:</span>
      </div>
      <div>
        <span class="font-weight-bold">Giảng viên phản biện:</span>
      </div>
      <div>
        <span class="font-weight-bold">Giảng viên hội đồng/poster:</span>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
