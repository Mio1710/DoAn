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

const updateFaculty = () => {
  $api.faculty.updateFaculty(form.value.id, form.value).then(() => {
    $toast.success('Cập nhật khoa thành công')
    queryClient.invalidateQueries('faculty-admins')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Tạo đề tài" @cancel="emit('cancel')" @submit="updateFaculty">
    <app-text-field v-model="form.ten" label="Tên khoa" name="Tên khoa" rules="required" />
    <app-text-field v-model="form.ma_khoa" label="Mã khoa" name="Mã khoa" rules="required" />
  </form-card>
</template>
