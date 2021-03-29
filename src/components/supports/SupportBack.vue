<template id="app">
<main class='flex items-center'>
<div class="support_back-container row">
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
<div class="md:flex">
  <div class="w-full object-contain md:w-72 md:h-full">
    <hooper :settings="hooperSettings">
      <slide>
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
      <slide>          
        <video src="../../assets/loop_1/2.mp4" loop autoplay controls></video>
      </slide>
      <slide>          
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>      
      </slide>
      <slide>  
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
      <slide>     
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
    </hooper>
  </div>
  <div class="p-10">
    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">ご支援・ご協力のお願い</div>
    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
    <p class="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
  </div>
</div>
</div>
<br/>
<br/>
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
<div class="md:flex">
  <div class="w-full object-contain md:w-72 md:h-full">
    <hooper :settings="hooperSettings">
      <slide>
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
      <slide>          
        <video src="../../assets/loop_1/2.mp4" loop autoplay controls></video>
      </slide>
      <slide>          
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>      
      </slide>
      <slide>  
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
      <slide>     
        <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
      </slide>
    </hooper>
  </div>
  <div class="p-10">
    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">ご支援・ご協力のお願い</div>
    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
    <p class="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
  </div>
</div>
</div>
</div>
</main>
</template>

<style scoped>
main{
  background-color: #3f1130;
}
#app {
  display: flex;
}
.support_back-container {

  align-items: center;
  justify-content: center;
}


video {
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

h2 {
  color: #fff
}

</style>

<script>

    import { Hooper, Slide } from 'hooper';
    import 'hooper/dist/hooper.css';

    export default {
      name: 'App',
      components: {
        Hooper,
        Slide
      },
        data() {
            return {
                hooperSettings: {
                    itemsToShow: 1,
                    infiniteScroll: true,
                    centerMode: true,
                    autoPlay: true,
                    playSpeed: 2500
                }   
            }
        }
    };

</script>