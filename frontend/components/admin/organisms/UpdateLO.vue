<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import LOForm from '~/components/admin/molecules/LOForm.vue'

const props = defineProps({
  lo: {
    type: Object,
    required: true,
  },
})

const form = ref({ ...props.lo })
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['cancel', 'success'])
const updateLO = () => {
  form.value.cof = parseFloat(form.value.cof)
  $api.lo.updateLO(form.value.id, form.value).then(() => {
    $toast.success('Chỉnh sửa LO thành công')
    emit('success')
    emit('cancel')
  })
}
</script>

<template>
  <form-card can-cancel cancel-text="Hủy" title="Chỉnh sửa LO" @cancel="emit('cancel')" @submit="updateLO">
    <l-o-form v-model="form" />
  </form-card>
</template>
