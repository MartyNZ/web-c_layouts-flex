<script setup>
const qryTags = groq`
  *[_type == 'tag']
`;
const { data: tags } = useSanityQuery(qryTags);
</script>
<template>
  <h3 class="sidebar-title">Tags</h3>
  <div class="sidebar-item tags">
    <ul>
      <li v-for="tag in tags" :key="tag._id">
        <a href="#">{{ tag.tag }}</a>
      </li>
    </ul>
  </div>
</template>
