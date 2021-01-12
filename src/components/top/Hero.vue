<template>
  <div class="hero-container relative bg-white overflow-hidden row">
    <main class='pt-64'>
      <div class="container hero-box">
        <t-tag :text="title" class='text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          {{ this.onTopPageTitle() }}
        </t-tag>
        <t-tag :text="description" tag-name="p" variant="body" class='pt-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          {{ this.onTopPageSubTitle() }}
        </t-tag>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    onTopPageTitle: function() {
      if(this.$route.name === 'staff') {
        this.title = 'ひとりひとりが主体的に取り組むプログラミング道場'
      } else {
        this.title = '子どもが活躍できる場づくりを目指しています。'
      }
    },
    onTopPageSubTitle: function() {
      if(this.$route.name === 'staff') {
        this.description = 'Corder Dojoはプログラミングをして、作成したゲームやアニメーションなどの作品を発表ができる場です。おおくのひとに頑張りをみてもらうことができるのと、フィードバックを得ることによって更により良い作品づくりを促せます。'
      } else {
        this.description = 'プログラミングをして作成したゲームやアニメーションなどの作品を発表ができる場です。多くの人に頑張りを見てもことができるのと、フィードバックを得ることによって更によりよい作品づくりを促せます。'
      }
    }
  }
}
</script>

<style scoped>
main { width: 100%; }
.hero-box {
  background: #fff;
  opacity: 0.8;
  width: 640px;
}
.hero-container {
  background: url('../../assets/person-using-macbook-pro-on-person-s-lap-1181298.jpg') no-repeat right bottom;
  background-size: contain;
  margin: 0 auto;
  height: 640px;
  width: 100%;
}
</style>
