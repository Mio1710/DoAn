<script setup lang="ts">
import { serialize } from 'object-to-formdata'
import { useQueryClient } from 'vue-query'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import AppForm from '~/components/common/molecules/AppForm.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const loading = ref(false)
const form = ref({ ...props.item })
const { $api, $toast } = useNuxtApp()
const queryClient = useQueryClient()
const emit = defineEmits(['success'])
const onSubmit = () => {
  $api.reportIntern
    .updateReportIntern(form.value.id, serialize(form.value))
    .then(() => {
      queryClient.invalidateQueries('my-report-intern')
      $toast.success('Cập nhật báo cáo thành công')
      emit('success')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <app-form v-slot="{ handleSubmit }">
    <app-text-field v-model="form.week" class="mb-5" label="Tuần số" name="Tuần số" rules="required" type="number" />
    <div v-if="form.file_name">* {{ form.file_name }}</div>
    <v-file-input
      v-model="form.file"
      accept=".doc,.docx,.pdf"
      clearable
      label="File báo cáo"
      name="File báo cáo"
      :prepend-icon="false"
      prepend-inner-icon="mdi-paperclip"
      show-size
      variant="outlined"
      @change="form.file_name = ''"
    />
    <app-text-field
      v-model="form.description"
      class="mb-4"
      label="Mô tả"
      name="Mô tả"
      rules="required"
      type="textarea"
    />
    <div class="w-full text-center mb-4">
      <v-btn color="success" :loading="loading" size="small" @click="handleSubmit(onSubmit)">Nộp báo cáo</v-btn>
    </div>
  </app-form>
</template>

<style scoped></style>
