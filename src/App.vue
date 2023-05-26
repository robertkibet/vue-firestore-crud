<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Cities of the World</RouterLink>
      </nav>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
  <footer>
    <div class="wrapper">
      <p>
        Made with <span class="heart">♥</span> by<a href="https://github.com/robertkibet"
          >@robertkibet on GitHub</a
        >
      </p>
      <a href="https://kibet.me/">My Portfolio</a>
    </div>
  </footer>
</template>
