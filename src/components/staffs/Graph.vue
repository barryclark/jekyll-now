<template>
  <div class="graph-bkg hero-container relative bg-white overflow-hidden row">
    <main class='py-40'>
      <div class="container hero-box">
        <section class="flex items-center justify-end">
          <t-tag class='text-2xl leading-8 font-semibold tracking-tight font-display text-white sm:text-3xl sm:leading-9'>
            スタッフの男女比
          </t-tag>
          <div>
            <t-tag class='text-sm leading-8 tracking-tight font-display text-white sm:leading-9'>
              男性：7人
            </t-tag>
            <t-tag class='text-sm leading-8 tracking-tight font-display text-white sm:leading-9'>
              女性：2人
            </t-tag>
          </div>
          <div class="rounded-full h-64 w-64 bg-blue-700 overflow-hidden relative">
            <div class="rounded-full h-24 w-24 bg-red-300 overflow-hidden">
            </div>
          </div>
          <t-tag class='text-2xl leading-8 font-semibold tracking-tight font-display text-white sm:text-3xl sm:leading-9'>
            職種別
          </t-tag>
          <div>
            <t-tag class='text-sm leading-8 tracking-tight font-display text-white sm:leading-9'>
              IT業界
            </t-tag>
            <t-tag class='text-sm leading-8 tracking-tight font-display text-white sm:leading-9'>
              福祉業界
            </t-tag>
            <t-tag class='text-sm leading-8 tracking-tight font-display text-white sm:leading-9'>
              学生
            </t-tag>
          </div>
          <div class="rounded-full h-64 w-64 bg-yellow-400 overflow-hidden relative flex">
            <div class="rounded-full h-24 w-24 bg-green-600 overflow-hidden">
            </div>
            <div class="rounded-full h-24 w-24 bg-blue-400 overflow-hidden">
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph-bkg {
  background: #3EB87D;
}
</style>
