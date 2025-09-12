<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'

const props = defineProps({
  partner: {
    type: Array,
    default: () => [],
  },
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()

const cancelTopic = () => {
  $api.studentTopic.cancelTopic().then(() => {
    $toast.success('Hủy đề tài thành công')
    queryClient.invalidateQueries('topic')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card
    can-cancel
    submit-text="Xác nhận"
    title="Xác nhận hủy đề tài"
    @cancel="emit('cancel')"
    @submit="cancelTopic"
  >
    <div class="font-bold text-center text-warning">Nếu hủy đề tài bạn sẽ đồng thời hủy nhóm?</div>
    <div class="text-center font-italic">Hành động không thể hoàn tác!</div>
  </form-card>
</template>
