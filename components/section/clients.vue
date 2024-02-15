<script setup>
const qryClients = groq`
  *[_type == "clients"][0]{
    title,
    headline,
    clients[]{
      name,
      _key,
      'logoId':logo.asset->_id
    }
  }
`;
const { data: clients } = useSanityQuery(qryClients);

const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  //1280 and up
  1280: {
    itemsToShow: 7,
    snapAlign: "start",
  },
});
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
});
</script>

<template>
  <section id="clients" class="clients">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ clients.title }}</h2>
        <p>{{ clients.headline }}</p>
      </header>

      <ClientOnly>
        <Carousel
          :breakpoints="breakpoints"
          :settings="settings"
          :wrap-around="true"
          :autoplay="6000"
          class="clients-slider swiper"
        >
          <Slide
            class="swiper-slide"
            v-for="client in clients.clients"
            :key="client._key"
            style="width: 116px; margin-right: 120px"
          >
            <SanityImage
              :asset-id="client.logoId"
              class="img-fluid"
              :alt="client.name"
            />
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
        <template #fallback>
          <ul>
            <li v-for="item in clients.clients" :key="item._id">
              {{ item.title }}
            </li>
          </ul>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
<style>
.carousel__pagination-button::after {
  width: 8px;
  height: 8px;
  border-radius: 4px;
}
</style>
