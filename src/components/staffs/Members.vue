<template id="app">
<main class='flex items-center'>

<div class="w-screen min-h-300 bg-white">
  <iframe src="https://member-cd.web.app/?dojo=tachikawa" width="99%" id="member-frame" frameborder="0" scrolling="yes" allowfullscreen></iframe>
</div> 

</main>
</template>

<style scoped>
main{
  background-color: rgba(245, 158, 11, 1);
}
#app {
  display: flex;
}
.support_back-container {

  align-items: center;
  justify-content: center;
}
img {
    border-radius: 9999px;
}

h2 {
  color: #fff
}

</style>

<script>
    window.addEventListener('message', function(e) {
      if(e.origin=="https://member-cd.web.app"){
        document.getElementById('member-frame').height = e.data + 120;
      }
    }, false);


</script>