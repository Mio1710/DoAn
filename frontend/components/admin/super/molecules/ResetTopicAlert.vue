<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])
const queryClient = useQueryClient()
const loading = ref(false)

const resetTopic = () => {
  loading.value = true
  $api.topic
    .resetTopic()
    .then(() => {
      $toast.success('Reset đề tài thành công')
      queryClient.invalidateQueries('topic')
      emit('cancel')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Hủy"
    :loading="loading"
    title="Reset đề tài"
    @cancel="emit('cancel')"
    @submit="resetTopic"
  >
    <div class="text-warning text-center text-xl font-weight-bold">
      <div>Toàn bộ đề tài cần duyệt lại!</div>
      <div>Bạn chắc chắn? Hành động không thể hoàn tác.</div>
    </div>
  </form-card>
</template>
