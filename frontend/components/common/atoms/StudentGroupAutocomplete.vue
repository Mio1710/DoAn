<script setup lang="ts">
import useGetAllStudentGroups from '~/composables/super-teachers/use-get-all-student-group'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  isNullGroupTeacher: {
    type: Boolean,
    required: false,
  },
  name: {
    type: String,
    default: 'Nhóm sinh viên',
  },
  rules: {
    type: String,
    default: '',
  },
})
const model = defineModel()
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: {
    is_null_group_teacher: props.isNullGroupTeacher,
  },
}))

const getFullName = (item) => `Nhóm ${item.id}`
const { items, isLoading } = useGetAllStudentGroups(queryBuilder)
</script>

<template>
  <VeeField v-slot="{ errorMessage }" v-model="model" :name="props.name" :rules="props.rules">
    <v-autocomplete
      v-model="model"
      chips
      closable-chips
      :error-messages="errorMessage"
      :item-title="getFullName"
      item-value="id"
      :items="items"
      :label="props.name"
      :loading="isLoading"
      :multiple="multiple"
    />
  </VeeField>
</template>

<style scoped></style>
