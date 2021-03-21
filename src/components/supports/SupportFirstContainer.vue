<template id="app">
  <div class="support_back-container relative bg-white overflow-hidden row">
    <main class='lg:container flex items-center'>
      <div class="container support_back-box">
      <div>
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          ご支援・ご協力のお願い<br>
        </t-tag>
        <t-tag tag-name="p" variant="body" class='py-8 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          ご支援・ご協力をお願い致します。<br>
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          ご支援・ご協力をお願い致します。
        </t-tag>
      </div>
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
    </main>
  </div>
</template>

<style scoped>

.markup-red {
  color: #F2718A;
}


main { width: 100%; }
.support_back-box {
  position: absolute;
  z-index: 2;
  height: 640px;
  width: 30%;
  left: 0;
  background: #fff;
  text-align: center; 
}
.support_back-box div{
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:100%;
}

.support_back-container {
  display: flex;
  align-items: center;
  height: 640px;
  width: 100%;
  
}
video {
  max-height: 320px;
  width: 90%;
  filter: grayscale(100%);
  transition: 0.3s;
}
video:hover {
  filter: none;
}
.images {
  height: 320px;
  width: 320px;
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
  height: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
                    playSpeed: 3500,
                    breakpoints: {
                      480: {
                        itemsToShow: 1.75
                      },
                      640: {
                        itemsToShow: 2.3
                      },
                      1040: {
                        itemsToShow: 3
                      },
                      1280: {
                        itemsToShow: 4
                      }

                    }
                }   
            }
        }
    };

</script>