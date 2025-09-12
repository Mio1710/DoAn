<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import useGetAllStudentTopics from '~/composables/super-teachers/use-get-all-student-topic'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
const isCreate = ref(false)
const semester = ref('')
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên sinh viên', key: 'ten' },
  { title: 'Lớp', key: 'lop', width: '15%', minWidth: 150 },
  { title: 'Nhóm', key: 'studentTopic[0].group_id', width: '5%', minWidth: 50, align: 'center' },
  { title: 'Giảng viên hướng dẫn', key: 'gv', width: '20%', minWidth: 200 },
  { title: 'Đề tài', key: 'detai', width: '30%', minWidth: 300 },
  { title: '', key: 'action', width: 30 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
}))

const { $api, $toast } = useNuxtApp()

const queryClient = useQueryClient()
const loading = ref(false)

const lockGroup = () => {
  loading.value = true
  $api.superTeacher
    .lockStudentGroup()
    .then(() => {
      queryClient.invalidateQueries('all-student-topic')
      $toast.success('Đã khóa nhóm thành công')
    })
    .finally(() => {
      loading.value = false
    })
}

const { items, isLoading, refetch } = useGetAllStudentTopics(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Quản lý sinh viên khóa luận</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex">
        <v-btn color="success" :loading="loading" size="small" @click="lockGroup">
          <v-icon class="mr-2">mdi-lock</v-icon>
          <span>Khóa nhóm</span>
        </v-btn>
        <v-spacer />
        <v-btn icon size="x-small" variant="text" @click="refetch()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div class="mt-2">
        <v-data-table :headers="headers" hide-default-footer :items="items" :loading="isLoading">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.nhom="{ item }">
            <span>{{ item.studentTopic[0]?.group_id }}</span>
          </template>
          <template #item.ten="{ item }">
            <span>{{ item.hodem + ' ' + item.ten }}</span>
          </template>
          <template #item.detai="{ item }">
            <span>{{ item?.studentTopic[0]?.topic?.ten }}</span>
          </template>
          <template #item.gv="{ item }">
            <span>
              {{ item?.studentTopic[0]?.topic?.teacher.hodem }} {{ item?.studentTopic[0]?.topic?.teacher.ten }}
            </span>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
