<script setup>
const query = groq`
*[_type == "navigation" && _id == "footerNavigation"][0]{
  name,
  _id,
  title,
  links[]->{
    ...
  }}`;
const { data: usefulLinks } = useSanityQuery(query);
</script>
<template>
  <div class="col-lg-2 col-6 footer-links">
    <h4>Useful Links</h4>
    <!-- <pre>{{ usefulLinks }}</pre> -->
    <ul>
      <template v-for="link in usefulLinks.links">
        <li v-if="link._id == 'homepage'">
          <NuxtLink class="nav-link scrollto" to="/">{{ link.title }}</NuxtLink>
        </li>
        <li v-else-if="!link.isSection">
          <NuxtLink class="nav-link scrollto" :to="`/${link.slug.current}`">{{
            link.title
          }}</NuxtLink>
        </li>
        <li v-else-if="link.isSection">
          <NuxtLink class="nav-link scrollto" :to="`/#${link.slug.current}`">{{
            link.title
          }}</NuxtLink>
        </li>
      </template>
      <li>
        <NuxtLink class="nav-link" to="/contact-us"> Contact Us </NuxtLink>
      </li>
    </ul>
  </div>
</template>
