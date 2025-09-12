<script setup lang="ts">
import useGetListLOs from '~/composables/super-teachers/use-get-list-lo-topic'
import UpdateLO from '~/components/admin/organisms/UpdateLO.vue'
import DeleteLOConfirmDialog from '~/components/admin/organisms/DeleteLOConfirmDialog.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
const headers = [
  {
    title: 'STT',
    align: 'start',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tiêu chí đánh giá', key: 'main_criteria', width: '45%', minWidth: 350 },
  { title: 'Tiêu chí phụ', key: 'sub_criteria', width: '35%', minWidth: 250 },
  { title: 'Hệ số', key: 'cof', width: '10%', minWidth: 200 },
  { title: '', key: 'action', minWidth: 100 },
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

const { items, totalItems, isLoading, refetch, isRefetching } = useGetListLOs(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Tạo LO mới</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog min-width="500" width="50%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <admin-organisms-create-l-o @cancel="isActive.value = false" @success="refetch" />
          </template>
        </v-dialog>
        <v-spacer />
        <v-btn icon size="x-small" variant="text" @click="refetch()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div class="mt-2 h-[calc(100%_-_45px)] overflow-y-hidden">
        <v-data-table
          class="h-full"
          fixed-header
          :headers="headers"
          hide-default-footer
          :items="items"
          :items-per-page="100"
          :loading="isLoading || isRefetching"
        >
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="500" width="50%">
              <template #activator="{ props: activatorProps }">
                <v-btn color="success" icon size="small" variant="text" v-bind="activatorProps">
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-l-o :lo="item" @cancel="isActive.value = false" @success="refetch" />
              </template>
            </v-dialog>
            <delete-l-o-confirm-dialog :lo="item" @success="refetch" />
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
