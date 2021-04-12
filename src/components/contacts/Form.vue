<template>
  <div>
    <div class="form-container relative overflow-hidden row">
      <main class='lg:container flex items-center'>
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          お問い合わせ<br>
        </t-tag>
      </main>
    </div>
    <!-- formUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScszXtPiIsOfWGg8TrWCd4Am4OU_7p_6YJYk9GG4MMhPuWVlg/formResponse', -->
    <div class="form-container relative overflow-hidden row">
      <div class="container">
        <form class="col s10" v-show="!submitted" name="contactForm" method="POST" :action="formData.formUrl" @submit.prevent="submitForm()">
          <listitem v-for="(item, index) in formData" v-bind:key="item" :item="item" :index="index">
            <div class="row">
              <div class="input-field col s5" v-if="index!==2">
                <input id="" :name="item.name" type="text" class="validate">
                <label for="first_name">{{item.label}}</label>
              </div>
              <div class="input-field col s5" v-else-if="index==2">
                <p>
                  <label>{{item.question}}</label>
                </p>
                <select>
                  <option value="" disabled selected>{{item.label}}</option>
                  <option v-for="(op, idx) in item.options" v-bind:key="op" :item="op" :index="idx" value="1">{{op}}</option>
                </select>
              </div>
              <div class="row" v-else-if="index==3">
                <div class="input-field col s12">
                  <textarea id="textarea1" class="materialize-textarea" length="120"></textarea>
                  <label for="textarea1">Textarea</label>
                </div>
              </div>
              <div v-else></div>
            </div>
          </listitem>

          <button class="waves-effect waves-light btn">送信</button>
        </form>
      </div>

    </div>

  </div>
</template>

<style scoped>
.form-container {
  background-color: #2F7DC0;
  background-image: url('../../assets/tachikawa_back_03.jpg');
  background-repeat: no-repeat;
  background-position: top right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 800px;
  width: 100%;
}
select {
  display: block;
}
textarea {
  height: 10rem;
}
</style>

<script>
export default {
  data() {
    return {
      formUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScszXtPiIsOfWGg8TrWCd4Am4OU_7p_6YJYk9GG4MMhPuWVlg/formResponse',
      formData: [
      {
        name: 842797987,
        question: 'お名前',
        questionType: 'text',
        label: 'お名前',
        validate: true
      },
      {
        name: 1078512650,
        question: 'メールアドレス',
        questionType: 'text',
        label: 'メールアドレス',
        validate: true
      },
      {
        name: 1506558776,
        question: 'お問い合わせ区分',
        questionType: 'radio',
        label:  'お問い合わせ区分を選択してください',
        options: ['運営について', 'ボランティア参加について', 'ニンジャ参加について', '取材について'],
        validate: true
      },
      {
        name: 1668971609,
        question: 'メッセージ',
        questionType: 'text',
        label: 'メッセージ',
        validate: true
      }
      ],
      submitted: false
    };
  },
  methods: {
    submitForm: function() {
      document.contactForm.subit().then(result => {
        //Slackに通知
        result
      });
    }
  },
  created() {
    // this.putsFormData();
    var thankyouComp = document.createElement("div");
    thankyouComp.setAttribute('style', '');
    document.body.appendChild(thankyouComp);
  },
}
</script>