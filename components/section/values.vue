<script setup>
const qryValues = groq`
*[_type == "values"][0]{
  title,
  headline,
  'slug':slug.current,
  valuesList[]{
    _key,
    title,
    summary,
    'imageId':image.asset->_id
  }
}`;
const { data: values } = useSanityQuery(qryValues);
</script>
<template>
  <section id="values" class="values">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ values.title }}</h2>
        <p>{{ values.headline }}</p>
      </header>

      <div class="row">
        <div
          class="col-lg-4"
          data-aos="fade-up"
          :data-aos-delay="`${200 * (index + 1)}`"
          v-for="(value, index) in values.valuesList"
          :key="value._key"
        >
          <div class="box">
            <SanityImage
              :asset-id="value.imageId"
              class="img-fluid"
              :alt="value.title"
            />
            <h3>{{ value.title }}</h3>
            <p>
              {{ value.summary }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
