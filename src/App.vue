<template>
  <div>
    <Header />
    <Hero />
    <SecondHero />
    <ThirdContainer />
    <FourthContainer />
    <FifthContainer />
    <SixthContainer />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import SecondHero from './components/SecondHero.vue'
import ThirdContainer from './components/ThirdContainer.vue'
import FourthContainer from './components/FourthContainer.vue'
import FifthContainer from './components/FifthContainer.vue'
import SixthContainer from './components/SixthContainer.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    SecondHero,
    ThirdContainer,
    FourthContainer,
    FifthContainer,
    SixthContainer,
    Footer
  }
}
</script>

<style>
body {
  color: #0F0F0F;
  font-family: Nanum Gothic;
}
h1 {
  font-size: initial;
  line-height: initial;
  margin: initial;
}
</style>
