<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue'
import IconHome from './icons/IconHome.vue'
import { RouterLink } from 'vue-router'

defineProps({
  loading: Boolean,
  hideNew: Boolean
})
</script>

<template>
  <div class="header">
    <RouterLink to="/" class="header-left">
      <IconHome />
      <span>Home</span>
    </RouterLink>
    <RouterLink v-if="!loading && !hideNew" to="/cities/add" class="new-city">
      <IconPlus />
      <span>New</span>
    </RouterLink>
    <a href="#" v-if="loading" class="new-city">
      <div class="loader"></div>
    </a>
  </div>
</template>
