<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryCounters = groq`
  *[_type == "counters"][0]{
    title,
    counters[]{
      title,
      count,
      icon{
        'name':provider +'-'+ name,
        style
      }
    }
  }
`;
const { data: counts } = useSanityQuery(qryCounters);

onMounted(() => {
  new PureCounter();
});
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
            <ClientOnly>
              <FontAwesomeIcon
                :icon="[count.icon.style, count.icon.name]"
                style="height: 4em; padding-end: 1em; color: #4154f1"
              ></FontAwesomeIcon
            ></ClientOnly>
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
