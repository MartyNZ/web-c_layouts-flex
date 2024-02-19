<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryAllPosts = groq`
*[_type == 'blogPost'][]{
    _id,
    'slug':slug.current,
    title,
    'imageId':image.asset->_id,
    tags,
    categories,
    authors[]->{
      _id,
      'fullName': firstName + ' ' + lastName,
      'imageId':image.asset->_id,
      'slug':slug.current,
      bio,
      socialConnections
    },
    publishedDate,
    body
  }
`;
const { data: posts } = useSanityQuery(qryAllPosts);
</script>
<template>
  <section id="blog" class="blog">
    <div class="container" data-aos="fade-up">
      <div class="row">
        <div class="col-lg-8 entries">
          <article
            v-for="post in posts"
            :key="post._id"
            class="entry"
            data-aos="fade-up"
          >
            <div class="entry-img">
              <SanityImage
                :asset-id="post.imageId"
                :alt="post.title"
                class="img-fluid"
              />
            </div>

            <h2 class="entry-title">
              <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
            </h2>

            <div class="entry-meta">
              <ul>
                <li class="d-flex align-items-center gap-1">
                  <template
                    v-for="(author, index) in post.authors"
                    :key="author._id"
                  >
                    <ClientOnly>
                      <FontAwesomeIcon
                        icon="fa-light fa-user"
                      ></FontAwesomeIcon>
                    </ClientOnly>
                    <span v-if="post.authors.length - 1 != index" class="author"
                      >{{ author.fullName }},
                    </span>
                    <span v-else class="author">{{ author.fullName }} </span>
                  </template>
                </li>
                <li class="d-flex align-items-center gap-1">
                  <ClientOnly>
                    <FontAwesomeIcon icon="fa-light fa-clock"></FontAwesomeIcon>
                  </ClientOnly>
                  <time :datetime="post.publishedDate">{{
                    post.publishedDate
                  }}</time>
                </li>
              </ul>
            </div>

            <div class="entry-content">
              <p>
                Similique neque nam consequuntur ad non maxime aliquam quas.
                Quibusdam animi praesentium. Aliquam et laboriosam eius aut
                nostrum quidem aliquid dicta. Et eveniet enim. Qui velit est ea
                dolorem doloremque deleniti aperiam unde soluta. Est cum et quod
                quos aut ut et sit sunt. Voluptate porro consequatur assumenda
                perferendis dolore.
              </p>
              <div class="read-more">
                <NuxtLink :to="`/blog/${post.slug}`">Read more</NuxtLink>
              </div>
            </div>
          </article>

          <!-- <div class="blog-pagination">
            <ul class="justify-content-center">
              <li><a href="#">1</a></li>
              <li class="active"><a href="#">2</a></li>
              <li><a href="#">3</a></li>
            </ul>
          </div> -->
        </div>
        <!-- End blog entries list -->

        <div class="col-lg-4">
          <div class="sidebar">
            <SectionBlogSidebarSearch />

            <SectionBlogSidebarCategoryList />

            <SectionBlogSidebarRecentPosts />

            <SectionBlogSidebarTags />
          </div>
          <!-- End sidebar -->
        </div>
        <!-- End blog sidebar -->
      </div>
    </div>
  </section>
</template>
