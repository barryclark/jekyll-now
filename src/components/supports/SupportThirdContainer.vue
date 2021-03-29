<template id="app">
<main class='flex items-center'>
<div class="support_back-container row">
    <t-tag class='py-8 text-center font-semibold tracking-tight font-display text-white text-3xl ml-4'>
        会計報告
    </t-tag>
    <br/>
    <br/>
<div class="bg-white rounded-xl shadow-md overflow-hidden back_size">
<div class="md:flex">
  <div>
    <iframe style="height:480px" class="back_size p-2" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSzpg-iCUegEjDX_ziOQllZlR92eeMPH99rxkDUIR9yAbXZIDUJiF90Wce7CeqQPTqrRriNzVq8kxN-/pubhtml?widget=true&amp;headers=false"></iframe>
  </div>
</div>
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
@media (min-width: 768px) {
    .back_size{
    width: 42rem;
    }
}
@media (max-width: 768px) {
    .back_size{
    width: 28rem;
    }
}

</style>

