<template>
  <header>
    <nav style="float: initial;" class="header row">
      <div class="col s6 valign-wrapper">
        <img class="circle left square-icon" alt="corder dojo tachikawa" src="../assets/dojo-logo.jpg" />
        <h1 class='title'>Corder Dojo 立川</h1>
      </div>
      <ul class="col valign-wrapper">
        <li>スタッフ紹介</li>
        <li>メンバー募集</li>
        <li>開催の様子</li>
        <li>ご支援のお願い</li>
        <li>お問い合わせ</li>
        <li>
          <a href="https://lin.ee/vhWQhPP">
            <img class="line-img" src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0">
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
// export default {
//   name: 'HelloWorld',
//   props: {
//     msg: String
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  font-size: 18px;
  height: initial;
}
img {
  height: initial;
}
nav {
  background-color: initial;
  display: flex;
  height: initial;
  justify-content: space-between;
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
.header {
  background: url('../assets/back_01.png') repeat center center;
  background-color: #fff;
  color: #0F0F0F;
  height: 64px;
  margin-bottom: initial;
  position: fixed;
  z-index: 100;
}
.inner-icon {
  margin: 12px;
}
.line-img {
  height: 32px;
}
.square-icon {
  height: 48px;
  width: 48px;
}
.title {
  font-size: 2rem;
}
</style>
