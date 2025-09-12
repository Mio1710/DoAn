<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  rules: {
    type: String,
    default: '',
  },
})
const value = defineModel()
const show = ref(false)
const isRequired = props.rules.includes('required')
</script>

<template>
  <div class="mb-4">
    <VeeField v-slot="{ errorMessage }" v-model="value" :label="label || name" :name="name || label" :rules="props.rules">
      <v-text-field
        v-model="value"
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        aria-autocomplete="new-password"
        :error-messages="errorMessage"
        :label="label || name"
        :name="name || label"
        :type="show ? 'text' : 'password'"
        @click:append-inner="show = !show"
      >
        <template v-if="label" #label>
          {{ label }}
          <span v-if="isRequired" class="text-error">*</span>
        </template>
      </v-text-field>
    </VeeField>
  </div>
</template>

<style scoped></style>
