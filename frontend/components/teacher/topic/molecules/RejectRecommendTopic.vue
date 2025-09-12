<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const form = reactive({
  status: 'rejected',
  reject_reason: '',
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()

const rejectRecommendTopic = () => {
  $api.teacher.updateRecommendTopic(props.item.id, form).then(() => {
    $toast.success('Đã từ chối đề tài')
    queryClient.invalidateQueries('student-recommend-topic')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Từ chối đề tài" @cancel="emit('cancel')" @submit="rejectRecommendTopic">
    <app-text-field
      v-model="form.reject_reason"
      label="Lý do từ chối đề tài"
      name="Lý do từ chối đề tài"
      rules="required"
      type="textarea"
    />
  </form-card>
</template>
