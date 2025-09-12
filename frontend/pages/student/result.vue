<script setup lang="ts">
import ResultDetail from '~/components/student/result/molecules/MyResultDetail.vue'

definePageMeta({
  layout: 'auth',
})
const { data } = useAuth()
</script>

<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="text-lg font-bold">Xem điểm khóa luận</div>
    <v-card class="pa-2" color="white" variant="flat">
      <result-detail :item="data" />
    </v-card>
  </div>
</template>

<style scoped></style>
