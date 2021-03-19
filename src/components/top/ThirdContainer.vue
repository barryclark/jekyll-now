<template>
  <div class="third-container relative bg-white overflow-hidden row">
    <main class='lg:container flex items-center'>

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

      <div class="container hero-box">
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          参加方法
        </t-tag>
        <t-tag tag-name="p" variant="body" class='py-8 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          参加お申し込みにはイベント管理サービス「connpass」のアカウント登録が必要です。
          各回の詳細な情報については、お申し込みページにてご確認ください。
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          またconnpass内のCorderDojo立川グループのメンバーになっていただくことで、イベントの募集案内やお知らせをメールで受け取ることが出来ます。
        </t-tag>
        <div class="pt-5">
          <div class="card-panel">
            <span class="markup-red">
              次回開催予定
              第1回&nbsp;11月11日&nbsp;11:00~12:00&nbsp;&nbsp;オンライン
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.hero-box {
  background: #fff;
  opacity: 0.8;
  width: 640px;
}
.markup-red {
  color: #F2718A;
}
.third-container {
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}



video {
  max-height: 320px;
  width: 90%;
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
  height: 640px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;
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
                    vertical: true,
                    centerMode: true,
                    autoPlay: true,
                    playSpeed: 3500,
                    breakpoints: {
                      480: {
                        itemsToShow: 1.75
                      },
                      640: {
                        itemsToShow: 2.3
                      }
                    }
                }   
            }
        }
    };

</script>
