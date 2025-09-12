export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth()

  if (!data.value?.roles.includes('admin')) {
    return navigateTo('/invalid-page')
  }
})
