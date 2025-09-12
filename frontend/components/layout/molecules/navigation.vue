<script setup lang="ts">
import {
  StudentMenu,
  TeacherMenu,
  SuperTeacherMenu,
  AdminMenu,
  SuperAdminMenu,
  CurrentSemesterMenu,
} from '~/configs/navigation'
import type { menu } from '~/types/config'

const opened = ref<number[]>([])
const { data } = useAuth()
const navigation = ref<menu[]>([])
onMounted(() => {
  if (data.value?.roles.includes('super_admin')) {
    navigation.value.push(SuperAdminMenu)
    opened.value = navigation.value.map((group) => group.id ?? 0)
  }
  if (data.value?.roles.includes('teacher')) {
    navigation.value.push(TeacherMenu)
    opened.value = navigation.value.map((group) => group.id ?? 0)
  }
  if (data.value?.roles.includes('super_teacher')) {
    navigation.value.push(SuperTeacherMenu)
    opened.value = navigation.value.map((group) => group.id ?? 0)
  }
  if (data.value?.roles.includes('admin')) {
    navigation.value.push(AdminMenu)
    opened.value = navigation.value.map((group) => group.id ?? 0)
  }
  if (data.value?.roles.includes('student')) {
    navigation.value = StudentMenu
    opened.value = navigation.value.map((group) => group.id ?? 0)
  }
})
</script>
<template>
  <v-list v-if="navigation" nav :opened="opened">
    <v-list-item
      :prepend-icon="CurrentSemesterMenu.icon"
      :title="CurrentSemesterMenu.title"
      :to="CurrentSemesterMenu.to"
    />
    <v-list-group v-for="group in navigation" :key="group.id" class="navigation" :value="group.id">
      <template #activator="{ props }">
        <v-list-item v-bind="props" :prepend-icon="group.icon" :title="group.title" />
      </template>

      <v-list-item
        v-for="item in group.children"
        :key="item.title"
        :title="item.title"
        :to="item.to"
        :value="item.title"
      >
        <template #prepend>
          <v-icon size="small">{{ item.icon }}</v-icon>
        </template>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<style lang="scss"></style>
