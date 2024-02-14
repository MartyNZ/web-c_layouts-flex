<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <pre>{{ item }}</pre>
</template>
