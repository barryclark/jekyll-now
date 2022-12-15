var inputs = document.querySelectorAll('.ContactForm input[type=text], .ContactForm input[type=email], .ContactForm textarea'); for (var i = 0; i < inputs.length; i++) { var input = inputs[i]; input.addEventListener('input', function() {var bg = this.value ? 'fl' : 'nfl';console.log(bg); this.setAttribute('data-text',bg);}); }

  grecaptcha.ready(function(){
          grecaptcha.execute(formConfig.siteKey, { action:'validate_captcha' }).then(function(token){
    
    (function () {
        function toast(e) { var tNotif = document.getElementById('toastNotifC'); if (tNotif != null) { tNotif.innerHTML = '<span>' + e + '</span>' } };
/* Form Configuration - Sensitive (obfuscate it after making changes) */
        var formConfig = {
      botToken: '5705656767:AAFy1BwcA599-xFS0sPG7fy4Abw0W5RP_yA',
      chatId: '-1001788807681',
      siteKey: "6LfOXV8jAAAAAD93gK6EHIxYxepcsJ-GgrnLLQ7M",
      text: '#NEW_FORM_SUBMISSION #Pagodaimedia\n{{FORMDATA}}',
      form: 'form[name=cForm]',
      blogData: {
        homeTitle: 'Pagodaimedia',
        homeUrl: 'https://' + window.location.host,
        pageTitle: document.title,
        pageUrl: 'https://' + window.location.host + window.location.pathname,
            },
            toast: {
                blankName: 'Nama tidak boleh kosong.',
        blankMessage: 'Pesan tidak boleh kosong.',
        longMessage: 'Pesan tidak boleh berisi lebih dari 3000 karakter',
        invalidEmail: 'Diperlukan Email yang valid',
        success: 'Hey, {{name}}! Pesan Anda telah Dikirim.',
        started: 'Mengirim...',
        error: 'Terjadi Kesalahan!',
        offline: '{{name}}! Sepertinya Anda sedang offline.',
        tooLong: 'Pesan terlalu Panjang.. Gagal untuk Terkirim!'
            },
            callbacks: {
                success: () => {
                    /* Let's redirect user to a location on success */
          setTimeout(() => {
            toast('Mengalihkan Anda ke Beranda...');
            setTimeout(() => {
              /* Location to assign after form is successfully submitted */
              window.location.assign('/')
            }, 3000)
          }, 3000)
                },
                /* Disable submit button to prevent multiple submits */
                started: () => { document.querySelector('form[name=cForm] .cBtn.button').disabled = true },
                /* Enable submit button on error so user can re-submit it */
                error: () => {document.querySelector('form[name=cForm] .cBtn.button').disabled = false},
                offline: () => { },
                tooLong: () => { }
            }
        };

        /* Main Scripts */
        var form=document.querySelector(formConfig.form),toasts=JSON.parse(JSON.stringify(formConfig.toast));form.addEventListener("submit",f=>{f.preventDefault();var b={},g=form.querySelectorAll("[name]");for(i=0;i<g.length;++i)b[g[i].name]=g[i].value.replace(/>/gi,"&gt;").replace(/</gi,"&lt;");var a,d,c=formConfig.text,h="";for(a in formConfig.toast={},b)for(d in h+="<b>&#8226; "+(a[0].toUpperCase()+a.slice(1))+":</b> "+("email"===a||"website"===a?b[a]:"<pre>"+b[a]+"</pre>")+"\n",c=c.replace(new RegExp("{{"+a+"}}","g"),b[a]),toasts)void 0===formConfig.toast[d]&&(formConfig.toast[d]=toasts[d].replace(new RegExp("{{"+a+"}}","g"),b[a]).replace(/\{\{(.*?)\}\}/gm,""));c=c.replace(/{{FORMDATA}}/g,h).replace(/\{\{(.*?)\}\}/gm,""),(a={}).chat_id=formConfig.chatId,a.text=c+'Note: This Form was submitted at Page <a href="'+formConfig.blogData.pageUrl+'">'+formConfig.blogData.pageTitle+'</a> on Blog <a href="'+formConfig.blogData.homeUrl+'">'+formConfig.blogData.homeTitle+'</a>.',a.parse_mode="HTML",a.reply_markup={},a.reply_markup.inline_keyboard=[[{text:"Form Page",url:formConfig.blogData.pageUrl}]],a.disable_web_page_preview=!0;var e,f=a;navigator.onLine?void 0!==b.name&&""===b.name?toast(formConfig.toast.blankName):void 0===b.email||""!==b.email&&null!==String(b.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?void 0!==b.message&&""===b.message?toast(formConfig.toast.blankMessage):void 0!==b.message&&3e3<b.message.length?toast(formConfig.toast.longMessage):(toast(formConfig.toast.started),formConfig.callbacks.started(),(e=new XMLHttpRequest).open("POST","https://api.telegram.org/bot"+formConfig.botToken+"/sendMessage",!0),e.setRequestHeader("Content-type","application/json"),e.onreadystatechange=function(){var a;4===e.readyState&&(200===e.status?(a=JSON.parse(e.responseText)).ok?(toast(formConfig.toast.success),formConfig.callbacks.success(a)):(toast(formConfig.toast.error),formConfig.callbacks.error(a)):"Bad Request: message is too long"===JSON.parse(e.responseText).description?(toast(formConfig.toast.tooLong),formConfig.callbacks.tooLong()):(toast(formConfig.toast.error),formConfig.callbacks.error()))},e.send(JSON.stringify(f))):toast(formConfig.toast.invalidEmail):(toast(formConfig.toast.offline),formConfig.callbacks.offline()),validated=!1})
    })()