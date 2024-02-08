<script setup>
const query = groq`
*[_type=='services'][0]`;
const { data: services } = useSanityQuery(query);
</script>
<template>
  <div class="col-lg-2 col-6 footer-links">
    <h4>{{ services }}</h4>
    <!-- <ul>
      <li><i class="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
      <li>
        <i class="bi bi-chevron-right"></i>
        <a href="#">Web Development</a>
      </li>
      <li>
        <i class="bi bi-chevron-right"></i>
        <a href="#">Product Management</a>
      </li>
      <li><i class="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
      <li>
        <i class="bi bi-chevron-right"></i>
        <a href="#">Graphic Design</a>
      </li>
    </ul> -->
  </div>
</template>
