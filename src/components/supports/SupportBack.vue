<template id="app">
  <div class="support_back-container relative bg-white overflow-hidden row">
    
      <div class="container support_back-box">
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          ご支援・ご協力のお願い
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-center text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          ご支援・ご協力をお願い致します。
        </t-tag>
      </div>
    <hooper :settings="hooperSettings">
      <slide>
        <div class="images img1">
          
          <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
        </div>
      </slide>
      <slide>          
        <div class="images img2">
          
          <video src="../../assets/loop_1/2.mp4" loop autoplay controls></video>
        </div> 
      </slide>
      <slide>          
        <div class="images img3">
          
          <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
        </div>       
      </slide>
      <slide>  
        <div class="images img4">
          
          <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
        </div> 
      </slide>
      <slide>     
        <div class="images img5">
          
          <video src="../../assets/loop_1/1.mp4" loop autoplay controls></video>
        </div>
      </slide>
    </hooper>
    
  </div>
</template>

<style>

div.support_back-box {
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 30%;
  left: 0;
  background: #fff;
  text-align: center;
  
}
.support_back-container {

  background: #FFF25A;
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
video {
  width: 90%;
}
.images {
  height: 640px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.img1 {
  background: lightblue;
}
.img2 {
  background: lightblue;
}
.img3 {
  background: coral;
}
.img4 {
  background: lightgreen;
}
.img5 {
  background: pink;
}
h2 {
  color: #fff
}
.hooper {
  height: 640px;
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
                    infiniteScroll: true,
                    centerMode: true,
                    autoPlay: true,
                    playSpeed: 3500,
                    breakpoints: {
                        2400: {
                            itemsToShow: 5
                        },
                        1800: {
                            itemsToShow: 4
                        },
                        1500: {
                            itemsToShow: 3
                        },
                        1100: {
                            itemsToShow: 2.5
                        },
                        0: {
                            itemsToShow: 1.5
                        }
                    }
                }   
            }
        }
    };

</script>