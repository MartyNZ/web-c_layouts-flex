<script setup>
const route = useRoute();

const qryPage = groq`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    title,
    'slug':slug.current,
    body,
    sections[]->{
      _id,
      'slug':slug.current,
    }
  }
`;

const { data: page, error } = useSanityQuery(qryPage, {
  slug: route.params.slug,
});

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
  <section v-if="page">
    <div
      class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:px-6"
    >
      <div class="container mt-5 text-justify">
        <h2 class="my-3 px-6">
          {{ page.title }}
        </h2>
        <SanityContent :blocks="page.body"></SanityContent>
      </div>
    </div>
  </section>
  <Section v-if="page" :page="page" />
</template>
