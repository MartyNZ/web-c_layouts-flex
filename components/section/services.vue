<script setup>
const qryServices = groq`
  *[_type == "services"][0]{
    title,
    headline,
    'slug':slug.current,
    services[]{
      title,
      _key,
      icon,
      'colourHex':colour.hex,
      summary
    }
  }
`;
const { data: services } = useSanityQuery(qryServices);
</script>

<template>
  <section id="services" class="services">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ services.title }}</h2>
        <p>{{ services.headline }}</p>
      </header>

      <div class="row gy-4">
        <div
          v-for="item in services.services"
          class="col-lg-4 col-md-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            class="service-box"
            :style="`border-bottom: 3px solid ${item.colourHex};`"
            :onmouseover="`this.style='background-color:${item.colourHex}'`"
            :onmouseout="`this.style='background-color:inherit;border-bottom:3px solid ${item.colourHex};'`"
          >
            <i
              class="ri-discuss-line icon"
              :style="`color:${item.colourHex}`"
            ></i>
            <h3>{{ item.title }}</h3>
            <p>
              {{ item.summary }}
            </p>
            <a href="#" class="read-more"
              ><span>Read More</span> <i class="bi bi-arrow-right"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
