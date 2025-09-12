<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { addDays, format } from 'date-fns'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import ImportTeacher from '~/components/admin/super/molecules/ImportTeacher.vue'
import useGetTeachers from '~/composables/admin/use-get-teachers'
import UpdateTeacher from '~/components/teacher/topic/molecules/UpdateTeacher.vue'
import CreateTeacher from '~/components/teacher/topic/molecules/CreateTeacher.vue'
import DeleteTeacherConfirmDialog from '~/components/admin/teacher/molecules/DeleteTeacherConfirmDialog.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})

const filters = ref({
  q: '',
})
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
  { title: 'Ngày sinh', key: 'ngay_sinh', minWidth: 100 },
  { title: 'Cán bộ môn', key: 'is_super_teacher', width: '15%', minWidth: 100, align: 'center' },
  { title: 'Cán bộ khoa', key: 'is_admin', width: '15%', minWidth: 100, align: 'center' },
  { title: '', key: 'action', width: 100 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: filters.value,
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
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Quản lý giảng viên</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog min-width="600" width="60%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Import</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <import-teacher @cancel="isActive.value = false" @success="refetch" />
          </template>
        </v-dialog>
        <app-text-field
          v-model="filters.q"
          class="h-[24px] w-[250px] ml-2"
          clearable
          density="compact"
          placeholder="Tên/Mã số giảng viên"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
        />
        <v-spacer />
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm giảng viên</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-teacher @cancel="isActive.value = false" @success="refetch" />
          </template>
        </v-dialog>
        <v-btn icon="mdi-refresh" variant="plain" @click="refetch" />
      </div>
      <div class="mt-2 h-[calc(100%_-_45px)] overflow-y-hidden">
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
            <v-switch
              color="success"
              hide-details
              :model-value="item.roles"
              value="super_teacher"
              @click="handleActive(item, 'super_teacher')"
            />
          </template>
          <template #item.is_admin="{ item }">
            <v-switch
              color="success"
              hide-details
              :model-value="item.roles"
              value="admin"
              @click="handleActive(item, 'admin')"
            />
          </template>
          <template #item.ten="{ item }">
            <span>{{ item.hodem + ' ' + item.ten }}</span>
          </template>
          <template #item.ngay_sinh="{ item }">
            <span v-if="item.ngay_sinh">{{ format(new Date(item?.ngay_sinh), 'dd/MM/yyyy') }}</span>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="success" icon size="small" variant="text">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-teacher :teacher="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
            <delete-teacher-confirm-dialog :teacher="item" @success="refetch" />
          </template>
        </v-data-table-virtual>
      </div>
    </v-card>
  </div>
</template>

<style></style>
