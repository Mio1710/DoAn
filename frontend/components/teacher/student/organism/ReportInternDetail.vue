<script setup lang="ts">
import { format } from 'date-fns'
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import useGetStudentReportInterns from '~/composables/teacher/use-get-student-report-intern'
import AppTextField from '~/components/common/atoms/AppTextField.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const loading = ref(false)
const { $api, $toast } = useNuxtApp()
const queryClient = useQueryClient()
const emit = defineEmits(['cancel', 'success'])

const downloadFile = (item) => {
  $api.reportIntern.downloadReportIntern(item.file_key).then((res) => {
    const url = URL.createObjectURL(new Blob([res]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', item.file_name)
    document.body.appendChild(link)
    link.click()
  })
}
const panel = ref([])
const studentInternId = props.item.student.id
const queryBuilder = computed(() => ({
  filters: {studentId: studentInternId },
}))

const { items, totalItems, isLoading, refetch } = useGetStudentReportInterns(queryBuilder, {
  enabled: !!studentInternId,
})

const comment = ref('')
const onUpdate = (item) => {
  $api.teacher.commentStudentReportIntern(item.id, { comment: comment.value }).then(() => {
    $toast.success('Cập nhật nhận xét thành công')
    queryClient.invalidateQueries('student-report-topic')
  })
}
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Đóng"
    hide-submit
    :title="`Báo cáo quá trình thực tập của sinh viên:`"
    @cancel="emit('cancel')"
  >
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
                <span class="font-weight-bold">File báo cáo:</span>
                <span class="cursor-pointer underline text-blue-400 ml-2" @click="downloadFile(item)">
                  {{ item.file_name }}
                </span>
              </div>
              <v-spacer />
              <v-btn
                color="success"
                height="20"
                icon="mdi-content-save-check"
                size="small"
                variant="plain"
                @click="onUpdate(item)"
              />
            </div>
            <div>
              <div>
                <span class="font-weight-bold">Mô tả:</span>
                {{ item.description }}
              </div>
              <div class="font-weight-bold">Nhận xét của giảng viên:</div>
              <div>
                <app-text-field
                  v-model="comment"
                  class="mb-4"
                  label="Nhận xét của giảng viên"
                  :model-value="item.comment"
                  name="Nhận xét của giảng viên"
                  rules="required"
                  type="textarea"
                />
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </form-card>
</template>
