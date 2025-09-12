<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import TeacherAutocomplete from '~/components/common/atoms/TeacherAutocomplete.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const form = reactive({
  name: props.item.name,
  teacher_ids: props.item.teachers.map((teacher) => teacher?.teacher_id),
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel'])
const queryClient = useQueryClient()

const updateTeacherGroup = () => {
  $api.teacherGroup.updateTeacherGroup(props.item.id, form).then(() => {
    $toast.success('Tạo Nhóm giảng viên thành công')
    queryClient.invalidateQueries('teacher-group')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Tạo nhóm" @cancel="emit('cancel')" @submit="updateTeacherGroup">
    <app-text-field v-model="form.name" label="Tên nhóm" name="Tên nhóm" rules="required" />
    <teacher-autocomplete v-model="form.teacher_ids" :multiple="true" name="Giảng viên" rules="required" />
  </form-card>
</template>
