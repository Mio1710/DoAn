<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import AppDatePicker from '~/components/common/atoms/AppDatePicker.vue'

const form = ref({
  ten: '',
  note: '',
  start_date: '',
  end_date: '',
  start_register_group: '',
  end_register_group: '',
  start_publish_topic: '',
  end_publish_topic: '',
  start_register_topic: '',
  end_register_topic: '',
  start_defense: '',
  end_defense: '',
  start_report_topic: '',
  end_report_topic: '',
  public_result: '',
})
const emit = defineEmits(['cancel', 'update'])
const { $api, $toast } = useNuxtApp()
const queryClient = useQueryClient()

const create = () => {
  try {
    $api.semester.createSemester(form.value).then(() => {
      queryClient.invalidateQueries('semester')
      $toast.success('Tạo mới thành công')
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Tạo đợt đăng ký" @cancel="emit('cancel')" @submit="create">
    <app-text-field v-model="form.ten" label="Tên kỳ đăng ký" name="Tên kỳ đăng ký" rules="required" />
    <app-text-field v-model="form.note" label="Ghi chú" name="Ghi chú" />
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_date"
        label="Ngày bắt đầu"
        name="Ngày bắt đầu"
        :rules="`required|before:${form.end_date}`"
        type="datetime-local"
      />
      <app-date-picker
        ref="end_date"
        v-model="form.end_date"
        label="Ngày kết thúc"
        name="Ngày kết thúc"
        :rules="`required|after:${form.start_date}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_register_group"
        label="Bắt đầu đăng ký nhóm"
        name="Bắt đầu đăng ký nhóm"
        :rules="`before:${form.end_register_group}`"
        type="datetime-local"
      />
      <app-date-picker
        v-model="form.end_register_group"
        label="Kết thúc đăng ký nhóm"
        name="Kết thúc đăng ký nhóm"
        :rules="`after:${form.start_register_group}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_publish_topic"
        label="Bắt đầu công bố đề tài"
        name="Bắt đầu công bố đề tài"
        :rules="`before:${form.end_publish_topic}`"
        type="datetime-local"
      />
      <app-date-picker
        v-model="form.end_publish_topic"
        label="Kết thúc công bố đề tài"
        name="Kết thúc công bố đề tài"
        :rules="`after:${form.start_publish_topic}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_register_topic"
        label="Bắt đầu đăng ký đề tài"
        name="Bắt đầu đăng ký đề tài"
        :rules="`before:${form.end_register_topic}`"
        type="datetime-local"
      />
      <app-date-picker
        v-model="form.end_register_topic"
        label="Kết thúc đăng ký đề tài"
        name="Kết thúc đăng ký đề tài"
        :rules="`after:${form.start_register_topic}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_defense"
        label="Bắt đầu bảo vệ"
        name="Bắt đầu bảo vệ"
        :rules="`before:${form.end_defense}`"
        type="datetime-local"
      />
      <app-date-picker
        v-model="form.end_defense"
        label="Kết thúc bảo vệ"
        name="Kết thúc bảo vệ"
        :rules="`after:${form.start_defense}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex gap-4">
      <app-date-picker
        v-model="form.start_report_topic"
        label="Bắt đầu báo cáo đề tài"
        name="Bắt đầu báo cáo đề tài"
        :rules="`before:${form.end_report_topic}`"
        type="datetime-local"
      />
      <app-date-picker
        v-model="form.end_report_topic"
        label="Kết thúc báo cáo đề tài"
        name="Kết thúc báo cáo đề tài"
        :rules="`after:${form.start_report_topic}`"
        type="datetime-local"
      />
    </div>
    <v-divider class="mb-4" />
    <app-date-picker
      v-model="form.public_result"
      label="Kết quả công bố"
      name="Kết quả công bố"
      type="datetime-local"
    />
  </form-card>
</template>

<style scoped></style>
