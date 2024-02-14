<script setup>
const qryNavigation = groq`*[_type == "navigation" && _id == "mainNavigation"][0]{
  name,
  _id,
  links[]->{
    ...
  }}`;
const { data: mainNavigation } = useSanityQuery(qryNavigation);
const qrySettings = groq`*[_type == "settings"][0]{
  title,
  'logoUrl':logo.asset->url
  }`;
const { data: settings } = useSanityQuery(qrySettings);
</script>
<template>
  <header id="header" class="header fixed-top">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-between"
    >
      <NuxtLink to="/" class="logo d-flex align-items-center">
        <img :src="settings.logoUrl" :alt="settings.title" />
        <span>{{ settings.title }}</span>
      </NuxtLink>

      <nav id="navbar" class="navbar">
        <AppHeaderMenu :navigation="mainNavigation" />
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
</template>
