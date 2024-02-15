<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const qryHero = groq`
  *[_type=='hero'][0]{
    title,
    content,
    'bgImageUrl':bgImage.asset->url,
    'imageId':image.asset->_id,
    'slug':slug.current,
  }
`;
const { data: hero } = useSanityQuery(qryHero);
</script>

<template>
  <section
    id="hero"
    class="hero d-flex align-items-center"
    :style="`background-image: url(${hero.bgImageUrl})`"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">
            {{ hero.title }}
          </h1>
          <div class="h2" data-aos="fade-up" data-aos-delay="400">
            <SanityContent :blocks="hero.content" />
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            <div class="text-center text-lg-start">
              <a
                href="#about"
                class="btn-get-started scrollto d-inline-flex align-items-center gap-2 justify-content-center align-self-center"
              >
                <span>Get Started</span>
                <ClientOnly
                  ><FontAwesomeIcon
                    :icon="['fal', 'arrow-right']"
                  ></FontAwesomeIcon
                ></ClientOnly>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
          <SanityImage
            :asset-id="hero.imageId"
            class="img-fluid"
            :alt="hero.title"
          />
        </div>
      </div>
    </div>
  </section>
</template>
