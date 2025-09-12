<script setup lang="ts">
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const form = defineModel()
</script>

<template>
  <app-text-field
    v-model="form.main_criteria"
    label="Tiêu chí đánh giá"
    name="Tiêu chí đánh giá"
    rules="required"
    type="textarea"
  />
  <app-text-field
    v-model="form.sub_criteria"
    label="Tiêu chí phụ"
    name="Tiêu chí phụ"
    rules="required"
    type="textarea"
  />
  <app-text-field
    v-model="form.cof"
    label="Hệ số"
    name="Hệ số"
    placeholder="0.3..."
    rules="required|max:10"
    type="number"
  />
</template>

<style scoped></style>
