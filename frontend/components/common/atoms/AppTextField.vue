<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'text',
  },
  rules: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})
const value = defineModel()
const isRequired = computed(() => props.rules.includes('required'))
</script>

<template>
  <div class="mb-4">
    <VeeField v-slot="{ errorMessage }" v-model="value" :name="props.name" :rules="props.rules">
      <v-textarea
        v-if="props.type === 'textarea'"
        v-model="value"
        :error-messages="errorMessage"
        :label="`${props.label}${isRequired ? '*' : ''}`"
        :name="props.name"
        :placeholder="props.placeholder"
        :type="props.type"
      />
      <v-text-field
        v-else
        v-bind="$attrs"
        v-model="value"
        :error-messages="errorMessage"
        :label="`${props.label}${isRequired ? '*' : ''}`"
        :name="props.name"
        :placeholder="props.placeholder"
        :type="props.type"
      />
    </VeeField>
  </div>
</template>

<style scoped></style>
