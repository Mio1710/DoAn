<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import AppPassword from '~/components/common/atoms/AppPassword.vue'
const { signOut } = useAuth()

const logout = () => {
  signOut()
  navigateTo('/login')
}
</script>

<template>
  <v-dialog min-width="400" width="40%">
    <template #activator="{ props: activatorProps }">
      <div variant="plain" v-bind="activatorProps">
        <span>Đăng xuất</span>
      </div>
    </template>
    <template #default="{ isActive }">
      <form-card
        can-cancel
        cancel-text="Hủy"
        submit-text="Đăng xuất"
        title="Xác nhận đăng xuất"
        @cancel="isActive.value = false"
        @submit="logout"
      >
        <div class="text-center text-warning">
          <span>
            <v-icon>mdi-warning</v-icon>
            Đăng xuất khỏi hệ thống?
          </span>
        </div>
      </form-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
