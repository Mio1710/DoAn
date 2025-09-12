<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import topicStatus from '../../plugins/filters/topic-status'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import AppForm from '~/components/common/molecules/AppForm.vue'
import TeacherAutocomplete from '~/components/common/atoms/TeacherAutocomplete.vue'
import useGetMyReportTopics from '~/composables/student/use-get-my-report-topic'
import useGetMyRecommendTopics from '~/composables/student/use-get-my-recommend-topic'

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  ten: '',
  description: '',
  requirement: '',
  knowledge: '',
  teacher_id: null,
  status: 'pending',
})
const { $api, $toast } = useNuxtApp()
const loading = ref(false)
const queryClient = useQueryClient()
const onSubmit = () => {
  loading.value = true
  if (isUpdate.value) {
    $api.topic
      .updateRecommendTopic(items.value.id, form)
      .then(() => {
        $toast.success('Cập nhật đề tài thành công')
        queryClient.invalidateQueries('my-recommend-topic')
        isUpdate.value = false
      })
      .finally(() => {
        loading.value = false
      })
    return
  }
  $api.topic.createRecommendTopic(form).then(() => {
    $toast.success('Đăng ký đề tài thành công')
    queryClient.invalidateQueries('my-recommend-topic')
  })
  loading.value = false
}

const isUpdate = ref(false)

const onUpdate = () => {
  isUpdate.value = true
  form.ten = items.value.ten
  form.description = items.value.description
  form.teacher_id = items.value.teacher_id
  form.knowledge = items.value.knowledge
}

const { items, isLoading, refetch } = useGetMyRecommendTopics()
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Đề xuất đề tài đồ án</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <app-form v-if="!items || isUpdate" v-slot="{ handleSubmit }">
        <app-text-field v-model="form.ten" label="Tên đề tài" name="Tên đề tài" rules="required" />
        <app-text-field v-model="form.description" label="Mô tả" name="Mô tả" rules="required" type="textarea" />
        <teacher-autocomplete
          v-model="form.teacher_id"
          class="mb-4"
          label="Giảng viên"
          name="Giảng viên"
          rules="required"
        />
        <app-text-field v-model="form.knowledge" label="Công nghệ sử dụng" name="Công nghệ sử dụng" rules="required" />
        <div class="text-center">
          <v-btn color="success" :loading="loading" size="small" variant="elevated" @click="handleSubmit(onSubmit)">
            Đăng ký
          </v-btn>
        </div>
      </app-form>
      <div v-if="items && !isUpdate" class="d-flex flex-column gap-4">
        <div class="d-flex">
          <v-chip :color="topicStatus.statusColor(items.status)" size="small" variant="flat">
            <span>{{ topicStatus.statusType(items.status) }}</span>
          </v-chip>
          <v-spacer />
          <v-btn v-if="items.status != 'approved'" color="success" icon size="x-small" variant="text" @click="onUpdate">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div>
          <span class="font-weight-bold mr-2">Tên đề tài đề xuất:</span>
          <span>{{ items.ten }}</span>
        </div>
        <div>
          <span class="font-weight-bold mr-2">Mô tả:</span>
          <span>{{ items.description }}</span>
        </div>
        <div>
          <span class="font-weight-bold mr-2">Giảng viên:</span>
          <span>{{ items.teacher?.hodem }} {{ items.teacher?.ten }}</span>
        </div>
        <div>
          <span class="font-weight-bold mr-2">Công nghệ sử dụng:</span>
          <span>{{ items.knowledge }}</span>
        </div>
        <div v-if="items.status == 'rejected'">
          <span class="font-weight-bold mr-2">Lý do từ chối đề tài:</span>
          <span>{{ items.reject_reason }}</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
