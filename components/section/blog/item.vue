<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section id="blog" class="blog">
    <div class="container" data-aos="fade-up">
      <div class="row">
        <div class="col-lg-8 entries">
          <article class="entry entry-single">
            <div class="entry-img">
              <SanityImage
                :asset-id="post.imageId"
                :alt="post.title"
                class="img-fluid"
              />
            </div>

            <h2 class="entry-title">
              {{ post.title }}
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

            <div class="enter-content">
              <SanityContent :blocks="post.body" />
            </div>

            <div class="entry-footer">
              <ClientOnly>
                <FontAwesomeIcon icon="fa-light fa-folder"></FontAwesomeIcon>
              </ClientOnly>
              <ul class="cats">
                <li v-for="cat in post.categories" :key="cat._id">
                  <a href="#">{{ cat.categoryName }}</a>
                </li>
              </ul>

              <ClientOnly>
                <FontAwesomeIcon icon="fal fa-tags"></FontAwesomeIcon>
              </ClientOnly>
              <ul class="tags">
                <li v-for="tag in post.tags" :key="tag._id">
                  <a href="#">{{ tag.label }}</a>
                </li>
              </ul>
            </div>
          </article>
          <!-- End blog entry -->

          <div
            v-for="author in post.authors"
            :key="author._id"
            class="blog-author d-flex align-items-center"
          >
            <SanityImage
              :asset-id="author.imageId"
              class="rounded-circle float-left"
              :alt="author.fullName"
            />
            <div>
              <h4>{{ author.fullName }}</h4>
              <div class="social-links">
                <template
                  v-for="connection in author.socialConnections"
                  :key="connection._key"
                >
                  <NuxtLink
                    :to="`${connection.url}${connection.username}`"
                    target="_blank"
                    :class="
                      connection._type === 'x-twitter'
                        ? 'twitter'
                        : connection._type
                    "
                  >
                    <ClientOnly>
                      <FontAwesomeIcon
                        :icon="['fab', connection._type]"
                      ></FontAwesomeIcon> </ClientOnly
                  ></NuxtLink>
                </template>
              </div>

              <SanityContent :blocks="author.bio" />
            </div>
          </div>
          <!-- End blog author bio -->
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
