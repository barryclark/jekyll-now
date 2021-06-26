<template>
  <header>
    <!-- PC表示 -->
    <nav
      class="header row"
      v-if="!smallSize"
    >
      <router-link class="router-link col s4 valign-wrapper" to="/">
        <img
          class="circle left square-icon"
          alt="corder dojo tachikawa"
          src="../assets/dojo-logo.jpg"
        />
        <h1 class='title'>Corder Dojo 立川</h1>
      </router-link>
      <div class="col s8 flex justify-end">
        <ul class="col valign-wrapper">
          <li>
            <router-link class="router-link" to="/">
              トップ
            </router-link>
          </li>
          <li>
            <router-link class="router-link" to="/staffs">
              スタッフ紹介
            </router-link>
          </li>
          <li>
            <router-link class="router-link" to="/members">
              メンバー募集
            </router-link>
          </li>
          <li>
            <a class="router-link" href="https://coderdojo-tachikawa.connpass.com/">
              次回の開催予定
            </a>
          </li>
          <li>
            <a class="router-link" href="https://coderdojotachikawa.tamaliver.jp/">
              開催報告
            </a>
          </li>
          <li>
            <router-link class="router-link" to="/support">
              ご支援のお願い
            </router-link>
          </li>
          <li>
            <router-link class="router-link" to="/contact">
              お問い合わせ
            </router-link>
          </li>
          <li>
            <a href="https://lin.ee/vhWQhPP">
              <img
                class="line-img"
                src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                alt="友だち追加"
                height="36"
                border="0"
              >
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- スマホ表示 -->
    <nav
      style="float: initial;"
      class="header row"
      v-if="smallSize"
    >
      <div class="col s4 valign-wrapper">
        <a
          href="#"
          data-target="mobile-demo"
          class="sidenav-trigger"
        ><i class="material-icons">menu</i></a>
        <img
          class="circle left square-icon"
          alt="corder dojo tachikawa"
          src="../assets/dojo-logo.jpg"
        />
        <h1 class='title'>Corder Dojo 立川</h1>
      </div>
      <div class="col s8">
        <!--ハンバーガーメニューのボタン-->
        <div
          class="hamburger_btn"
          v-on:click='ActiveBtn=!ActiveBtn'
        >
          <span
            class="line line_01"
            v-bind:class="{'btn_line01':ActiveBtn}"
          ></span>
          <span
            class="line line_02"
            v-bind:class="{'btn_line02':ActiveBtn}"
          ></span>
          <span
            class="line line_03"
            v-bind:class="{'btn_line03':ActiveBtn}"
          ></span>
        </div>
        <!--サイドバー-->
        <transition name="menu">
          <div
            class="menu"
            v-show="ActiveBtn"
          >
            <ul id="test">
              <li>
                <router-link class="router-link" to="/">
                  トップ
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/staffs">
                  スタッフ紹介
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/members">
                  メンバー募集
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/events">
                  開催の様子
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/support">
                  ご支援のお願い
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/contact">
                  お問い合わせ
                </router-link>
              </li>
              <li>
                <a href="https://lin.ee/vhWQhPP">
                  <img
                    class="line-img"
                    src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                    alt="友だち追加"
                    height="36"
                    border="0"
                  >
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      smallSize: Boolean,
      ActiveBtn: false,
    };
  },
  props: {
    Small: Number,
  },
  methods: {
    handleResize: function () {
      if (window.innerWidth <= 1300) {
        this.smallSize = true;
      } else {
        this.smallSize = false;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
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
  margin: 0 5px;
}
.router-link {
  color: #000;
  white-space: nowrap;
}

.header {
  background: url("../assets/back_01.png") repeat center center;
  background-color: #fff;
  color: #0f0f0f;
  height: 64px;
  margin-bottom: initial;
  position: fixed;
  z-index: 100;
}
.inner-icon {
  margin: 12px;
}
img.line-img {
  height: 32px;
  }
.square-icon {
  height: 48px;
  width: 48px;
}
.title {
  font-size: 2rem;
  white-space: nowrap;
}

/* ハンバーガーメニュースタイル */
/*ボタン*/
.hamburger_btn {
  position: fixed; /*常に最上部に表示したいので固定*/
  top: 0;
  right: 0;
  width: 64px;
  height: 56px;
  cursor: pointer;
  z-index: 50;
  border: 1px solid;
  border-color: grey;
  text-align: center;
  margin-top: 4px;
}

.hamburger_btn .line {
  position: absolute;
  top: 0;
  left: 16px;
  width: 32px;
  height: 2px;
  background: #333333;
  text-align: center;
}

.hamburger_btn .line_01 {
  top: 16px;
  transition: 0.4s ease;
}
.hamburger_btn .line_02 {
  top: 26px;
  transition: 0.4s ease;
}
.hamburger_btn .line_03 {
  top: 36px;
  transition: 0.4s ease;
}

.btn_line01 {
  transform: translateY(10px) rotate(-45deg);
  transition: 0.4s ease;
}
.btn_line02 {
  transition: 0.4s ease;
  opacity: 0;
}
.btn_line03 {
  transform: translateY(-10px) rotate(45deg);
  transition: 0.4s ease;
}

/*サイドバー*/
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s;
}
.menu-enter,
.menu-leave-to {
  opacity: 0;
}
.menu-leave,
.menu-enter-to {
  opacity: 1;
}

.menu li {
  list-style: none;
  line-height: 1;
  padding: 1rem;
}
.menu {
  background-color: rgba(197, 197, 197, 0.671);
  z-index: 30;
  padding: 2rem 1rem;
  position: fixed;
  width: 20rem;
  height: 80rem;
  top: 0;
  right: 0;
}
.menu a {
  color: rgb(66, 66, 66);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0 2rem;
}
.menu ul {
  margin: 1rem;
  padding: 0;
}
</style>
