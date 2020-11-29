<template>
  <div class="hero-container relative bg-white overflow-hidden row">
    <main class='pt-64'>
      <div class="container hero-box">
        <t-tag variant="heading" class='text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
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

<style scoped>
main { width: 100%; }
.hero-box {
  background: #fff;
  opacity: 0.8;
  width: 640px;
}
.hero-container {
  background: url('../assets/person-using-macbook-pro-on-person-s-lap-1181298.jpg') no-repeat right bottom;
  background-size: contain;
  margin: 0 auto;
  height: 640px;
  width: 100%;
}
</style>
