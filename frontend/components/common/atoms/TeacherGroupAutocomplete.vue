<script setup lang="ts">
import useGetListTeacherGroups from '~/composables/super-teachers/use-get-list-teacher-group'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'Nhóm giảng viên phản biện',
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
}))

const { items, isLoading } = useGetListTeacherGroups(queryBuilder)
</script>

<template>
  <VeeField v-slot="{ errorMessage }" v-model="model" :name="props.name" :rules="props.rules">
    <v-autocomplete
      v-model="model"
      chips
      class="mb-4"
      closable-chips
      :error-messages="errorMessage"
      item-title="name"
      item-value="id"
      :items="items"
      :label="props.name"
      :loading="isLoading"
      :multiple="multiple"
    />
  </VeeField>
</template>

<style scoped></style>
