<script setup>
import select from "../../utils/select";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

onMounted(() => {
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };

    window.addEventListener("scroll", toggleBacktotop);

    // Clean up the event listener when the component is unmounted
    onUnmounted(() => {
      window.removeEventListener("scroll", toggleBacktotop);
    });
  }
});
</script>
<template>
  <a
    href="#"
    class="back-to-top d-flex align-items-center justify-content-center"
    ><ClientOnly>
      <FontAwesomeIcon icon="fal fa-arrow-up"></FontAwesomeIcon> </ClientOnly
  ></a>
</template>
