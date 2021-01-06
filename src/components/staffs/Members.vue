<template>
  <div class="hero-container relative bg-white overflow-hidden row">
    <main class='pt-64'>
      <div class="container hero-box">
        <div class="rounded-full h-48 w-48 flex items-center justify-center">
          <img class="bg-contain" src="../../assets/members/placeholder.png" />
        </div>
        <span class="inline-flex items-center px-3 rounded-full text-l bg-orange-500 font-medium leading-4 text-white">立川チャンピオン</span>
        <span class="inline-flex items-center px-3 rounded-full text-m bg-orange-500 font-medium leading-4 text-white">立川チャンピオン</span>        <t-tag variant="heading" class='text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          子どもが活躍できる場づくりを目指しています。
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          プログラミングをして作成したゲームやアニメーション
          などの作品を発表ができる場です。
          多くの人に頑張りを見てもことができるのと、
          フィードバックを得ることによって更によりよい作品づくりを促せます。
        </t-tag>
      </div>
    </main>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  font-size: 18px;
  height: initial;
}
nav {
  background: initial;
  box-shadow: initial;
  color: #0F0F0F;;
  display: flex;
  flex-direction: column;
  height: initial;
  justify-content: center;
}
@media screen and (min-width: 1020px) and (max-width: 1275px) {
  nav {
    display: flex;
  }
}
@media screen and (min-width: 620px) and (max-width: 1020px) {
  nav {
    display: block;
  }
}
h1 {
  font-size: initial;
  line-height: initial;
  margin: initial;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.footer {
  background-color: #fff;
  color: #0F0F0F;
  margin-bottom: initial;
  z-index: 100;
  box-shadow: 0 -3px -1px 2px rgba(0,0,0,0.12);
}
.inner-icon {
  margin: 12px;
}
.line-img {
  height: 32px;
}
.router-link {
  color: #000;
  font-size: 1em;
}
.square-icon {
  height: 36px;
  width: 36px;
}
.copyright {
  font-size: 1em;
}
</style>
