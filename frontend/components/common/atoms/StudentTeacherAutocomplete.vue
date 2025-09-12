<script setup lang="ts">
import useGetTeachers from '~/composables/student/use-get-student-teachers'

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

// const model = defineModel()
// const serverOptions = ref({
//   page: 1,
//   rowsPerPage: 100,
//   sortBy: '-created_at',
//   sortType: 'asc',
// })
// const queryBuilder = computed(() => ({
//   ...serverOptions.value,
// }))


const getFullName = (item) => `${item.hodem} ${item.ten}`
const { items, isLoading } = useGetTeachers(queryBuilder)
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
