<script setup lang="ts">
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import AppForm from '~/components/common/molecules/AppForm.vue'
import AppPassword from '~/components/common/atoms/AppPassword.vue'

definePageMeta({
  layout: 'auth',
})
const { data, getSession } = useAuth()
const { $toast, $api } = useNuxtApp()

const form = reactive({
  std: null,
})

const onUpdatePhone = () => {
  isUpdatePhone.value = true
  form.std = data.value.phone
}
const isUpdatePhone = ref(false)
const onSubmit = async () => {
  const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
  const isValid = regex.test(form.std)
  if (!isValid) {
    $toast.error('Số điện thoại không hợp lệ')
  } else {
    $api.auth.updateProfile({ phone: form.std })
    await getSession()
    window.location.reload()
    $toast.success('Cập nhật số điện thoại thành công')
    isUpdatePhone.value = false
  }
}
</script>
<template>
  <v-card class="w-100 px-6 py-4">
    <div class="text-lg font-bold text-uppercase">Thông tin cá nhân</div>
    <div class="w-1/2 min-w-[500px] m-auto d-flex flex-column gap-4 justify-center h-full">
      <div class="text-center w-full">
        <v-avatar size="100">
          <v-img alt="John" src="/images/avatars/default.png" />
        </v-avatar>
      </div>
      <div class="d-flex">
        <div class="w-[200px]">Họ và tên:</div>
        <div>{{ data.hodem }} {{ data.ten }}</div>
      </div>
      <div v-if="data?.roles.includes('student')" class="d-flex">
        <div class="w-[200px]">Lớp:</div>
        <div>{{ data.lop }}</div>
      </div>
      <div class="d-flex">
        <div class="w-[200px]">Email:</div>
        <div>{{ data.email }}</div>
      </div>
      <div class="d-flex align-center">
        <div class="w-[200px]">Số điện thoại liên hệ:</div>
        <div class="d-flex items-center">
          <div v-if="!isUpdatePhone" class="mr-2">{{ data.phone }}</div>
          <app-text-field
            v-else
            v-model="form.std"
            class="w-[200px] mr-2"
            label="Số điện thoại"
            name="Số điện thoại"
            type="number"
          />
          <v-btn
            v-if="!isUpdatePhone"
            color="success"
            density="compact"
            icon="mdi-pencil"
            variant="outlined"
            @click="onUpdatePhone"
          />
          <div v-else class="d-flex mb-4">
            <v-btn
              class="mr-2"
              color="error"
              density="compact"
              icon="mdi-close"
              variant="outlined"
              @click="isUpdatePhone = false"
            />
            <v-btn
              color="success"
              density="compact"
              icon="mdi-content-save-check"
              variant="outlined"
              @click="onSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
