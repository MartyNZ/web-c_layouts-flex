<script setup>
const qryPortfolioItem = groq`
  *[_type == "portfolioItem"][0]{
    title,
    'slug':slug.current,
    body,
    projectUrl,
    client,
    'category':category->title,
    date,
    images[]{
      _key,
      'imageId':asset->_id
    }
  }`;
const { data: portfolioItem } = useSanityQuery(qryPortfolioItem);
</script>

<template>
  <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-8">
          <ClientOnly>
            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">
                <div
                  class="swiper-slide"
                  v-for="image in portfolioItem.images"
                  :key="image._key"
                >
                  <SanityImage
                    :asset-id="image.imageId"
                    :alt="portfolioItem.title"
                  />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </ClientOnly>
        </div>

        <div class="col-lg-4">
          <div class="portfolio-info">
            <h3>Project information</h3>
            <ul>
              <li><strong>Category</strong>: {{ portfolioItem.category }}</li>
              <li><strong>Client</strong>: {{ portfolioItem.client }}</li>
              <li><strong>Project date</strong>: {{ portfolioItem.date }}</li>
              <li>
                <strong>Project URL</strong>:
                <NuxtLink
                  :target="`${portfolioItem.projectUrl.newWindow} ? '_blank' : '_top'`"
                  :to="portfolioItem.projectUrl.url"
                  >{{ portfolioItem.projectUrl.title }}</NuxtLink
                >
              </li>
            </ul>
          </div>
          <SanityContent
            :blocks="portfolioItem.body"
            class="portfolio-description"
          />
        </div>
      </div>
    </div>
  </section>
</template>
