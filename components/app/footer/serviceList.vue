<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const query = groq`
*[_type=='services'][0]`;
const { data: services } = useSanityQuery(query);
</script>
<template>
  <div class="col-lg-2 col-6 footer-links">
    <h4>Our Services</h4>
    <!-- <pre>{{ services }}</pre> -->
    <ul>
      <li
        v-for="service in services.services"
        :key="service._key"
        class="d-flex-inline gap-2"
      >
        <ClientOnly>
          <FontAwesomeIcon icon="fa-light fa-angle-right"></FontAwesomeIcon>
        </ClientOnly>
        <NuxtLink to="/#services">{{ service.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
