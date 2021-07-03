<template id="app">
<main class='flex items-center'>

  <!-- メンバー紹介サイトを組み込みます -->
  <div class="w-screen min-h-300 bg-white">
    <iframe src="https://member-cd.web.app/?dojo=tachikawa" width="100%" id="member-frame" frameborder="0" scrolling="yes" allowfullscreen></iframe>
  </div> 

</main>
</template>

<style scoped>
#app {
  display: flex;
}
</style>

<script>
  // 高さを自動調整します
  window.addEventListener('message', function(e) {
    if(e.origin=="https://member-cd.web.app"){
      document.getElementById('member-frame').height = e.data + 180;
    }
  }, false);
</script>