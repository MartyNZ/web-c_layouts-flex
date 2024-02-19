<script setup>
const qryBlogCategories = groq`
  *[_type == "blogCategory"][]{
    _id,
    categoryName
  }
  `;
const { data: blogCat } = useSanityQuery(qryBlogCategories);
</script>

<template>
  <h3 class="sidebar-title">Categories</h3>
  <div class="sidebar-item categories">
    <ul>
      <li v-for="cat in blogCat" :key="cat._id">
        <!-- <a href="#">{{ cat.categoryName }} <span>(25)</span></a> -->
        {{ cat.categoryName }}
      </li>
    </ul>
  </div>
</template>
