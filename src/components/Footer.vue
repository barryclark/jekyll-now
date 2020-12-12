<template>
  <footer class="footer">
    <nav>
      <ul class="row valign-wrapper">
        <li>スタッフ紹介</li>
        <li>メンバー募集</li>
        <li>開催の様子</li>
        <li>ご支援のお願い</li>
        <li>お問い合わせ</li>
        <li>
          <a href="https://lin.ee/vhWQhPP">
            <img class="valign-wrapper line-img" src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0">
          </a>
        </li>
      </ul>
      <div class="row s6 valign-wrapper">
        <img class="circle left square-icon" alt="corder dojo tachikawa" src="../assets/dojo-logo.jpg" />
        <h6 class='copyright'>C2020 Corder Dojo Tachikawa</h6>
      </div>
    </nav>

  </footer>
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
  background: url('../assets/back_01.png') repeat center center;
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
.square-icon {
  height: 36px;
  width: 36px;
}
.copyright {
  font-size: 1em;
}
</style>
