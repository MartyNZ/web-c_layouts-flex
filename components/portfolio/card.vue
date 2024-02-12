<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: toWebRequest,
  },
});
</script>
<template>
  <pre>{{ item }}</pre>
</template>
