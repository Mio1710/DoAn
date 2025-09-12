export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth()

  if (!data.value?.roles.includes('student')) {
    return navigateTo('/invalid-page')
  }
})
