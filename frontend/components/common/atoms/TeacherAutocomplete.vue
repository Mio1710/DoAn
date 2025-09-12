<script setup lang="ts">
import useGetTeachers from '~/composables/admin/use-get-teachers'
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: String,
    default: '',
  },
})
const value = defineModel()
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
const { items, isLoading } = useGetTeachers(queryBuilder)
const isRequired = computed(() => props.rules.includes('required'))

</script>

<template>
  <div>
    <VeeField v-slot="{ errorMessage }" v-model="value" name="Giảng viên" :rules="props.rules">
      <v-autocomplete
        v-model="value"
        chips
        closable-chips
        :error-messages="errorMessage"
        :item-title="getFullName"
        item-value="id"
        :items="items"
        :label="`Giảng viên${isRequired ? '*' : ''}`"
        :loading="isLoading"
        :multiple="multiple"
      />
    </VeeField>
  </div>
</template>

<style scoped></style>
