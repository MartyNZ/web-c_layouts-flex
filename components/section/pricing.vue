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
            <h3 style="color: #07d5c0">{{ item.cardTitle }}</h3>
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

        <!-- <div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
          <div class="box">
            <span class="featured">Featured</span>
            <h3 style="color: #65c600">Starter Plan</h3>
            <div class="price"><sup>$</sup>19<span> / mo</span></div>
            <img
              src="assets/img/pricing-starter.png"
              class="img-fluid"
              alt=""
            />
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li class="na">Massa ultricies mi</li>
            </ul>
            <a href="#" class="btn-buy">Buy Now</a>
          </div>
        </div>

        <div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
          <div class="box">
            <h3 style="color: #ff901c">Business Plan</h3>
            <div class="price"><sup>$</sup>29<span> / mo</span></div>
            <img
              src="assets/img/pricing-business.png"
              class="img-fluid"
              alt=""
            />
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li>Massa ultricies mi</li>
            </ul>
            <a href="#" class="btn-buy">Buy Now</a>
          </div>
        </div>

        <div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="400">
          <div class="box">
            <h3 style="color: #ff0071">Ultimate Plan</h3>
            <div class="price"><sup>$</sup>49<span> / mo</span></div>
            <img
              src="assets/img/pricing-ultimate.png"
              class="img-fluid"
              alt=""
            />
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li>Massa ultricies mi</li>
            </ul>
            <a href="#" class="btn-buy">Buy Now</a>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>
