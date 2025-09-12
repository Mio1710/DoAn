<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
})

const form = ref({ ...props.topic })

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])
const queryClient = useQueryClient()

const importStudentTopic = () => {
  if (form.value.status !== 'approved') {
    form.value.status = 'pending'
  }
  $api.topic.updateTopic(form.value.id, form.value).then(() => {
    $toast.success('Tạo đề tài thành công')
    queryClient.invalidateQueries('topic')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Cập nhật đề tài" @cancel="emit('cancel')" @submit="importStudentTopic">
    <app-text-field v-model="form.ten" label="Tên đề tài" name="Tên đề tài" rules="required" />
    <app-text-field v-model="form.description" label="Mô tả" name="Mô tả" type="textarea" />
    <app-text-field v-model="form.requirement" label="Yêu cầu" name="Yêu cầu" />
    <app-text-field v-model="form.knowledge" label="Kiến thức kỹ năng" name="Kiến thức kỹ năng" />
  </form-card>
</template>
