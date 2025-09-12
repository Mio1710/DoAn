<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'

const props = defineProps({
  intern: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['success', 'cancel'])
const { $api, $toast } = useNuxtApp()
const deleteIntern = () => {
  console.log('Deleting intern with ID:', props.intern.id)
  $api.intern.deleteIntern(props.intern.id).then(() => {
    $toast.success('Hủy đăng ký thực tập thành công')
    emit('success')
    emit('cancel')
  }).catch((error) => {
    $toast.error('Có lỗi xảy ra khi hủy đăng ký thực tập')
    console.error(error)
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
        title="Xác nhận hủy đăng ký thực tập"
        @cancel="isActive.value = false"
        @submit="deleteIntern"
      >
        <div class="text-center text-warning">
          <span>
            <v-icon>mdi-warning</v-icon>
            Bạn có chắc chắn muốn hủy đăng ký thực tập không?
          </span>
        </div>
      </form-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>