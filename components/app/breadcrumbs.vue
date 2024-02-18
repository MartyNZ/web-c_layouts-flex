<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});
const path = useRoute().fullPath;

console.log(path);

const titleize = (slug) => {
  let words = slug.split("-");
  return words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
};

console.log(titleize(slug));
</script>
<template>
  <section class="breadcrumbs">
    <div class="container">
      <ol>
        <li><a href="index.html">Home</a></li>
        <li>Blog</li>
      </ol>
      <h2>Blog</h2>
    </div>
  </section>
</template>
