<template>
  <div class="sixth-container relative bg-white overflow-hidden row">
    <main class='lg:container items-center flex flex-col justify-evenly'>
      <t-tag variant="heading" class='text-white py-5 text-2xl leading-8 font-semibold tracking-tight font-display sm:text-3xl sm:leading-9 text-center'>
        今後の活動
      </t-tag>

      <div class="card">
        <div class="card mx-24 mt-16">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  対象ドージョー
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  イベント名
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  オンライン / オフライン
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  開催場所
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  開催日時
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="../../assets/dojo-logo.jpg" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Corder Dojo 立川
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    小中学生のための非営利プログラミング道場
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    オンライン
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Zoom
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2021年2月14日（日）10:00-12:00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="../../assets/chohu-logo.png" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Corder Dojo 調布
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    小中学生のための非営利プログラミング道場
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    オンライン
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Zoom
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2021年2月14日（日）10:00-12:00
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Corder Dojo 立川 / 調布 合同開催
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    小中学生のための非営利プログラミング道場
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    オンライン
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Zoom
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2021年2月14日（日）10:00-12:00
                </td>
              </tr>
              <!-- More rows... -->
            </tbody>
          </table>
        </div>
        <t-tag variant="heading" class='my-24 pb-5 text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9 text-center'>
          そのほかの教室の開催情報は<span class="link-color">こちら</span>から
        </t-tag>
      </div>
    </main>
  </div>
</template>

<style scoped>
main { width: 100%; }
.hero-box {
  opacity: 0.8;
  width: 640px;
}
.link-color {
  color: #F2718A;
}
.sixth-container {
  background-color: #F8B300;
  background-size: cover;
  background-position: 70% 30%;
  display: flex;
  justify-content: center;
  height: 640px;
  width: 100%;
}
.chohu-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem 0 0 2rem;
  background: #F2718A;
  background-image: url("../../assets/chohu-logo.png")
}
</style>
