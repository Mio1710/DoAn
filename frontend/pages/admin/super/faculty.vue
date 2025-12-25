<script setup lang="ts">
import CreateFaculty from '~/components/admin/super/molecules/CreateFaculty.vue'
import DeleteFacultyConfirmDialog from '~/components/admin/super/molecules/DeleteFacultyConfirmDialog.vue'
import ListSuperTeacher from '~/components/admin/super/molecules/ListSuperTeacher.vue'
import UpdateFaculty from '~/components/admin/super/molecules/UpdateFaculty.vue'
import useGetFacultyWithAdmin from '~/composables/admin/use-get-faculty-with-admin'
import type { Faculty } from '~/types/faculty'
import type { TableHeader } from '~/types/table'

definePageMeta({
  layout: 'auth',
  middleware: ['is-super-admin'],
})

const headers: TableHeader<Faculty>[] = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 30,
  },
  { title: 'Tên khoa', key: 'name', minWidth: 250 },
  { title: 'Mã khoa', key: 'code', width: '30%', minWidth: 350 },
  { title: 'Cán bộ khoa', key: 'super_teachers', width: '30%', minWidth: 300, align: 'center' },
  { title: '', key: 'action', width: '10%', minWidth: 100, sortable: false, align: 'center' },
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

const { items, refetch } = useGetFacultyWithAdmin(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Quản lý khoa</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div :class="`d-flex items-center ${items?.length == 0 && 'justify-center h-screen'}`">
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm mới Khoa</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-faculty @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <template v-if="items?.length > 0">
          <v-spacer />
          <v-btn icon size="x-small" variant="text" @click="refetch()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
      </div>
      <div class="mt-2">
        <v-data-table :headers="headers" hide-default-footer :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.super_teachers="{ item }">
            <v-dialog min-width="600" width="60%">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="success" size="small">Cán bộ khoa</v-btn>
              </template>
              <template #default="{ isActive }">
                <list-super-teacher :faculty="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="success" icon size="small" variant="text">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-faculty :topic="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
            <delete-faculty-confirm-dialog :faculty="item" @success="refetch" />
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
