export default defineNuxtRouteMiddleware(async () => {
  const { token_expired, checkAutoRefresh } = useDirectusToken();

  await checkAutoRefresh();

  if (!token_expired.value) {
    return navigateTo('/home');
  }
});
