<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      ten: '',
      description: '',
      requirement: '',
      knowledge: '',
      numberStudent: 4,
    }),
  },
})
const form = reactive({
  ten: props.item.ten,
  description: props.item.description,
  requirement: props.item.requirement,
  knowledge: props.item.knowledge,
  numberStudent: props.item.numberStudent,
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()

const createStudentTopic = () => {
  $api.topic.createTopic(form).then(() => {
    $toast.success('Tạo đề tài thành công')
    queryClient.invalidateQueries('topic')
    emit('success')
    emit('cancel')
  })
}

const preview = () => {
  console.log('Preview')
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Tạo đề tài" @cancel="emit('cancel')" @submit="createStudentTopic">
    <app-text-field v-model="form.ten" label="Tên đề tài" name="Tên đề tài" rules="required" />
    <app-text-field v-model="form.description" label="Mô tả" name="Mô tả" type="textarea" />
    <app-text-field v-model="form.requirement" label="Yêu cầu" name="Yêu cầu" />
    <app-text-field v-model="form.knowledge" label="Kiến thức kỹ năng" name="Kiến thức kỹ năng" />
    <app-text-field v-model="form.numberStudent" label="Số lượng sinh viên" name="Số lượng sinh viên" rules="required" />
  </form-card>
</template>
