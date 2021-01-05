<template>
  <div class="sixth-container relative bg-white overflow-hidden row">
    <main class='lg:container items-center flex flex-col justify-evenly'>
      <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
        初めての方へ
      </t-tag>
      <div class="flex row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
                パソコンの準備
              </t-tag>
              <p>以下のソフトをインストールして来てください。</p>
              <p>（https://www.google.com/chrome/）</p>
              <p>・Scratch オフラインエディタ</p>
              <p>（https://scratch.mit.edu/download）</p>
            </div>
          </div>
        </div>
        <div class="col s12 m7">
          <div class="card">
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
                LINE
              </t-tag>
              <p>
                CoderDojo受付開始や開催直前のお知らせなどを配信します。是非登録してください。
              </p>
              <img src="../../assets/line_barcode.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
                課題やカリキュラムを使用しない、ライブ感のあるDojoです
              </t-tag>
              <p>
                子ども”やりたい”を引き出すために自由な作品作
                りの場を提供しています。
                誰でも人に指示されて行うより、自分のやりたい
                ことや好きなことをするときの方が楽しいですし
                やる気も出ます。
              </p>
            </div>
          </div>
        </div>
        <div class="col s12 m7">
          <div class="card">
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
                なにかあれば
              </t-tag>
              <p>
                れいぶんれいぶんれいぶんれいぶんれいぶ
                んれいぶんれいぶんれいぶんれいぶんれい
                ぶんれいぶんれいぶんれいぶんれいぶん
                れいぶんれいぶんれいぶんれいぶんれいぶ
                んれいぶんれいぶんれいぶんれいぶんれい
                ぶんれいぶんれいぶんれいぶんれいぶん
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.card-content {
  border: #707070 solid 5px;
}
.hero-box {
  opacity: 0.8;
  width: 640px;
}
.sixth-container {
  display: flex;
  justify-content: center;
  /* height: 640px; */
  width: 100%;
}
</style>
