<script lang="ts" setup>
import Navigation from '~/components/layout/molecules/navigation.vue'
import ToolbarUser from '~/components/layout/molecules/toolbar-user.vue'
import useGetActiveSemester from '~/composables/use-get-active-semester'

const drawer = ref(true)
const rail = ref(false)
const { signOut } = useAuth()
const logout = () => {
  signOut()
  navigateTo('/login')
}
const { activeSemester } = useGetActiveSemester()
</script>
<template>
  <v-card>
    <v-layout>
      <v-app-bar color="#08387f" flat height="40" title="Trung tâm quản trị">
        <div class="text-uppercase font-weight-bold">{{ activeSemester?.ten }}</div>
        <v-spacer />
        <toolbar-user />
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" permanent :rail="rail" @click="rail = false">
        <v-list-item nav prepend-avatar="/images/logo.jpg" title="Trang chủ">
          <template #append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail" />
          </template>
        </v-list-item>
        <v-divider />
        <navigation />
      </v-navigation-drawer>
      <v-main class="bg-grey-lighten-4">
        <v-container class="pa-3 h-[calc(100vh_-_50px)]" fluid>
          <div class="flex gap-1 h-full">
            <router-view class="overflow-y-auto" />
          </div>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style lang="scss">
* {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}
</style>
