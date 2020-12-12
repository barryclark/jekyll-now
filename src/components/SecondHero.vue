<template>
  <div class="hero relative bg-white overflow-hidden">
    <div class="hero-inner">
      <h2 class="title">子どもが活躍できる場づくりを目指しています。</h2>
      <div class="description">
        <p>プログラミングをして作成したゲームやアニメーション</p>
        <p>などの作品を発表ができる場です。</p>
        <p>多くの人に頑張りを見てもことができるのと、</p>
        <p>フィードバックを得ることによって更によりよい作品づくりを促せます。</p>
      </div>
      <div class="card-folder">
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-content">
                <span class="card-title">みんなでつくる</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-content">
                <span class="card-title">みんなでつくる</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-content">
                <span class="card-title">みんなでつくる</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
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
  name: 'HelloWorld',
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
  background-image: url('../assets/tachikawa_back_04.png');
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