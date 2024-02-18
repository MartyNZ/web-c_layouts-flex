<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const qryPortfolio = groq`
*[_type == "portfolio"][0]{
    title,
    headline,
    items[]->{
      _id,
      'slug':slug.current,
      title,
      client,
      projectUrl,
      images,
      'firstImageId':images[0].asset->_id,
      'firstImageUrl':images[0].asset->url,
      category->{
        title,
        'slug':slug.current
      },
      body,
    }
  }
`;
const { data: portfolio, error } = useSanityQuery(qryPortfolio);

const qryCategories = groq`
  *[_type == "portfolioCategory"][]{
    _id,
    title,
    'slug':slug.current
}`;
const { data: categories } = useSanityQuery(qryCategories);

// Handle errors
onErrorCaptured((err) => {
  console.error("An error occurred:", err);
  return true; // Prevent the error from propagating further
});

// Check if portfolio data is available
const items = computed(() => portfolio.value?.items || []);

const activeFilter = ref("*"); // Default active filter

// Computed property for filtered items
const filteredItems = computed(() => {
  // If the active filter is '*', show all items
  if (activeFilter.value === "*") {
    return items.value;
  }

  // Otherwise, filter items based on the active category slug
  return items.value.filter(
    (item) => item.category.slug === activeFilter.value
  );
});

// Function to set the active filter
function setActiveFilter(filter) {
  activeFilter.value = filter;
}
</script>

<template>
  <section id="portfolio" class="portfolio">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ portfolio.title }}</h2>
        <p>{{ portfolio.headline }}</p>
      </header>

      <!-- Filters -->
      <div class="row" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-12 d-flex justify-content-center">
          <ul id="portfolio-filters">
            <li
              @click="setActiveFilter('*')"
              :class="{ 'filter-active': activeFilter === '*' }"
            >
              All
            </li>
            <li
              v-for="item in categories"
              :key="item._id"
              @click="setActiveFilter(item.slug)"
              :class="{ 'filter-active': activeFilter === item.slug }"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Items list -->
      <div
        class="row gy-4 portfolio-container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          v-for="item in filteredItems"
          :key="item._id"
          :class="`col-lg-4 col-md-6 portfolio-item ${item.category.slug}`"
        >
          <div class="portfolio-wrap">
            <SanityImage
              :asset-id="item.firstImageId"
              class="img-fluid"
              :alt="item.title"
            />
            <div class="portfolio-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category.title }}</p>
              <div class="portfolio-links">
                <NuxtLink
                  :to="item.firstImageUrl"
                  data-gallery="portfolioGallery"
                  class="portfolio-lightbox"
                  :title="item.title"
                  ><ClientOnly>
                    <FontAwesomeIcon icon="fal fa-plus"></FontAwesomeIcon>
                  </ClientOnly>
                </NuxtLink>
                <NuxtLink :to="`/portfolio/${item.slug}`" title="More Details"
                  ><ClientOnly>
                    <FontAwesomeIcon icon="fal fa-link">
                    </FontAwesomeIcon> </ClientOnly
                ></NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
