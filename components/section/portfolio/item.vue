<script setup>
const props = defineProps({
  portfolioItem: {
    type: Any,
    required: true,
  },
});

// const qryPortfolioItem = groq`
//   *[_type == "portfolioItem"][0]{
//     title,
//     'slug':slug.current,
//     body,
//     projectUrl,
//     client,
//     'category':category->title,
//     date,
//     images[]{
//       _key,
//       'imageId':asset->_id,
//       'imageUrl':asset->url
//     }
//   }`;
// const { data: portfolioItem } = useSanityQuery(qryPortfolioItem);

const visibleRef = ref(false);
const indexRef = ref(0);
const imgs = reactive([]); // Initialize as empty array
const fullImageUrls = reactive([]);

watchEffect(() => {
  if (props.portfolioItem && props.portfolioItem.images) {
    // console.log("Current portfolioItem:", JSON.stringify(portfolioItem.value));
    if (props.portfolioItem.images) {
      imgs.splice(
        0,
        imgs.length,
        ...props.portfolioItem.images.map((image) => image.imageId)
      );
      fullImageUrls.splice(
        0,
        fullImageUrls.length,
        ...props.portfolioItem.images.map((image) => image.imageUrl)
      );
    } else {
      console.log("No images found in portfolioItem.");
    }
  } else {
    console.log("portfolioItem is null.");
  }
});

// const onPrev = (oldIndex, newIndex) => {
//   console.log("when prev btn click ----");
//   console.log("oldIndex of imgs:", oldIndex);
//   console.log("newIndex of imgs:", newIndex);
// };

// const onNext = (oldIndex, newIndex) => {
//   console.log("when next btn click ----");
//   console.log("oldIndex of imgs:", oldIndex);
//   console.log("newIndex of imgs:", newIndex);
// };
const onShow = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => {
  visibleRef.value = false;
};
</script>

<template>
  <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="col-lg-8 p-5">
        <ClientOnly>
          <Carousel
            class="gallery portfolio-details-slider swiper"
            :wrap-around="true"
            :autoplay="6000"
            :items-to-show="1"
            :pauseAutoplayOnHover="true"
          >
            <Slide
              v-for="(img, idx) in imgs"
              :key="idx"
              class="pic swiper-slide"
              @click="() => onShow(idx)"
              style="450px"
            >
              <SanityImage :asset-id="img" :alt="portfolioItem.title" />
            </Slide>
            <template #addons> <Pagination /></template>
          </Carousel>
        </ClientOnly>

        <ClientOnly>
          <VueEasyLightbox
            :visible="visibleRef"
            :index="indexRef"
            :imgs="fullImageUrls"
            @hide="onHide"
            @on-prev="onPrev"
            @on-next="onNext"
          />
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
        <div class="portfolio-description">
          <SanityContent :blocks="portfolioItem.body" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.gallery {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.pic {
  cursor: pointer;
  margin-right: 8px;
}
.carousel__pagination-button::after {
  width: 8px;
  height: 8px;
  border-radius: 4px;
}
</style>
