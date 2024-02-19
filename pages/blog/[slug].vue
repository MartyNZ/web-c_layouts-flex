<script setup>
const route = useRoute();

const qryBlogPost = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    body,
    tags[]{
      _key,
      label
    },
    'imageId':image.asset->_id,
    categories[]->{
      categoryName
      },
    publishedDate,
    'slug':slug.current,
    title,
    authors[]->{
      _id,
      'fullName': firstName + ' ' + lastName,
      'imageId':image.asset->_id,
      'slug':slug.current,
      bio,
      socialConnections
    }
  }
`;
const { data: post } = useSanityQuery(qryBlogPost, {
  slug: route.params.slug,
});
</script>
<template>
  <AppBreadcrumbs />
  <SectionBlogItem v-if="post" :post="post" />
</template>
