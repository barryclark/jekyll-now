<template>
  <div>
    <div class="form-container relative overflow-hidden row">
      <main class='container flex items-center'>
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display white-text lighten-5-text sm:text-3xl sm:leading-9'>
          お問い合わせ
        </t-tag>
      </main>
    </div>
    <div class="form-container relative overflow-hidden row">
      <div class="container">
        <t-alert class="" v-show="submitted" variant="error">
          お問い合わせ内容を送信しました。
        </t-alert>
        <form class="col s10" v-show="!submitted" name="contactForm" method="POST" target="hidden_iframe" :action="formUrl" @submit.prevent="submitForm()">
          <div v-for="(item, index) in formData" v-bind:key="index" :item="item" :index="index">
            <div class="row">
              <div class="input-field col s8" v-if="index!==2">
                <input :id="'entry.'+item.name" :name="'entry.'+item.name" type="text" class="validate white-text">
                <label class='white-text' :for="'entry.'+item.name">{{item.label}}</label>
                <t-tag v-if="index==1" class='white-text lighten-5-text'>
                  ※返信を必要とする場合は必ず記入してください
                </t-tag>
              </div>
              <div class="input-field col s8" v-else-if="index==3">
                <p>
                  <label class='white-text'>{{item.question}}</label>
                </p>
                <select :id="'entry.'+item.name" :name="'entry.'+item.name">
                  <option value="" disabled selected>{{item.label}}</option>
                  <option v-for="(op, idx) in item.options" v-bind:key="op" :item="op" :index="idx" :value="op">{{op}}</option>
                </select>
              </div>
              <div class="input-field col s12" v-else-if="index==2">
                <textarea :id="'entry.'+item.name" name="item.name" class="materialize-textarea" length="120"></textarea>
                <label class='white-text' :for="'entry.'+item.name">メッセージ</label>
              </div>
              <div v-else></div>
            </div>
          </div>

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
textarea.materialize-textarea {
  border-bottom: solid 1px #fff;
  color: #fff;
  font-size: 1.6rem;
  height: 10rem;
}
.input-field > label, button {
  font-size: 1.6rem;
}
input[type="text"]:not(.browser-default) {
  border-bottom: solid 1px #fff;
  font-size: 1.6rem;
  height: 4rem;
}
.waves-effect {
  color: #2F7DC0;
  background-color: #fafafa;
}


@media screen and (max-width:599px) {
  .form-container {
    background-color: #2F7DC0;
    background-image: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 800px;
    width: 100%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      formUrl: 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSe2itdG3fNJkTk59WOM9rMv4E5pZ3O2A4EWDxJIYXQRfML2CQ/formResponse',
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
      // {
      //   name: 1668971609,
      //   question: 'お問い合わせ区分',
      //   questionType: 'pulldown',
      //   label:  'お問い合わせ区分を選択してください',
      //   options: ['運営について', 'ボランティア参加について', 'ニンジャ参加について', '取材について'],
      //   validate: true
      // },
      {
        name: 1506558776,
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
      document.contactForm.submit();
      // document.contactForm.submit().then(result => {
      //   //Slackに通知
      //   result
      // });
    }
  },
  created() {
    // this.putsFormData();
    var iframe = document.createElement("iframe");
    iframe.setAttribute('name','hidden_iframe');
    iframe.setAttribute('style','display: none');
    document.body.appendChild(iframe);
    var thankyouComp = document.createElement("t-alert");
    thankyouComp.setAttribute('style', '');
    document.body.appendChild(thankyouComp);
  },
}
</script>