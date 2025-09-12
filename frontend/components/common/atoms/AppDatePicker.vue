<script setup lang="ts">
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  name: {
    type: String,
    default: 'text',
  },
  rules: {
    type: String,
    default: '',
  },
  range: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  textInput: {
    type: Boolean,
    default: false,
  },
})
const value = defineModel()
const isRequired = computed(() => props.rules.includes('required'))
</script>

<template>
  <div class="mb-0">
    <VeeField v-slot="{ errorMessage }" v-model="value" :name="props.name" :rules="props.rules">
      <app-text-field
        v-model="value"
        :error-messages="errorMessage"
        :label="`${props.label}${isRequired ? '*' : ''}`"
        :name="props.name"
        type="datetime-local"
      />
    </VeeField>
  </div>
</template>

<style scoped></style>
