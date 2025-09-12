<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import {useQueryClient} from "vue-query";

const props = defineProps({
  lo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['success'])
const { $api, $toast } = useNuxtApp()
const queryClient = useQueryClient()
const deleteLO = (isActive) => {
  $api.lo.deleteLO(props.lo.id).then(() => {
    $toast.success('Xóa LO thành công')
    queryClient.invalidateQueries('lo')
    isActive.value = false
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
        title="Xác nhận xóa LO"
        @cancel="isActive.value = false"
        @submit="deleteLO(isActive)"
      >
        <div class="text-center text-warning">
          <span>
            <v-icon>mdi-warning</v-icon>
            Xóa LO
            <strong>{{ lo.main_criteria }}</strong>
            khỏi hệ thống?
          </span>
        </div>
      </form-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
