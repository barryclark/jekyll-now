<template>
  <header>
    <nav class="row">
      <div class="col s6 valign-wrapper">
        <img class="left square-icon" alt="corder dojo tachikawa" src="../assets/cd-tachikawa.png" />
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
            <img class="valign-wrapper" src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0">
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  font-size: 18px;
  height: initial;
}
nav {
  display: flex;
  height: initial;
  justify-content: space-between;
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
.inner-icon {
  margin: 12px;
}
.square-icon {
  height: 48px;
  width: 48px;
}
.title {
  font-size: 2rem;
}
</style>
