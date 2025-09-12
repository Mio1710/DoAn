<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const form = ref({
  hodem: '',
  ten: '',
  email: '',
  maso: '',
  ngay_sinh: '',
  roles: [],
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()

const createTeacher = () => {
  $api.admin.createTeacher(form.value).then(() => {
    $toast.success('Thêm mới giảng viên thành công')
    queryClient.invalidateQueries('teacher')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Thêm mới giảng viên" @cancel="emit('cancel')" @submit="createTeacher">
    <app-text-field v-model="form.hodem" label="Họ đệm" name="Họ đệm" rules="required" />
    <app-text-field v-model="form.ten" label="Tên giảng viên" name="Tên giảng viên" rules="required" />
    <app-text-field v-model="form.email" label="Email" name="Email" rules="required|email" />
    <app-text-field v-model="form.maso" label="Mã số" name="Mã số" rules="required" />
    <app-text-field v-model="form.ngay_sinh" label="Ngày sinh" name="Ngày sinh" />
    <div class="d-flex">
      <v-switch color="success" hide-details label="Cán bộ môn" v-model="form.roles" value="super_teacher" />
      <v-spacer />
      <v-switch color="success" hide-details label="Cán bộ khoa" v-model="form.roles" value="admin" />
    </div>
  </form-card>
</template>
