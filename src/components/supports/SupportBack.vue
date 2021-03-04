<template id="app">
    <hooper :settings="hooperSettings">
      <slide>
        <div class="images img1">
          <h2>Slider 1</h2>
        </div>
      </slide>
      <slide>          
        <div class="images img2">
          <h2>Slider 2</h2>
        </div> 
      </slide>
      <slide>          
        <div class="images img3">
          <h2>Slider 3</h2>
        </div>       
      </slide>
      <slide>  
        <div class="images img4">
          <h2>Slider 4</h2>
        </div> 
      </slide>
      <slide>     
        <div class="images img5">
          <h2>Slider 5</h2>
        </div>
      </slide>
    </hooper>
</template>

<style>
.images {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.img1 {
  background: salmon;
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
  height: 100vh;
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