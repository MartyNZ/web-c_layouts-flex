<script setup>
const qryPage = groq`
  *[_type == 'contactpage'][0]{
    title,
    'slug':slug.current,
    sections[]->{
      _id,
      'slug':slug.current,
    }
  }
`;
const { data: page, error } = useSanityQuery(qryPage);

// useSeoMeta({
//   title: () => metadata.name,
//   ogTitle: () => metadata.name,
//   ogImage: () => metadata.image,
//   description: () => metadata.description,
//   ogDescription: () => metadata.description,
//   twitterTitle: () => metadata.name,
//   twitterImage: () => metadata.image,
//   twitterDescription: () => metadata.description,
//   twitterCard: "summary_large_image",
// });

// defineOgImage({
//   siteName: metadata.title,
//   component: "default",
//   title: metadata.title,
//   siteLogo: metadata.logoUrl,
//   image: metadata.image,
//   description: metadata.description,
// });
</script>
<template>
  <SectionContact v-if="page" />

  <Section v-if="page" :page="page" />
</template>
