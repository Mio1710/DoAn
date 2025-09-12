<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import CreateTeacherGroup from '~/components/admin/super/molecules/CreateTeacherGroup.vue'
import useGetListTeacherGroups from '~/composables/super-teachers/use-get-list-teacher-group'
import UpdateTeacherGroup from '~/components/admin/super/molecules/UpdateTeacherGroup.vue'

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Nhóm phản biện', key: 'name', width: '20%', minWidth: 200 },
  { title: 'Giảng viên', key: 'gv', minWidth: 350 },
  { title: '', key: 'action', width: '20%', minWidth: 200 },
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
const deleteGroup = (id) => {
  $api.teacherGroup.deleteTeacherGroup(id).then(() => {
    queryClient.invalidateQueries('teacher-group')
    $toast.success('Xóa nhóm thành công')
  })
}

const { items, totalItems, isLoading, refetch, isFetching } = useGetListTeacherGroups(queryBuilder)
</script>

<template>
  <div class="d-flex">
    <v-dialog min-width="400" width="40%">
      <template #activator="{ props: activatorProps }">
        <v-btn color="success" size="small" v-bind="activatorProps" class="mt-2">
          <v-icon>mdi-plus</v-icon>
          <span>Thêm mới nhóm</span>
        </v-btn>
      </template>
      <template #default="{ isActive }">
        <create-teacher-group @cancel="isActive.value = false" />
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
      :loading="isLoading"
    >
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.gv="{ item }">
        <div v-for="(teacher, index) in item.teachers" :key="index">
          {{ teacher.teacher?.maso }} - {{ teacher.teacher?.hodem }} {{ teacher.teacher?.ten }}
        </div>
      </template>
      <template #item.action="{ item }">
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <span>Chỉnh sửa</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <update-teacher-group :item="item" @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <v-btn class="ml-2" color="error" size="small" @click="deleteGroup(item.id)">Xóa</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
