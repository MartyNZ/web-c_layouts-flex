<script setup>
const qryCounters = groq`
  *[_type == 'counters' ][0]{
    'slug':slug.current,
    title,
    counters
  }
`;
const { data: counts } = useSanityQuery(qryCounters);
</script>
<template>
  <section id="counts" class="counts">
    <div class="container" data-aos="fade-up">
      <div class="row gy-4">
        <div
          class="col-lg-3 col-md-6"
          v-for="count in counts.counters"
          :key="count._key"
        >
          <div class="count-box">
            <i
              :class="`${count.icon.provider}-${count.icon.style} ${count.icon.name}`"
              style="height: 4em; padding-end: 1em; color: blue"
            ></i>
            <div>
              <span
                data-purecounter-start="0"
                :data-purecounter-end="count.count"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>{{ count.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
