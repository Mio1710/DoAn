export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth()

  if (!data.value?.roles.includes('teacher')) {
    return navigateTo('/invalid-page')
  }
})
