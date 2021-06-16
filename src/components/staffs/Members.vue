<template id="app">
<main class='flex items-center'>
<div class="support_back-container row">
    <t-tag class='py-8 text-center font-semibold tracking-tight font-display text-white text-3xl ml-4'>
        メンター紹介
    </t-tag>
    <br/>
    <br/>
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
<div class="md:flex">
  <img src="../../assets/members/inocchi.jpg" class="h-48 w-48 mt-10 ml-10 md:mb-10" />
  <div class="p-10">
    <div class="uppercase tracking-wide text-sm text-yellow-500 font-semibold">いのっち</div>
    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
    <p class="mt-2 text-gray-600">普段はJavaを使った業務用のWEBアプリケーションの開発や保守をする仕事をしています。プログラミング教育活動に出会い、今は教育に関心があります。私はプログラミングを苦労して習得したので、これから学ぶ子どもたちには楽しく学べる場を提供したいと思い活動をしています。</p>
  </div>
</div>
</div>
<br/>
<br/>
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
<div class="md:flex">
  <img src="../../assets/members/inocchi.jpg" class="h-48 w-48 mt-10 ml-10 md:mb-10" />
  <div class="p-10">
    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">メンター２</div>
    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Python C# C++</a>
    <p class="mt-2 text-gray-600">かのさんの編集機能を追加予定Getting a new business off the ground is a lot of hard work. Getting a new business off the ground is a lot of hard work. Getting a new business off the ground is a lot of hard work. Getting a new business off the ground is a lot of hard work. Getting a new business off the ground is a lot of hard work. Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
  </div>
</div>
</div> 
<br/>
<br/>
<div class="w-screen min-h-300 bg-white">
  <iframe src="https://member-cd.web.app/?dojo=tachikawa" width="99%" id="member-frame" frameborder="0" scrolling="yes" allowfullscreen></iframe>
</div> 
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