<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryHeaders = groq`
*[_type == "blog"][0]{
    'imageId':image.asset->_id,
    title,
    headline,
    'slug':slug.current
  }`;
const { data: headers } = useSanityQuery(qryHeaders);
const qryPosts = groq`
  * [_type == 'blogPost'] | order(publishedDate)[0...3]{
    _id,
    'slug':slug.current,
    title,
    'imageId':image.asset->_id,
    tags,
    categories,
    authors,
    publishedDate,
    body
  }
`;

const { data: posts } = useSanityQuery(qryPosts);
</script>

<template>
  <section id="recent-blog-posts" class="recent-blog-posts">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ headers.title }}</h2>
        <p>{{ headers.headline }}</p>
      </header>

      <div class="row">
        <div class="col-lg-4" v-for="post in posts" :key="post._id">
          <div class="post-box">
            <div class="post-img">
              <SanityImage
                :asset-id="post.imageId"
                class="img-fluid"
                :alt="post.title"
              />
            </div>
            <span class="post-date">{{ post.publishedDate }}</span>
            <h3 class="post-title">
              {{ post.title }}
            </h3>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="readmore stretched-link mt-auto d-flex-inline gap-2"
              ><span>Read More</span>
              <ClientOnly>
                <FontAwesomeIcon :icon="['fal', 'fa-arrow-right']" />
              </ClientOnly>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
