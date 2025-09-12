<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'

const props = defineProps({
  studentIntern: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['success'])
const { $api, $toast } = useNuxtApp()
const deleteStudentIntern = () => {
  $api.admin.deleteStudentIntern(props.studentIntern.id).then(() => {
    $toast.success('Xóa sinh viên thực tập thành công')
    emit('success')
  })
}
</script>

<template>
  <v-dialog min-width="400" width="40%">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="error" icon size="small" variant="text">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </template>
    <template #default="{ isActive }">
      <form-card
        can-cancel
        cancel-text="Hủy"
        submit-text="Xóa"
        title="Xác nhận xóa sinh viên thực tập"
        @cancel="isActive.value = false"
        @submit="deleteStudentIntern"
      >
        <div class="text-center text-warning">
          <span>
            <v-icon>mdi-warning</v-icon>
            Xóa sinh viên
            <strong>{{ studentIntern.hodem }} {{ studentIntern.ten }} - {{ studentIntern.maso }}</strong>
            khỏi hệ thống?
          </span>
        </div>
      </form-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
