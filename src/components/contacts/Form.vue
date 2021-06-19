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
              <div class="input-field col s5" v-if="index==0">
                <input :id="'entry.'+item.name" :name="'entry.'+item.name" type="text" class="validate">
                <label :for="'entry.'+item.name" class="white-text">{{item.label}}</label>
              </div>
              <div class="input-field col s5" v-if="index==1">
                <input :id="'entry.'+item.name" :name="'entry.'+item.name" type="text" class="validate">
                <label :for="'entry.'+item.name" class="white-text">{{item.label}}</label>
                <t-tag class='white-text lighten-5-text'>
                  ※返信を必要とする場合は必ず記入してください
                </t-tag>
              </div>
              <div class="input-field col s5" v-else-if="index==2">
                <p>
                  <label class="white-text">{{item.question}}</label>
                </p>
                <p>
                  <label v-for="(op, idx) in item.options" v-bind:key="op" :item="op" :index="idx" @click='checke = op' class="white-text">
                    <input :id="'entry.'+item.name" :name="'entry.'+item.name" type="radio" v-model='checke' :value='checke' />
                    <span>{{op}}</span>
                  </label>
                </p>
              </div>
              <div class="row" v-else-if="index==3">
                <div class="input-field col s12">
                  <textarea :id="'entry.'+item.name" :name="'entry.'+item.name" class="materialize-textarea" length="120">
                  </textarea>
                  <label :for="'entry.'+item.name" class="white-text">メッセージ</label>
                </div>
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
      {
        name: 781055325,
        question: 'お問い合わせ区分',
        questionType: 'radio',
        label:  'お問い合わせ区分を選択してください',
        options: ['Dojoの活動に関するお問い合わせ', 'メンター参加について', 'Ninja参加について', 'その他'],
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
      submitted: false,
      checke: 'その他'
    };
  },
  methods: {
    submitForm: function() {
      document.contactForm.submit();
    },
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
  }
}
</script>