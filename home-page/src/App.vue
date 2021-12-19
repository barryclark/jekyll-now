<template>
  <div class="flex-column h-100">
    <the-header></the-header>
    <the-hero></the-hero>
    <cpk-page></cpk-page>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheHero from "./components/layout/TheHero.vue";
import TheFooter from "./components/layout/TheFooter.vue";

import CpkPage from "./components/cpk/CpkPage.vue";

export default {
  components: {
    TheHeader,
    TheHero,
    TheFooter,
    CpkPage,
  },
};
</script>

<style>
</style>
