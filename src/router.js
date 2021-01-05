import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Hero from './components/Hero.vue'
import SecondHero from './components/SecondHero.vue'
import ThirdContainer from './components/ThirdContainer.vue'
import FourthContainer from './components/FourthContainer.vue'
import FifthContainer from './components/FifthContainer.vue'
import SixthContainer from './components/SixthContainer.vue'
import SeventhContainer from './components/SeventhContainer.vue'
import EighthContainer from './components/EighthContainer.vue'
import SupportFirstContainer from './components/SupportFirstContainer.vue'
import SupportSecondContainer from './components/SupportSecondContainer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Hero,
        sec: SecondHero,
        third: ThirdContainer,
        fourth: FourthContainer,
        fifth: FifthContainer,
        sixth: SixthContainer,
        seventh: SeventhContainer,
        eighth: EighthContainer
      }
    },
    {
      path: '/staffs',
      name: 'staff',
      component: App
    },
    {
      path: '/members',
      name: 'member',
      component: App
    },
    {
      path: '/events',
      name: 'events',
      component: App
    },
    {
      path: '/support',
      name: 'support',
      components: {
        default: SupportFirstContainer,
        sec: SupportSecondContainer
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: App
    },
    {
      path: '/Product',
      name: 'Product',
      component: App,
      children: [
        {
          path: 'A',
          component: SupportFirstContainer
        },
        {
          path: 'B',
          component: SupportSecondContainer
        }
      ]
    }
  ]
})
