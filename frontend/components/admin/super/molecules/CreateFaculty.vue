<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const form = reactive({
  ten: '',
  ma_khoa: '',
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])
const queryClient = useQueryClient()

const createFaculty = () => {
  $api.faculty.createFaculty(form).then(() => {
    $toast.success('Tạo khoa thành công')
    queryClient.invalidateQueries('faculty-admins')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Tạo khoa" @cancel="emit('cancel')" @submit="createFaculty">
    <app-text-field v-model="form.ten" label="Tên khoa" name="Tên khoa" rules="required" />
    <app-text-field v-model="form.ma_khoa" label="Mã khoa" name="Mã khoa" rules="required" />
  </form-card>
</template>
