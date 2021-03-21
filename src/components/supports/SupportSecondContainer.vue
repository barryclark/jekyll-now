<template>
  <div class="support_second-container relative bg-white overflow-hidden row">
    <main class='lg:container flex items-center'>
      <div class="container support_second-box">
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          ご支援・ご協力のお願い
        </t-tag>
        <t-tag tag-name="p" variant="body" class='pt-5 text-center text-2xl leading-8 tracking-tight font-display text-gray-900 sm:text-xl sm:leading-9'>
          ご支援・ご協力をお願い致します。
        </t-tag>
      </div>
      <img class="rounded-full h-48 w-48 flex items-center justify-center" src="../../assets/dojo-logo.jpg" />

    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.support_second-box {
  opacity: 0.8;
  width: 640px;
}
.support_second-container {
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;

  background-image: linear-gradient(0deg, rgba(248,179,00, 0.5) 25%, transparent 25%),
                    linear-gradient(-90deg, rgba(248,179,00, 0.5) 25%, transparent 25%),
                    linear-gradient(rgba(255,242,90, 0.5) 25%, transparent 25%),
                    linear-gradient(90deg, rgba(255,242,90, 0.5) 25%, transparent 25%),
                    linear-gradient(90deg, rgba(105,193,159, 0.5) 50%, transparent 50%),
                    linear-gradient(rgba(255,242,90, 0.5) 50%, transparent 50%),
                    linear-gradient(-90deg, rgba(248,179,00, 0) 50%, transparent 50%);
  background-size: 240px 240px;
}
</style>
