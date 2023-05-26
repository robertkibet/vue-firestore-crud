<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/AppFooter.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <h2>Cities of the World</h2>
        </RouterLink>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="content">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>
