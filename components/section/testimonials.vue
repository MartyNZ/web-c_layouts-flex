<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryTestimonials = groq`
  *[_type == "testimonials"][0]{
    title,
    headline,
    clients[]->{
      _id,
      'fullName': firstName + ' ' + lastName,
      rating,
      testimonial,
      role,
      'imageUrl':image.asset->url,
      'imageId':image.asset->_id
    }
  }
`;
const { data: testimonials } = useSanityQuery(qryTestimonials);
const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  //1280 and up
  1280: {
    itemsToShow: 4,
    snapAlign: "start",
  },
});
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
});
</script>

<template>
  <section id="testimonials" class="testimonials">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ testimonials.title }}</h2>
        <p>{{ testimonials.headline }}</p>
      </header>

      <div
        class="testimonials-slider swiper"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <ClientOnly>
          <Carousel
            :breakpoints="breakpoints"
            :settings="settings"
            :autoplay="6000"
            :wrap-around="true"
          >
            <Slide v-for="client in testimonials.clients" :key="client._id">
              <div class="testimonial-item">
                <div class="stars">
                  <ClientOnly>
                    <FontAwesomeIcon
                      icon="fal fa-star"
                      v-for="n in Array(client.rating).fill().length"
                    ></FontAwesomeIcon>
                  </ClientOnly>
                </div>
                <SanityContent :blocks="client.testimonial" />
                <div class="profile mt-auto">
                  <img
                    :src="client.imageUrl"
                    class="testimonial-img"
                    :alt="client.fullName"
                  />
                  <h3>{{ client.fullName }}</h3>
                  <h4>{{ client.role }}</h4>
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
.swiper-cards {
  width: 240px;
  height: 240px;
}
.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>
