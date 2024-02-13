<script setup>
const qryTestimonials = groq`
  *[_type == "testimonials"][0]{
    title,
    headline,
    clients[]->{
      'fullName': firstName + ' ' + lastName,
      rating,
      testimonial,
      role,
      'imageUrl':image.asset->url
    }
  }
`;
const { data: testimonials } = useSanityQuery(qryTestimonials);
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
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="client in testimonials.clients">
            <div class="testimonial-item">
              <div class="stars">
                <i
                  class="fa fa-star"
                  v-for="n in Array(client.rating).fill().length"
                ></i>
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
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>
