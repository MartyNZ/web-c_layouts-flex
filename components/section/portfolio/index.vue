<script setup>
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
const { data: portfolio } = useSanityQuery(qryPortfolio);

const qryCategories = groq`
  *[_type == "portfolioCategory"][]{
    _id,
    title,
    'slug':slug.current
}`;
const { data: categories } = useSanityQuery(qryCategories);
</script>

<template>
  <section id="portfolio" class="portfolio">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ portfolio.title }}</h2>
        <p>{{ portfolio.headline }}</p>
      </header>

      <div class="row" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-12 d-flex justify-content-center">
          <ul id="portfolio-filters">
            <li data-filter="*" class="filter-active">All</li>
            <!-- <pre>{{ categories }}</pre> -->
            <li
              v-for="item in categories"
              :key="item._id"
              :data-filter="`.filter-${item.slug}`"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="row gy-4 portfolio-container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          v-for="item in portfolio.items"
          :key="item._id"
          :class="`col-lg-4 col-md-6 portfolio-item filter-${item.category.slug}`"
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
                <a
                  :href="item.firstImageUrl"
                  data-gallery="portfolioGallery"
                  class="portfolio-lightbox"
                  :title="item.title"
                  ><i class="fa fa-plus"></i
                ></a>
                <NuxtLink :to="`/portfolio/${item.slug}`" title="More Details"
                  ><i class="fa fa-link"></i
                ></NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
