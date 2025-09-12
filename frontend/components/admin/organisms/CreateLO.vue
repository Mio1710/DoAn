<script setup lang="ts">
import { serialize } from 'object-to-formdata'
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import LOForm from '~/components/admin/molecules/LOForm.vue'

const props = defineProps({
  lo: {
    type: Object,
    default: () => ({
      main_criteria: '',
      sub_criteria: '',
      cof: null,
    }),
  },
})

const form = ref({ ...props.lo })
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const createLO = () => {
  form.value.cof = parseFloat(form.value.cof)
  $api.lo.createLO(form.value).then(() => {
    $toast.success('Thêm LO thành công')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Thêm LO" @cancel="emit('cancel')" @submit="createLO">
    <l-o-form v-model="form" />
  </form-card>
</template>
