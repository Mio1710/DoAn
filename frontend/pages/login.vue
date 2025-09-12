<template>
  <div class="login-container">
    <!-- Header -->
    <header class="header">
      <img src="/images/logo_iuh.png" alt="Logo IUH" class="logo" />
      <div class="header-text">
        <h1 class="title">TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH</h1>
        <h2 class="subtitle">HỆ THỐNG QUẢN LÝ KHOÁ LUẬN - THỰC TẬP</h2>
      </div>
    </header>

    <!-- Background Image -->
    <div class="background-image">
      <v-card class="login-form m-auto px-6 py-8" max-width="600" min-width="450">
        <h3 class="form-title">ĐĂNG NHẬP HỆ THỐNG</h3>
        <app-form v-slot="{ handleSubmit }">
          <app-text-field v-model="form.maso" class="mb-5" label="Mã số" name="Mã số" rules="required" />
          <app-password v-model="form.matkhau" label="Mật khẩu" name="Mật khẩu" rules="required" type="password" />
          <v-checkbox v-model="form.type" label="Bạn là giáo viên" name="Bạn là giáo viên" value="teacher" />
          <v-btn block color="success" :loading="loading" size="large" variant="elevated" @click="handleSubmit(onSubmit)">
            Sign In
          </v-btn>
        </app-form>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import AppForm from '~/components/common/molecules/AppForm.vue'
import AppPassword from '~/components/common/atoms/AppPassword.vue'
const form = reactive({
  maso: '',
  matkhau: '',
  type: null,
})
const loading = ref(false)
const { signIn } = useAuth()
const { $toast } = useNuxtApp()
const onSubmit = () => {
  loading.value = true
  console.log('Click submit', form);
  
  signIn(form, {
    callbackUrl: '/',
    redirect: true,
  })
    .catch((e) => {
      $toast.error('Đăng nhập không thành công. Vui lòng thử lại!')
      console.error('Login error:', e)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 80%;
  margin-right: 10px;
}

.header-text {
  text-align: center;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  color: #0056b3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  color: #ff0000;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.background-image {
  flex: 1;
  background: url('/images/img_login.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #0056b3;
  font-size: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
}
</style>
