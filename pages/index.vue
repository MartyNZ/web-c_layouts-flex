<script setup>
const route = useRoute();
const qryHomepage = groq`
  *[_type == 'homepage'][0]{
    sections[]->{
      _id,
      'slug':slug.current
    }
  }
`;
const { data: page } = useSanityQuery(qryHomepage);
</script>
<template>
  <SectionHero v-if="route.path === '/'" />
  <template v-for="section in page.sections" :key="section._id">
    <SectionAbout v-if="section.slug == 'about'" />
    <SectionValues v-if="section.slug == 'our-values'" />
    <section-counts v-if="section.slug == 'counts'" />
    <SectionFeatures v-if="section.slug == 'features'" />
    <SectionServices v-if="section.slug == 'services'" />
    <SectionPricing v-if="section.slug == 'pricing'" />
    <SectionFaq v-if="section.slug == 'faq'" />
    <SectionPortfolio v-if="section.slug == 'portfolio'" />
    <SectionTeam v-if="section.slug == 'team'" />
    <SectionTestimonials v-if="section.slug == 'testimonials'" />
    <SectionClients v-if="section.slug == 'our-clients'" />
    <SectionBlogRecentPosts v-if="section.slug == 'recent-blog-posts'" />
  </template>
</template>
