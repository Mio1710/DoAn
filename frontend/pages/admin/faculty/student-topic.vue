<script setup lang="ts">
import { format } from 'date-fns'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import ImportStudentTopic from '~/components/admin/student-topic/molecules/ImportStudentTopic.vue'
import CreateStudentTopic from '~/components/admin/student-topic/molecules/CreateStudentTopic.vue'
import DeleteTeacherConfirmDialog from '~/components/admin/teacher/molecules/DeleteTeacherConfirmDialog.vue'
import UpdateStudentTopic from '~/components/admin/student-topic/molecules/UpdateStudentTopic.vue'
import DeleteStudentTopicConfirmDialog from '~/components/admin/student-topic/molecules/DeleteStudentTopicConfirmDialog.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên sinh viên', key: 'ten' },
  { title: 'Mã số', key: 'maso' },
  { title: 'Email', key: 'email' },
  { title: 'Lớp', key: 'lop', width: '15%', minWidth: 150 },
  { title: 'Nhóm', key: 'nhom', width: '5%', minWidth: 50 },
  { title: 'Giảng viên hướng dẫn', key: 'gv', width: '20%', minWidth: 200 },
  { title: '', key: 'action', width: 100 },
]

const filters = ref({
  q: '',
})
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: filters.value,
}))

const { $api, $toast } = useNuxtApp()

const { items, totalItems, isLoading, refetch } = useGetStudentTopic(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Quản lý sinh viên khóa luận</div>
    <v-card class="px-3 py-2 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog min-width="600" width="60%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Import</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <import-student-topic @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <app-text-field
          v-model="filters.q"
          class="h-[24px] w-[250px] ml-2"
          clearable
          density="compact"
          placeholder="Tên/Mã số sinh viên"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
        />
        <v-spacer />
        <v-btn
          class="mr-2"
          :disabled="serverOptions.page <= 1"
          icon="mdi-chevron-left"
          size="x-small"
          variant="outlined"
          @click="serverOptions.page--"
        />
        <v-btn
          class="mr-2"
          :disabled="items.length < 100"
          icon="mdi-chevron-right"
          size="x-small"
          variant="outlined"
          @click="serverOptions.page++"
        />
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm sinh viên</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-student-topic @cancel="isActive.value = false" @success="refetch" />
          </template>
        </v-dialog>
        <v-btn icon size="x-small" variant="text" @click="refetch()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div class="mt-2 h-[calc(100%_-_45px)]">
        <v-data-table
          class="h-full"
          fixed-header
          :headers="headers"
          hide-default-footer
          :items="items"
          :items-per-page="1000"
          :loading="isLoading"
        >
          <template #item.index="{ index }">
            <span>{{ (serverOptions.page - 1) * 100 + index + 1 }}</span>
          </template>
          <template #item.nhom="{ item }">
            <span>{{ item.studentTopic[0]?.group_id }}</span>
          </template>
          <template #item.gv="{ item }">
            <span>{{ item.studentTopic[0]?.topic?.teacher.hodem }} {{ item.studentTopic[0]?.topic?.teacher.ten }}</span>
          </template>
          <template #item.ten="{ item }">
            <span>{{ item.hodem + ' ' + item.ten }}</span>
          </template>
          <template #item.ngay_sinh="{ item }">
            <span>{{ format(new Date(item.ngay_sinh), 'dd/MM/yyyy') }}</span>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="success" icon size="small" variant="text">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-student-topic :student-topic="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
            <delete-student-topic-confirm-dialog :student-topic="item" @success="refetch" />
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
