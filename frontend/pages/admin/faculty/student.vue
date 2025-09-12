<script setup lang="ts">
import { serialize } from 'object-to-formdata'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
const { $api, $toast } = useNuxtApp()
const importTeacher = () => {
  $api.teacher.importUser(serialize({ file: file.value })).then(() => {
    $toast.success('Import giáo viên thành công')
  })
}
const importSuperTeacher = () => {
  console.log('Import super teacher')
}
const importStudentTopic = () => {
  console.log('Import student topic')
}
const importStudentCompany = () => {
  console.log('Import student company')
}

const type = ref({})
const listType = ref([
  {
    key: 'teacher',
    color: 'success',
    label: 'Giáo viên',
    action: importTeacher,
    template: 'teacher_template.xlsx',
  },
  {
    key: 'student_topic',
    color: 'blue-lighten-1',
    label: 'Sinh viên đề tài',
    action: importStudentTopic,
    template: 'student_topic_template.xlsx',
  },
  {
    key: 'student_company',
    color: 'warning',
    label: 'Sinh viên doanh nghiệp',
    action: importStudentCompany,
    template: 'student_company_template.xlsx',
  },
])
const file = ref(null)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Import dữ liệu</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="text-center">
        <div class="text-h5 mb-4">Vui lòng chọn loại dữ liệu</div>
        <div class="d-flex justify-center flex-wrap gap-4">
          <v-btn
            v-for="(item, index) in listType"
            :key="index"
            :color="item.color"
            :variant="type.key == item.key ? 'elevated' : 'outlined'"
            @click="type = item"
          >
            {{ item.label }}
          </v-btn>
        </div>
        <div v-if="type.key" class="text-center mt-5">
          <v-divider class="mb-5" />
          <div>Bạn đang import dữ liệu cho:</div>
          <span :class="'text-h6 text-uppercase font-weight-bold text-' + type.color">
            {{ type.label }}
          </span>
          <div class="mt-5">
            Tải xuống mẫu import dữ liệu:
            <a download :href="'/files/' + type.template" target="_blank">download</a>
          </div>
          <div class="mt-4">
            <div class="max-w-[520px] ma-auto d-flex">
              <v-file-input v-model="file" accept=".xlsx" class="w-full mr-4" label="File dữ liệu" variant="outlined" />
              <v-btn color="success" :disabled="!file" @click="type.action">Import</v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
