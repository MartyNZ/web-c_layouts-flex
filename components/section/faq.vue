<script setup>
const qryFaq = groq`
  *[_type == "faq"][0]{
    title,
    questions
  }
`;
const { data: faq } = useSanityQuery(qryFaq);
</script>
<template>
  <section id="faq" class="faq">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>F.A.Q</h2>
        <p>{{ faq.title }}</p>
      </header>

      <div class="row">
        <div class="col-lg-12 mx-0.5">
          <!-- F.A.Q List 1-->
          <div
            v-for="item in faq.questions"
            :key="item._key"
            class="accordion accordion-flush"
            :id="`faqlist${item._key}`"
          >
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#faq-content-${item._key}`"
                >
                  {{ item.question }}
                </button>
              </h2>
              <div
                :id="`faq-content-${item._key}`"
                class="accordion-collapse collapse"
                :data-bs-parent="`#faqlist${item._key}`"
              >
                <div class="accordion-body">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
