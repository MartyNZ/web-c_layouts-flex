<script setup>
const qryPricing = groq`
  *[_type == "pricing"][0]{
    title,
    headline,
    priceCards[]{
      _key,
      cardTitle,
      body,
      button,
      'imgId':image.asset->_id,
      price,
      isFeatured,
    }
  }
`;
const { data: pricing } = useSanityQuery(qryPricing);
</script>

<template>
  <section id="pricing" class="pricing">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ pricing.title }}</h2>
        <p>{{ pricing.headline }}</p>
      </header>

      <div class="row gy-4" data-aos="fade-left">
        <div
          v-for="item in pricing.priceCards"
          :key="item._key"
          class="col-lg-3 col-md-6"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div class="box">
            <span v-if="item.isFeatured" class="featured">Featured</span>
            <h3 style="color: #4154f1">{{ item.cardTitle }}</h3>
            <div class="price">
              <sup>$</sup>{{ item.price }}<span> / mo</span>
            </div>
            <SanityImage
              :asset-id="item.imgId"
              class="img-fluid"
              alt="{{ item.cardTitle }}"
            />
            <SanityContent :blocks="item.body" />
            <NuxtLink to="#" class="btn-buy">Buy Now</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
