<template>
  <div>
    <Header  />
    <router-view/>
    <router-view name="sec"/>
    <router-view name="third"/>
    <router-view name="fourth"/>
    <router-view name="fifth"/>
    <router-view name="sixth"/>
    <router-view name="seventh"/>
    <router-view name="eighth"/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
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
