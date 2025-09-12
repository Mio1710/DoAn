<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'

defineProps({
  width: {
    type: String,
    default: '70%',
  },
})
const modelValue = defineModel()
const dialog = computed(() => modelValue.value)
</script>

<template>
  <v-dialog :v-model="dialog" :width="width" />
</template>

<style scoped></style>
