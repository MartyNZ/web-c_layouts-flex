<script setup>
const route = useRoute();

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
  slug: route.params.slug,
});
</script>
<template>
  <AppBreadcrumbs />
  <SectionPortfolioItem v-if="portfolioItem" :portfolioItem="portfolioItem" />
</template>
