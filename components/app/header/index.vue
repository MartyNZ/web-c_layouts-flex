<script setup>
import select from "../../../utils/select";
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

onMounted(() => {
  const headerScrolled = () => {
    const header = select("#header");
    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", headerScrolled);

  // Mobile nav toggle
  const mobileNavToggle = select(".mobile-nav-toggle");
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function (e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // Mobile nav dropdowns
  const navbarDropdowns = select(".navbar .dropdown > a");
  if (navbarDropdowns) {
    navbarDropdowns.addEventListener(
      "click",
      function (e) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle("dropdown-active");
        }
      },
      true
    );
  }

  // Scroll-to links
  const scrollToLinks = select(".scrollto");
  if (scrollToLinks) {
    scrollToLinks.addEventListener(
      "click",
      function (e) {
        if (select(this.hash)) {
          e.preventDefault();
          let navbar = select("#navbar");
          if (navbar.classList.contains("navbar-mobile")) {
            navbar.classList.remove("navbar-mobile");
            let navbarToggle = select(".mobile-nav-toggle");
            navbarToggle.classList.toggle("fa-bars");
            navbarToggle.classList.toggle("fa-xmark");
          }
          scrollto(this.hash);
        }
      },
      true
    );
  }

  // Clean up the event listeners when the component is unmounted
  onUnmounted(() => {
    window.removeEventListener("scroll", headerScrolled);
    // Add any additional cleanup for the other event listeners here
  });
});
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
