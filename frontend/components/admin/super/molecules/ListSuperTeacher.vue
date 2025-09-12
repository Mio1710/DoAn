<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import CreateSuperTeacher from '~/components/admin/super/molecules/CreateSuperTeacher.vue'
import {useQueryClient} from "vue-query";

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
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])

const queryClient = useQueryClient()

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 30,
  },
  { title: 'Tên giảng viên', key: 'ten', minWidth: 150 },
  { title: 'Mã số', key: 'maso', width: '10%', minWidth: 100 },
  { title: 'Hành động', key: 'action', width: '30%', minWidth: 350, align: 'center' },
]
const deleteFacultyAdmin = (item) => {
  $api.superAdmin.deleteSuperTeacher(item.id).then(() => {
    $toast.success('Xóa cán bộ khoa thành công')
    queryClient.invalidateQueries('faculty-admins')
    emit('cancel')
  })
}

const onCreateNewSuperTeacher = () => {
  queryClient.invalidateQueries('faculty-admins')
  emit('cancel')
}

const resetPassword = (item) => {
  $api.admin.resetPassword(item.id).then(() => {
    $toast.success('Reset mật khẩu thành công')
  })
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Đóng"
    hide-submit
    :title="`Danh sách cán bộ ${faculty.ten}`"
    @cancel="emit('cancel')"
  >
    <v-dialog min-width="400" width="40%">
      <template #activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" class="mb-4" color="success" size="small">Tạo cán bộ khoa</v-btn>
      </template>
      <template #default="{ isActive }">
        <create-super-teacher :faculty="faculty" @cancel="isActive.value = false" @success="onCreateNewSuperTeacher" />
      </template>
    </v-dialog>
    <v-data-table v-if="faculty" :headers="headers" hide-default-footer :items="faculty.teachers">
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.ten="{ item }">
        <span>{{ item.hodem }} {{ item.ten }}</span>
      </template>
      <template #item.action="{ item }">
        <v-btn color="primary" size="small" class="mr-2" @click="resetPassword(item)">
          <v-icon>mdi-refresh</v-icon>
          <span>Reset mật khẩu</span>
        </v-btn>
        <v-btn color="error" size="small" @click="deleteFacultyAdmin(item)">Xóa</v-btn>
      </template>
    </v-data-table>
  </form-card>
</template>
