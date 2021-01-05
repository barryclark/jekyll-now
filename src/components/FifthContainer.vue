<template>
  <div class="sixth-container relative bg-white overflow-hidden row">
    <main class='lg:container items-center flex flex-col justify-evenly'>
      <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
        活動の様子
      </t-tag>
      <div class="flex row justify-center">
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="img" src="../assets/card_2.png">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
                活動の様子
              </t-tag>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="img" src="https://lh3.googleusercontent.com/lDPrGvYT1exvQLOKIhcZvgAmIV3OUhaFHgNvUlEluJouA7AyeUuqr8Zf7Kv2KxROM6dWzuLLGharLA6piMPuYzCUaRu_iVVe5_9KedXLWo-0J6PsYzLTnp6hwoWOgDAuUDgXxNeOXA=w2400">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
                活動の様子
              </t-tag>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img class="img" src="../assets/card_3.jpg">
            </div>
            <div class="card-content">
              <t-tag variant="heading" class='pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
                活動の様子
              </t-tag>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.row .col.m3 {
  margin-left: initial;
}
.hero-box {
  opacity: 0.8;
  width: 640px;
}
.img {
  height: 40vh;
}
.sixth-container {
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
</style>
