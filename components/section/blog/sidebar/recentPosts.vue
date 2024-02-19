<script setup>
const qryPosts = groq`
  * [_type == 'blogPost'] | order(publishedDate)[0...5]{
    _id,
    'slug':slug.current,
    title,
    'imageId':image.asset->_id,
    tags[]->{
      tag
    },
    categories,
    authors,
    publishedDate,
    body
  }
`;

const { data: posts } = useSanityQuery(qryPosts);
</script>
<template>
  <h3 class="sidebar-title">Recent Posts</h3>
  <div class="sidebar-item recent-posts">
    <div v-for="post in posts" :key="post._id" class="post-item clearfix">
      <SanityImage :asset-id="post.imageId" :alt="post.title" />
      <h4>
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </h4>
      <time :datetime="post.publishedDate">{{ post.publishedDate }}</time>
    </div>
  </div>
</template>
