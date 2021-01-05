<template>
  <div class="fourth-container relative bg-white overflow-hidden row">
    <main class='lg:container flex items-center'>
      <div class="container hero-box">
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          参加の流れ
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-center text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          connpass登録後、メールアドレスをお送りします。
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-center text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          オンラインではZoomを使用しますので、ご家庭の環境で動作確認をお願いいたします。
        </t-tag>
      </div>
      <img src="../assets/pc_02.png" />
    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.hero-box {
  opacity: 0.8;
  width: 640px;
}
.fourth-container {
  background: #FFF25A;
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
</style>
