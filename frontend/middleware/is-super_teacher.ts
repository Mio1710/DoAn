export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth()

  if (!data.value?.roles.includes('super_teacher')) {
    return navigateTo('/invalid-page')
  }
})
