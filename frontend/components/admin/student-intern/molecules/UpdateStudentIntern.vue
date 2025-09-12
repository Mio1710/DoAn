<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  studentIntern: {
    type: Object,
    required: true,
    hodem: '',
    ten: '',
    email: '',
    maso: '',
    lop: '',
    phone: '',
  },
})

const form = ref({ ...props.studentIntern })
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()

const createStudentIntern = () => {
  $api.admin.updateStudentIntern(form.value.id, form.value).then(() => {
    $toast.success('Cập nhật sinh viên thực tập thành công')
    queryClient.invalidateQueries('student-intern')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Hủy"
    title="Cập nhật sinh viên thực tập"
    @cancel="emit('cancel')"
    @submit="createStudentIntern"
  >
    <app-text-field v-model="form.hodem" label="Họ đệm" name="Họ đệm" rules="required" />
    <app-text-field v-model="form.ten" label="Tên sinh viên" name="Tên sinh viên" rules="required" />
    <app-text-field v-model="form.maso" label="Mã số" name="Mã số" rules="required" />
    <app-text-field v-model="form.email" label="Email" name="Email" rules="required|email" />
    <app-text-field v-model="form.lop" label="Lớp" name="Lớp" rules="required" />
    <app-text-field v-model="form.phone" label="Số điện thoại" name="Số điện thoại" />
  </form-card>
</template>
