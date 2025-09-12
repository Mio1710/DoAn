<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import StudentTeacherGroup from '~/components/admin/super/molecules/StudentTeacherGroup.vue'
import useGetAllStudentGroups from '~/composables/super-teachers/use-get-all-student-group'

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Nhóm SV', key: 'groupStudent', width: '10%', minWidth: 50, align: 'center' },
  { title: 'Sinh viên', key: 'sv', width: '25%', minWidth: 200 },
  { title: 'Nhóm GV', key: 'groupTeacher', width: '10%', minWidth: 50, align: 'center' },
  { title: 'Giảng viên', key: 'gv', minWidth: 200 },
  { title: 'Ngày phản biện', key: 'date', width: '15%', minWidth: 150 },
  { title: '', key: 'action', width: '10%', minWidth: 100 },
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

const { items, totalItems, isLoading, refetch, isFetching } = useGetAllStudentGroups(queryBuilder)
</script>

<template>
  <div class="d-flex">
    <v-dialog min-width="400" width="40%">
      <template #activator="{ props: activatorProps }">
        <v-btn color="success" size="small" v-bind="activatorProps" class="mt-2">
          <v-icon>mdi-plus</v-icon>
          <span>Phân giảng viên phản biện</span>
        </v-btn>
      </template>
      <template #default="{ isActive }">
        <student-teacher-group @cancel="isActive.value = false" />
      </template>
    </v-dialog>
    <v-spacer />
    <v-btn color="success" :loading="isFetching" size="small" @click="refetch">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
  <div class="mt-2 h-[calc(100%_-_30px)] overflow-y-hidden">
    <v-data-table
      class="h-full"
      fixed-header
      :headers="headers"
      hide-default-footer
      :items="items"
      :loading="isFetching"
    >
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.gv="{ item }">
        <div v-for="(teacher, index) in item.teacherGroup?.teachers" :key="index">
          {{ teacher.teacher?.maso }} - {{ teacher.teacher?.hodem }} {{ teacher.teacher?.ten }}
        </div>
      </template>
      <template #item.groupStudent="{ item }">
        <v-chip size="small" variant="outlined" color="success">{{ item.id }}</v-chip>
      </template>
      <template #item.sv="{ item }">
        <div v-for="(student, index) in item.studentTopics" :key="index">
          {{ student.student?.maso }} - {{ student.student?.hodem }} {{ student.student?.ten }}
        </div>
      </template>
      <template #item.groupTeacher="{ item }">
        <span>{{ item.teacherGroup?.name }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
