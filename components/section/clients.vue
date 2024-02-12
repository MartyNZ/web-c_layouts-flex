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
</script>

<template>
  <section id="clients" class="clients">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ clients.title }}</h2>
        <p>{{ clients.headline }}</p>
      </header>

      <div class="clients-slider swiper">
        <div class="swiper-wrapper align-items-center">
          <div
            class="swiper-slide"
            v-for="client in clients.clients"
            :key="client._key"
          >
            <SanityImage
              :asset-id="client.logoId"
              class="img-fluid"
              :alt="client.name"
            />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>
