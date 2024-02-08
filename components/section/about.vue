<script setup>
const qryAbout = groq`
  *[_type == 'about' ][0]{
    'slug':slug.current,
    'img':image.asset._ref,
    body,
    headline,
    title,
    cta
  }`;
const { data: about } = useSanityQuery(qryAbout);
</script>
<template>
  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <div class="row gx-0">
        <div
          class="col-lg-6 d-flex flex-column justify-content-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="content">
            <h3>{{ about.title }}</h3>
            <h2>
              {{ about.headline }}
            </h2>
            <SanityContent :blocks="about.body" />
            <div class="text-center text-lg-start">
              <a
                href="#"
                class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
              >
                <span>Read More</span>
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div
          class="col-lg-6 d-flex align-items-center"
          data-aos="zoom-out"
          data-aos-delay="200"
        >
          <SanityImage :asset-id="about.img" auto="format" class="img-fluid" />
        </div>
      </div>
    </div>
  </section>
</template>
