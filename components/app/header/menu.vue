<script setup>
const props = defineProps({
  navigation: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <ul>
    <template v-for="link in navigation.links">
      <li v-if="link._id == 'homepage'">
        <NuxtLink class="nav-link scrollto" to="/">{{ link.title }}</NuxtLink>
      </li>
      <li v-else-if="link.isSection">
        <NuxtLink class="nav-link scrollto" :to="`/#${link.slug.current}`">{{
          link.title
        }}</NuxtLink>
      </li>
    </template>
    <li>
      <NuxtLink class="getstarted" to="/contact-us">Get Started</NuxtLink>
    </li>
  </ul>
</template>
