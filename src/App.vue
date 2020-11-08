<template>
  <Header />
  <Hero msg="Welcome to Your Vue.js App" />
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero
  }
}
</script>

<style>
body {
  font-family: Nanum Gothic;
}
h1 {
  font-size: initial;
  line-height: initial;
  margin: initial;
}
</style>
