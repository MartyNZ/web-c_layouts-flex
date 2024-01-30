<script setup>
const route = useRoute();
</script>
<template>
  <AppHeader />
  <SectionHero v-if="route.path === '/'" />
  <main><NuxtPage /></main>
  <AppFooter />
  <AppBackToTop />
</template>
