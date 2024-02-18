<script setup>
const { slug } = useRoute().params;
const { fullPath } = useRoute().fullPath;

const qryPortfolioItem = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0]{
    title,
    'slug':slug.current,
    body,
    projectUrl,
    client,
    'category':category->title,
    date,
    images[]{
      _key,
      'imageId':asset->_id,
      'imageUrl':asset->url
    }
  }
`;
const { data: portfolioItem } = useSanityQuery(qryPortfolioItem, {
  slug: slug,
});
</script>
<template>
  <pre>{{ slug }} {{ fullPath }}</pre>
  <pre>{{ portfolioItem }}</pre>
  <!-- <AppBreadcrumbs :slug="slug" /> -->
  <!-- <SectionPortfolioItem :portfolioItem="portfolioItem" /> -->
</template>
