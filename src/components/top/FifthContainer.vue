<template>
  <div class="sixth-container relative bg-white overflow-hidden row">
    <main class='lg:container items-center flex flex-col justify-evenly'>
      <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
        活動の様子
      </t-tag>
      <div class="flex row justify-center">
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="carousel-img" src="../../assets/blogs/blog-i-1.png">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='blog-heading truncate text-xl pb-5 font-semibold tracking-tight font-display text-gray-900 text-center'>
                第12回 子どものためのプログラミング道場オンライン - CoderDojo立川（調布と合同開催）
              </t-tag>
              <p class='blog-desc'>
                今週のCoderDojo立川は、CoderDojo調布との合同開催。oViceというツールを使って、オンラインだけど実際にワークショップ会場に集まったようなバーチャル体験をしました。
              </p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="carousel-img" src="../../assets/blogs/blog-i-2.png">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='blog-heading truncate text-xl pb-5 font-semibold tracking-tight font-display text-gray-900 text-center'>
                冬休み特別編 子どものためのプログラミング道場 - CoderDojo立川（DojoCon2020共催）
              </t-tag>
              <p class='blog-desc'>
                CoderDojo立川（自宅PCのScratchから、東京のEV3をリモート操作）
                ▼2020年最後のイベント（12/27）は、全国規模のDojoCon2020にワークショップを共催しました。
              </p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="carousel-img" src="../../assets/blogs/blog-i-3.png">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='blog-heading truncate text-xl pb-5 font-semibold tracking-tight font-display text-gray-900 text-center'>
                第11回 子どものためのプログラミング道場 - CoderDojo立川（調布と合同開催）
              </t-tag>
              <p class='blog-desc'>
                CoderDojo立川（調布と合同開催）
                11/29は、調布チームによる会場開催と立川チームによるオンラインの合同開催となりました。調布チームは、ニンジャがそれぞれ自分の好きな作品の制作に取り組み、立川チームは、みんなでアイディアを出し合ってプログラムを制作する「モブプロ」（群衆によるプログラミングという意味）を実施。
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
.row .col.m3 {
  margin-left: initial;
}
.blog-heading {
  height: 1.6rem;
  width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blog-desc {
  height: 7.2rem;
  width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hero-box {
  opacity: 0.8;
  width: 640px;
}
.carousel-img {
  height: 28vh;
}
.sixth-container {
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
</style>
