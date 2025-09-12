<script setup lang="ts">
import ResultDetail from "~/components/student/result/molecules/MyResultDetail.vue";

definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="text-lg font-bold">Xem lịch sử làm khóa luận</div>
    <v-card class="pa-2" color="white" variant="flat">
      <ResultDetail />
    </v-card>
  </div>
</template>

<style scoped></style>
