<template>
  <div class="flex-column h-100">
    <the-header></the-header>
    <the-hero></the-hero>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheHero from "./components/landing/TheHero.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheHero,
    TheFooter,
  },
};
</script>

<style>
</style>
