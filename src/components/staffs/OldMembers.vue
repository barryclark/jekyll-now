<template>
  <div class="hero-container relative bg-white overflow-hidden row">
    <main class='py-24'>
      <div class="container hero-box">
        <t-tag class='py-8 text-center font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 ml-4'>
          スタッフ紹介
        </t-tag>
        <section class="flex items-center justify-center">
          <div class="rounded-full h-48 w-48 bg-red-300 overflow-hidden">
            <img class="md:object-cover" src="../../assets/members/inocchi.jpg" />
          </div>
          <t-tag class='text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 ml-4'>
            いのっち
          </t-tag>
        </section>

        <article class="text-center">
          <div class="my-4">
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-l bg-orange-500 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-m bg-orange-500 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="inline-flex items-center px-3 rounded-full text-m bg-orange-500 font-medium leading-4 text-white py-1">立川チャンピオン</span>
          </div>
          <div class="my-4">
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-l bg-yellow-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-m bg-yellow-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="inline-flex items-center px-3 rounded-full text-m bg-yellow-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
          </div>
          <div class="my-4">
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-l bg-green-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="mr-4 inline-flex items-center px-3 rounded-full text-m bg-green-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
            <span class="inline-flex items-center px-3 rounded-full text-m bg-green-400 font-medium leading-4 text-white py-1">立川チャンピオン</span>
          </div>
        </article>

        <t-tag class='text-left text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          子どもが活躍できる場づくりを目指しています。
        </t-tag>
        <t-tag class='text-left pt-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          普段はJavaを使った業務用のWEBアプリケーションの開発や保守をする仕事をしています。プログラミング教育活動に出会い、今は教育に関心があります。
          私はプログラミングを苦労して習得したので、これから学ぶ子どもたちには楽しく学べる場を提供したいと思い活動をしています。
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
