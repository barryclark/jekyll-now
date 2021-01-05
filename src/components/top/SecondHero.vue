<template>
  <div class="hero relative bg-white overflow-hidden">
    <div class="hero-inner">
      <h2 class="title">子どもが活躍できる場づくりを目指しています。</h2>
      <div class="description">
        <p class="py-8">
          プログラミングをして作成したゲームやアニメーション
          などの作品を発表ができる場です。
          多くの人に頑張りを見てもことができるのと、
          フィードバックを得ることによって更によりよい作品づくりを促します。
        </p>
      </div>
      <div class="card-folder">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">みんなでつくる</span>
                <p>ひとりひとりが主体的にプログラミングを楽しめるように。</p>
                <p>参加者もメンターも、年齢は関係ありません。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">オフラインでの活動</span>
                <p>Scratch未経験のニンジャにも、メンターや先輩ニンジャが丁寧にサポート。</p>
                <p>作りたいもののアイデアを積極的に出しましょう。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">オンラインでの活動</span>
                <p>Zoomを使用してプログラミングをしていきます。</p>
                <p>作品ができたら、みんなで発表会も実施します。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>
.card-folder {
  display: flex;
}
.hero {
  background-color: #69C19F;
  background-image: url('../../assets/tachikawa_back_04.png');
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-position: center bottom;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 800px;
  width: 100%;
}
.hero-inner {
  padding: 120px;
}
.title {
  color: #fff;
  font-size: 2em;
}

.description {
  color: #fff;
  font-size: 1em;
}
</style>