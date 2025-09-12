export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth()

  if (!data.value?.roles.includes('super_admin')) {
    return navigateTo('/invalid-page')
  }
})
