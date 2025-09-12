<script setup lang="ts">
import useGetTeacherss from '~/composables/admin/use-get-teacherss'

const model = defineModel()
const search = ref('')
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
}))

const getFullName = (item) => `${item.maso} - ${item.hodem} ${item.ten}`
const { items, isLoading } = useGetTeacherss(queryBuilder)
</script>

<template>
  <div>
    <v-autocomplete
      v-model="model"
      chips
      closable-chips
      :item-title="getFullName"
      item-value="id"
      :items="items"
      label="Giảng viên hướng dẫn"
      :loading="isLoading"
    />
  </div>
</template>

<style scoped></style>
