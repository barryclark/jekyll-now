<template>
  <div class="third-container relative bg-white overflow-hidden row">
    <main class='lg:container flex items-center'>
      <img src="../assets/pc_02.png" />
      <div class="container hero-box">
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          参加方法
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          参加お申し込みにはイベント管理サービス「connpass」のアカウント登録が必要です。
          各回の詳細な情報については、お申し込みページにてご確認ください。
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          またconnpass内のCorderDojo立川グループのメンバーになっていただくことで、イベントの募集案内やお知らせをメールで受け取ることが出来ます。
        </t-tag>
        <div class="pt-5">
          <div class="card-panel">
            <span>
              次回開催予定
              第1回&nbsp;11月11日&nbsp;11:00~12:00&nbsp;&nbsp;オンライン
            </span>
          </div>
        </div>
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
.third-container {
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
</style>
