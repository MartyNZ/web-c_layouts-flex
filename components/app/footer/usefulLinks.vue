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
    <h4>{{ usefulLinks }}</h4>
    <!-- <ul>
      <template v-for="link in navigation.links">
        <li v-if="link._id == 'homepage'">
          <NuxtLink class="nav-link scrollto" to="/">{{ link.title }}</NuxtLink>
        </li>
        <li v-else-if="link._type == 'contactpage' || link._type == 'page'">
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
    </ul> -->
  </div>
</template>
