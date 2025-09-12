<script setup lang="ts">
import { serialize } from 'object-to-formdata'
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import useGetStudentReportTopics from "~/composables/teacher/use-get-student-report-topic";

definePageMeta({
  layout: 'auth',
})
const loading = ref(false)
const isUpdate = ref(false)
const itemUpdate = ref(null)
const initForm = () => ({
  id: null,
  week: '',
  description: '',
  file: null,
})
const form = reactive(initForm())
const { $api, $toast } = useNuxtApp()
const queryClient = useQueryClient()

const onSubmit = () => {
  loading.value = true
  $api.reportTopic
    .createReportTopic(serialize(form))
    .then(() => {
      queryClient.invalidateQueries('my-report-topic')
      Object.assign(form, initForm())
      $toast.success('Nộp báo cáo thành công')
    })
    .finally(() => {
      loading.value = false
    })
}

const downloadFile = (item) => {
  $api.reportTopic.downloadReportTopic(item.file_key).then((res) => {
    const url = URL.createObjectURL(new Blob([res]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', item.file_name)
    document.body.appendChild(link)
    link.click()
  })
}
const panel = ref([])
const route = useRoute()

const studentId = route.params.id
console.log('studentId', studentId)
const { items, totalItems, isLoading, refetch } = useGetStudentReportTopics(studentId)
const onUpdate = (item) => {
  itemUpdate.value = item
  isUpdate.value = true
}
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Báo cáo tiến độ đề tài đồ án</div>
    <v-card class="pa-3 h-full overflow-y-scroll" color="white" variant="flat">
      <div v-if="items">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(item, index) in items" :key="index">
            <v-expansion-panel-title>
              <div class="d-flex w-full">
                <span>Tuần {{ item.week }}</span>
                <v-spacer />
                <div>Nộp lúc: {{ format(new Date(item?.created_at), 'dd/MM/yyyy HH:mm') }}</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="d-flex items-center">
                <div>
                  File báo cáo:
                  <span class="cursor-pointer underline text-blue-400" @click="downloadFile(item)">
                    {{ item.file_name }}
                  </span>
                </div>
                <v-spacer />
                <v-btn
                  color="success"
                  height="20"
                  icon="mdi-pencil"
                  size="small"
                  variant="plain"
                  @click="onUpdate(item)"
                />
              </div>
              <div>
                <div>Mô tả: {{ item.description }}</div>
                <div>Nhận xét của giảng viên:</div>
                <div>{{ item.comment }}</div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
