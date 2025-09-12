<script setup lang="ts">
import { serialize } from 'object-to-formdata'
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import AppForm from '~/components/common/molecules/AppForm.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import useGetMyReportInterns from '~/composables/student/use-get-my-report-intern'
import UpdateReportIntern from '~/components/student/company/molecules/UpdateReportIntern.vue'

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
  $api.reportIntern
    .createReportIntern(serialize(form))
    .then(() => {
      queryClient.invalidateQueries('my-report-intern')
      Object.assign(form, initForm())
      $toast.success('Nộp báo cáo thành công')
    })
    .finally(() => {
      loading.value = false
    })
}

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
const { items, totalItems, isLoading, refetch } = useGetMyReportInterns(null, { retry: 0 })
const onUpdate = (item) => {
  itemUpdate.value = item
  isUpdate.value = true
}
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Báo cáo tiến độ thực tập</div>
    <v-card class="pa-3 h-full overflow-y-scroll" color="white" variant="flat">
      <update-report-intern v-if="isUpdate" :item="itemUpdate" @success="isUpdate = false" />
      <app-form v-else v-slot="{ handleSubmit }">
        <app-text-field
          v-model="form.week"
          class="mb-5"
          label="Tuần số"
          name="Tuần số"
          rules="required"
          type="number"
        />
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
