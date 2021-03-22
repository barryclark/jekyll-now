<template>
  <div>
    <div class="form-container relative overflow-hidden row">
      <main class='lg:container flex items-center'>
        <t-tag variant="heading" class='text-center text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9'>
          お問い合わせ<br>
        </t-tag>
      </main>
    </div>
    <div class="form-container relative overflow-hidden row">
      <div class="row">
        <form class="col s10" v-show="!submitted" name="contactForm" method="POST" :action="formData.doc" @submit.prevent="submitForm()">
          <!-- <listitem v-bind:key="item.id" v-for="item in formInputs.formData" :item="item" :index="index"></listitem> -->
          <listitem v-for="(item, index) in formData" v-bind:key="item.formInputs" :item="item" :index="index">
            <div class="input-field col s5">
              <input id="first_name" type="text" class="validate">
              <label for="first_name">{{item[0]['label']}}</label>
            </div>
          </listitem>
          <div class="row">
            <div class="input-field col s5">
              <input id="first_name" type="text" class="validate">
              <label for="first_name">First Name</label>
            </div>
            <div class="input-field col s5">
              <input id="last_name" type="text" class="validate">
              <label for="last_name">Last Name</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s10">
              <input id="email" type="email" class="validate">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s10">
              <p>
                <label>Materialize Select</label>
              </p>
              <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="row">
              <div class="input-field col s10">
                <textarea id="textarea1" class="materialize-textarea" length="120"></textarea>
                <label for="textarea1">Textarea</label>
              </div>
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
textarea {
  height: 10rem;
}
</style>

<script>
import formData from './form-data.js'

export default {
  data() {
    return {
      formData: {},
      submitted: false
    };
  },
  methods: {
    submitForm: function() {
      document.contactForm.subit().then(result => {
        //Slackに通知
        result
      });
    },
    putsFormData: function() {
      this.formData = formData;
    }
  },
  created() {
    this.putsFormData();
    var thankyouComp = document.createElement("div");
    thankyouComp.setAttribute('style', '');
    document.body.appendChild(thankyouComp);
  },
}
</script>