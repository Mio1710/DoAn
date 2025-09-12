<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import UpdateTeacher from '~/components/teacher/topic/molecules/UpdateTeacher.vue'
import useGetTeachers from '~/composables/admin/use-get-teachers'

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Giảng viên', key: 'ten', width: '20%', minWidth: 200 },
  { title: 'Mã số', key: 'maso', minWidth: 200 },
  { title: 'Cán bộ môn', key: 'is_super_teacher', width: '15%', minWidth: 100, align: 'center' },
  { title: 'Cán bộ khoa', key: 'is_admin', width: '15%', minWidth: 100, align: 'center' },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
}))

const { $api, $toast } = useNuxtApp()

const queryClient = useQueryClient()
const handleActive = (item, role) => {
  try {
    const roles = item.roles?.includes(role) ? item.roles.filter((r) => r !== role) : [...item.roles, role]
    $api.admin.activeTeacher(item.id, roles).then(() => {
      queryClient.invalidateQueries('teacher')
      $toast.success('Đã cập nhật quyền thành công')
    })
  } catch (error) {
    console.log(error)
  }
}

const { items, totalItems, isLoading, refetch } = useGetTeachers(queryBuilder)
</script>

<template>
  <div class="mt-2 h-[calc(100vh_-_160px)] overflow-y-hidden">
    <v-data-table-virtual
      class="h-full"
      fixed-header
      :headers="headers"
      hide-default-footer
      :items="items"
      :loading="isLoading"
    >
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.is_super_teacher="{ item }">
        <v-switch color="success" hide-details :model-value="item.roles" readonly value="super_teacher" />
      </template>
      <template #item.is_admin="{ item }">
        <v-switch
          color="success"
          hide-details
          readonly
          :model-value="item.roles"
          value="admin"
        />
      </template>
      <template #item.ten="{ item }">
        <span>{{ item.hodem + ' ' + item.ten }}</span>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<style scoped></style>
