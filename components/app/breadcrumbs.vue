<script setup>
const route = useRoute();
const path = route.path;

const breadcrumbPath = (path) => {
  // Split the path into segments
  const segments = path.split("/");

  // Remove the first item from the segments array
  const segmentsWithoutFirst = segments.slice(1);

  // Create an array of objects with segment and title properties
  return segmentsWithoutFirst.map((segment) => {
    let words = segment.split("-");
    const title = words
      .map(
        (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
      )
      .join(" ");
    return { segment, title };
  });
};
</script>
<template>
  <section class="breadcrumbs">
    <div class="container">
      <ol>
        <li>
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <template v-for="(item, index) in breadcrumbPath(path)" :key="index">
          <li v-if="index !== breadcrumbPath(path).length - 1">
            <NuxtLink :to="`/${item.segment}/`">
              {{ item.title }}
            </NuxtLink>
          </li>
        </template>
      </ol>
      <h2>{{ breadcrumbPath(path)[breadcrumbPath(path).length - 1].title }}</h2>
    </div>
  </section>
</template>
