<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  teacher: {
    type: Object,
    required: true,
  },
})

const form = ref({
  ...props.teacher,
  ngay_sinh: props.teacher.ngay_sinh ? format(new Date(props?.teacher.ngay_sinh), 'dd/MM/yyyy') : null,
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])
const queryClient = useQueryClient()

const updateTeacher = () => {
  $api.admin.updateTeacher(form.value.id, form.value).then(() => {
    $toast.success('Cập nhật giảng viên thành công')
    queryClient.invalidateQueries('teacher')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Cập nhật giảng viên" @cancel="emit('cancel')" @submit="updateTeacher">
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
