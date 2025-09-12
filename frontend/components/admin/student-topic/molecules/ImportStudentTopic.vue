<script setup lang="ts">
import { serialize } from 'object-to-formdata'
import { useQueryClient } from 'vue-query'
import * as XLSX from 'xlsx'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import FormCard from '~/components/common/molecules/FormCard.vue'

const file = ref(null)
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const queryClient = useQueryClient()
const allowSubmit = ref(false)
const loading = ref(false)

const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Sinh viên', key: 'ten', width: '20%', minWidth: 200 },
  { title: 'Mã số', key: 'maso', minWidth: 100 },
  { title: 'Email', key: 'email', minWidth: 100 },
  { title: 'Ngày sinh', key: 'ngay_sinh', minWidth: 100 },
  { title: 'Lớp', key: 'lop', width: '15%', minWidth: 100, align: 'center' },
]

const importStudentTopic = () => {
  $api.studentTopic
    .importStudentTopic(serialize({ file: file.value }))
    .then((res) => {
      if (res.size > 2106) {
        $toast.error('Dữ liệu không hợp lệ, vui lòng kiểm tra lại!')
        const url = URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'error_student.xlsx')
        document.body.appendChild(link)
        link.click()
      } else {
        $toast.success('Import sinh viên thành công')
      }
      queryClient.invalidateQueries('student-topic')
      emit('cancel')
      emit('success')
    })
    .finally(() => {
      loading.value = false
    })
}
const requiredHeaders = ['STT', 'maso', 'hodem', 'ten', 'ngay_sinh', 'lop', 'email']
const items = ref([])

const preview = () => {
  const reader = new FileReader()
  if (file.value) {
    console.log('check file', file, file.value)
    if (file.value.size > 5 * 1024 * 1024) {
      $toast.error('File phải nhỏ hơn 5MB')
      return
    }
    reader.onload = (event) => {
      console.log('check event', event.target)
      if (event.target?.result) {
        const data = XLSX.read(event.target.result, { type: 'binary', cellDates: true })
        const sheet = data.Sheets[data.SheetNames[0]]
        const headersRow = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0]
        if (JSON.stringify(headersRow) !== JSON.stringify(requiredHeaders)) {
          $toast.error('File không đúng định dạng')
          return
        }
        const dataJson = XLSX.utils.sheet_to_json(sheet)
        allowSubmit.value = true
        items.value = dataJson
      }
    }
    reader.readAsBinaryString(file.value)
  }
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Hủy"
    :hide-submit="!allowSubmit"
    title="Import sinh viên khóa luận"
    @cancel="emit('cancel')"
    @submit="importStudentTopic"
  >
    <div v-if="allowSubmit">
      <div class="d-flex items-center">
        <v-icon class="ma-2" color="error">mdi-alert-circle</v-icon>
        <span>Dữ liệu không hợp lệ có thể không được lưu!</span>
      </div>
      <v-data-table-virtual :headers="headers" height="400" item-value="name" :items="items">
        <template #item.index="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template #item.ten="{ item }">
          <span v-if="item.hodem && item.ten">{{ item.hodem + ' ' + item.ten }}</span>
          <span v-else><v-icon color="error">mdi-alert-circle</v-icon></span>
        </template>
        <template #item.maso="{ item }">
          <span v-if="item.maso">{{ item.maso }}</span>
          <span v-else><v-icon color="error">mdi-alert-circle</v-icon></span>
        </template>
        <template #item.email="{ item }">
          <span v-if="item.email">{{ item.email }}</span>
          <span v-else><v-icon color="error">mdi-alert-circle</v-icon></span>
        </template>
      </v-data-table-virtual>
    </div>
    <div v-else>
      <div class="mt-5">
        Tải xuống mẫu import dữ liệu:
        <a download href="/files/student_topic_template.xlsx" target="_blank">download</a>
      </div>
      <div class="mt-4">
        <div class="max-w-[520px] ma-auto d-flex">
          <v-file-input v-model="file" accept=".xlsx" class="w-full mr-4" label="File dữ liệu" variant="outlined" />
          <div class="d-none">
            <app-text-field v-model="file" rules="required" />
          </div>
          <v-btn color="success" :disabled="!file" @click="preview">Xem trước</v-btn>
        </div>
      </div>
    </div>
  </form-card>
</template>
