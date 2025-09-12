<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import useGetFaculties from '~/composables/admin/use-get-faculty'

const props = defineProps({
  faculty: {
    type: Object,
    required: true,
  },
})

const form = reactive({
  hodem: '',
  ten: '',
  maso: '',
  email: '',
  khoa_id: props.faculty.id,
  type: 'teacher',
  ngay_sinh: null
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const createFaculty = () => {
  $api.admin.createSuperTeacher(form).then(() => {
    $toast.success('Tạo cán bộ khoa thành công')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Hủy"
    :title="`Tạo cán bộ ${faculty.ten}`"
    @cancel="emit('cancel')"
    @submit="createFaculty"
  >
    <app-text-field v-model="form.hodem" label="Họ đệm" name="Họ đệm" rules="required" />
    <app-text-field v-model="form.ten" label="Tên" name="Tên" rules="required" />
    <app-text-field v-model="form.email" label="Email" name="Email" rules="required|email" />
    <app-text-field v-model="form.maso" label="Mã số" name="Mã số" rules="required" />
    <app-text-field v-model="form.ngay_sinh" label="Ngày sinh" name="Ngày sinh" rules="required" />
  </form-card>
</template>
