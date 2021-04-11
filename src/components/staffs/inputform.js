"use strict";

// 新規レコードの登録（メンバー追加）
function writeForm(strUID){
  var strHTML = ''
    + '<form>'
    + '<input type="hidden" name="docid" value="id123456">'
    + '<input type="text" name="userid" value="' + strUID + '">'
    + '<p>あとでuidをhiddenにする</p>'
    + '<div class="form-box">'
    + '  <input type="radio" name="group" value="tachikawa">立川　'
    + '  <input type="radio" name="group" value="ome">青梅　'
    + '</div>'
    + '<input type="hidden" name="imageURL" value="https://firebasestorage.googleapis.com/v0/b/member-cd.appspot.com/o/avaters%2F03robot.png?alt=media&token=dbe4018d-f308-4e3a-be9e-b8d4ac59729a">'
    + '<input type="button" value="アバター画像を選ぶ" onClick="avaterView()">'
    + '<div id="avatarListPath"></div>'
    + '<div class="form-box">'
    + '  <input type="text" name="nickname" placeholder="ニックネームを入力してください">'
    + '</div>'
    + '<div class="form-box">'
    + '  <input type="radio" name="title" value="メンター">メンター　'
    + '  <input type="radio" name="title" value="ボランティア">ボランティア　'
    + '  <input type="radio" name="title" value="主宰">主宰　'
    + '</div>'
    + '<div class="form-box">'
    + '  <input type="radio" name="gender" value="男性">男性　'
    + '  <input type="radio" name="gender" value="女性">女性　'
    + '</div>'
    + '<div class="form-box">'
    + '  <input type="radio" name="expertise" value="エンジニア職">エンジニア職　'
    + '  <input type="radio" name="expertise" value="事務職">事務職　'
    + '  <input type="radio" name="expertise" value="学生">学生　'
    + '  <input type="radio" name="expertise" value="その他">その他　'
    + '</div>'
    + '<div class="form-box">'
    + '  <input type="checkbox" name="skill" value="Scratch"> Scratch　'
    + '  <input type="checkbox" name="skill" value="micro:bit"> micro:bit　'
    + '  <input type="checkbox" name="skill" value="EV3"> EV3　'
    + '  <input type="checkbox" name="skill" value="minecraft"> minecraft　'
    + '  <input type="checkbox" name="skill" value="Office/VBA"> Office/VBA　'
    + '  <input type="checkbox" name="skill" value="python"> python　'
    + '  <input type="checkbox" name="skill" value="javascript"> javascript　'
    + '  <input type="checkbox" name="skill" value="HTML/CSS"> HTML/CSS　'
    + '  <input type="checkbox" name="skill" value="C/C++/C#"> C/C++/C#　'
    + '  <input type="checkbox" name="skill" value="Ruby/PHP/.Net"> Ruby/PHP/.Net　'
    + '  <input type="checkbox" name="skill" value="Illustrator系"> Illustrator系　'
    + '  <input type="checkbox" name="skill" value="Photoshop系"> Photoshop系　'
    + '  <input type="checkbox" name="skill" value="インフラ"> インフラ　'
    + '  <input type="checkbox" name="skill" value="[Windows]"> Windows　'
    + '  <input type="checkbox" name="skill" value="[Linux]"> Linux　'
    + '  <input type="checkbox" name="skill" value="[mac]"> mac　'
    + '  <input type="checkbox" name="skill" value="[RaspberryPi]"> Raspberrypi　'
    + '</div>'
    + '<div class="form-box">'
    + '  <label>好きなコトを追加してください（複数可）</label>'
    + '  <div id="hobbyList"></div>'
    + '  <input type="hidden" name="hobby" value="">'
    + '  <input type="text" id="addHobby"><button type="button" onclick="ClickAddHobby()">追加'
    + '</div>'
    + '<div class="form-box">'
    + '  <textarea name="message" cols="50" rows="5" placeholder="自己紹介メッセージを入力してください"></textarea>'
    + '</div>'
    + '</form>'
    + '<p><input class="btn btn-success" type="button" value="新規登録する" onClick="MemberDocAdd()"></p>';
  document.getElementById('inputform').insertAdjacentHTML('afterend', strHTML);
}

function ClickAddHobby() {
  var strTemp = document.getElementById('addHobby').value;
  var strHTML = '  <input type="checkbox" name="hobby" value="' +strTemp+ '" checked="checked"> ' +strTemp+ '　';
  document.getElementById('hobbyList').insertAdjacentHTML('afterend', strHTML);
  document.getElementById('addHobby').value = "";
}

// メンバーの属性を［firebase firestore］から読み込む
function MemberDocRead(strUID) {
    console.log("デバッグ uid=" + strUID);
    var db = firebase.firestore();
    db.collection("members").where("uid", "==", strUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            console.log("DB呼出が可能:", doc.data()); 
            var strHTML = '<form>'
            + '<input type="hidden" name="docid" value="id123456">'
            + '<input type="text" name="userid" value="' + strUID + '">'
            + '<p>あとでuidをhiddenにする</p>'
            + '<div class="form-box">'
            + '  <input type="radio" name="group" value="tachikawa">立川　'
            + '  <input type="radio" name="group" value="ome">青梅　'
            + '</div>'
            + '<div id="id_imageURL"></div>'
            + '<input type="hidden" name="imageURL" value="https://firebasestorage.googleapis.com/v0/b/member-cd.appspot.com/o/avaters%2F03robot.png?alt=media&token=dbe4018d-f308-4e3a-be9e-b8d4ac59729a">'
            + '<input type="button" value="アバター画像を選ぶ" onClick="avaterView()">'
            + '<div id="avatarListPath"></div>'
            + '<div class="form-box">'
            + '  <input type="text" id="nickname" name="nickname" placeholder="ニックネームを入力してください">'
            + '</div>'
            + '<div class="form-box">'
            + '  <input type="radio" name="title" value="メンター">メンター　'
            + '  <input type="radio" name="title" value="ボランティア">ボランティア　'
            + '  <input type="radio" name="title" value="主宰">主宰　'
            + '</div>'
            + '<div class="form-box">'
            + '  <input type="radio" name="gender" value="男性">男性　'
            + '  <input type="radio" name="gender" value="女性">女性　'
            + '</div>'
            + '<div class="form-box">'
            + '  <input type="radio" name="expertise" value="エンジニア職">エンジニア職　'
            + '  <input type="radio" name="expertise" value="事務職">事務職　'
            + '  <input type="radio" name="expertise" value="学生">学生　'
            + '  <input type="radio" name="expertise" value="その他">その他　'
            + '</div>'
            + '<div class="form-box">'
            + '  <input type="checkbox" name="skill" value="Scratch"> Scratch　'
            + '  <input type="checkbox" name="skill" value="micro:bit"> micro:bit　'
            + '  <input type="checkbox" name="skill" value="EV3"> EV3　'
            + '  <input type="checkbox" name="skill" value="minecraft"> minecraft　'
            + '  <input type="checkbox" name="skill" value="Office/VBA"> Office/VBA　'
            + '  <input type="checkbox" name="skill" value="python"> python　'
            + '  <input type="checkbox" name="skill" value="javascript"> javascript　'
            + '  <input type="checkbox" name="skill" value="HTML/CSS"> HTML/CSS　'
            + '  <input type="checkbox" name="skill" value="C/C++/C#"> C/C++/C#　'
            + '  <input type="checkbox" name="skill" value="Ruby/PHP/.Net"> Ruby/PHP/.Net　'
            + '  <input type="checkbox" name="skill" value="Illustrator系"> Illustrator系　'
            + '  <input type="checkbox" name="skill" value="Photoshop系"> Photoshop系　'
            + '  <input type="checkbox" name="skill" value="インフラ"> インフラ　'
            + '  <input type="checkbox" name="skill" value="[Windows]"> Windows　'
            + '  <input type="checkbox" name="skill" value="[Linux]"> Linux　'
            + '  <input type="checkbox" name="skill" value="[mac]"> mac　'
            + '  <input type="checkbox" name="skill" value="[RaspberryPi]"> Raspberrypi　'
            + '</div>'
            + '<div class="form-box">'
            + '  <label>好きなコトを追加してください（複数可）</label>'
            + '  <div id="hobbyList"></div>'
            + '  <input type="hidden" name="hobby" value="">'
            + '  <input type="text" id="addHobby"><button type="button" onclick="ClickAddHobby()">追加'
            + '</div>'
            + '<div class="form-box">'
            + '  <textarea name="message" cols="50" rows="5" placeholder="自己紹介メッセージを入力してください" >' + doc.data().message + '"</textarea>'
            + '</div>'
            + '</form>'
            + '<p><input class="btn btn-success" type="button" value="変更する" onClick="MemberDocAdd()"></p>';
            //var strHTML = '<div class="member-tile">'
            //  + '<div><img border="0" src="' + doc.data().imageURL + '" width="80">'
            //  + '<span class="showname">' + doc.data().nickname + '</span></div>'
            //  + '<span class="badge badge-primary">' + doc.data().title + '</span> '
            //  + '<span class="badge badge-secondary">' + doc.data().gender + '</span> '
            //  + '<span class="badge badge-info">' + doc.data().expertise + '</span> '
            //  + '<span class="badge badge-success">' + doc.data().skill + '</span> '
            //  + '<span class="badge badge-warning">' + doc.data().hobby + '</span> '
            //  + '<div class="showmessage">' + doc.data().message + '</div>'
            //  + '<span class="showcontributor">' + doc.data().docid + '</span> '
            //  + '<span class="showcontributor">' + doc.data().uid + '</span> '
            //  + '<span class="showcontributor">' + doc.data().point + '</span> '
            //  + '<span class="showcontributor">' + doc.data().timestamp + '</span> '
            //  + '</div>';
            document.getElementById('member-modify').insertAdjacentHTML('afterbegin', strHTML);
            // イメージ画像
            var strHTML = '<div><img border="0" src="' + doc.data().imageURL + '" width="80">'
            document.getElementById('id_imageURL').insertAdjacentHTML('afterbegin', strHTML);
            // ニックネーム
            document.getElementById('nickname').value = doc.data().nickname;
            // 道場
            switch(doc.data().group) {
              case 'tachikawa':
                document.getElementsByName('group')[0].checked = true;
                break;
              case 'ome':
                document.getElementsByName('group')[1].checked = true;
                break;
            }
            // 役割（title）
            switch(doc.data().title) {
              case 'メンター':
                document.getElementsByName('title')[0].checked = true;
                break;
              case 'ボランティア':
                document.getElementsByName('title')[1].checked = true;
                break;
              case '主宰':
                document.getElementsByName('title')[2].checked = true;
                break;
            }
            // 男性女性
            switch (doc.data().gender) {
              case '男性':
                document.getElementsByName('gender')[0].checked = true;
                break;
              case '女性':
                document.getElementsByName('gender')[1].checked = true;
                break;
            }
            // 職業
            switch(doc.data().expertise) {
              case 'エンジニア職':
                document.getElementsByName('expertise')[0].checked = true;
                break;
              case '事務職':
                document.getElementsByName('expertise')[1].checked = true;
                break;
              case '学生':
                document.getElementsByName('expertise')[2].checked = true;
                break;
              case 'その他':
                document.getElementsByName('expertise')[3].checked = true;
                break;
              default:
                break;
            }
            // スキル
            if(doc.data().skill == 'Scratch')   {document.getElementsByName('skill')[0].checked = true;}
            if(doc.data().skill == 'micro:bit') {document.getElementsByName('skill')[1].checked = true;}
            if(doc.data().skill == 'EV3')       {document.getElementsByName('skill')[2].checked = true;}
            if(doc.data().skill == 'minecraft') {document.getElementsByName('skill')[3].checked = true;}
            if(doc.data().skill == 'Office/VBA') {document.getElementsByName('skill')[4].checked = true;}
            if(doc.data().skill == 'python')    {document.getElementsByName('skill')[5].checked = true;}
            if(doc.data().skill == 'javascript') {document.getElementsByName('skill')[6].checked = true;}
            if(doc.data().skill == 'HTML/CSS') {document.getElementsByName('skill')[7].checked = true;}
            if(doc.data().skill == 'C/C++/C#') {document.getElementsByName('skill')[8].checked = true;}
            if(doc.data().skill == 'Ruby/PHP/.Net') {document.getElementsByName('skill')[9].checked = true;}
            if(doc.data().skill == 'Illustrator系') {document.getElementsByName('skill')[10].checked = true;}
            if(doc.data().skill == 'Photoshop系') {document.getElementsByName('skill')[11].checked = true;}
            if(doc.data().skill == 'インフラ') {document.getElementsByName('skill')[12].checked = true;}
            if(doc.data().skill == 'Windows') {document.getElementsByName('skill')[13].checked = true;}
            if(doc.data().skill == 'Linux')   {document.getElementsByName('skill')[14].checked = true;}
            if(doc.data().skill == 'mac')     {document.getElementsByName('skill')[15].checked = true;}
            if(doc.data().skill == 'Raspberrypi') {document.getElementsByName('skill')[16].checked = true;}
            // 好きなこと
            doc.data().hobby.split('　').forEach( function( value ) {
              var strHTML = '  <input type="checkbox" name="hobby" value="' +value+ '" checked="checked"> ' +value+ '　';
              document.getElementById('hobbyList').insertAdjacentHTML('afterend', strHTML);
            })
          }// else {
            //　新規レコードを作成する。
            //console.log("UIDが見つからないので新規登録するそうだ(" + strUID +")");
            //writeForm(strUID);
          //}
        })
      })
      .catch(function(error) {
        console.log("DB読み込みでエラー発生:", error);
      }); // db.collection
}

// メンバーの属性を［firebase firestore］に書き込む
function MemberDocAdd() {
  var db = firebase.firestore();
  db.collection("members").add({
    docid: document.forms['MemberAdd'].elements['docid'].value,
    uid: document.forms['MemberAdd'].elements['userid'].value,
    group: document.forms['MemberAdd'].elements['group'].value,
    imageURL: document.forms['MemberAdd'].elements['imageURL'].value,
    nickname: document.forms['MemberAdd'].elements['nickname'].value,
    title: document.forms['MemberAdd'].elements['title'].value,
    gender: document.forms['MemberAdd'].elements['gender'].value,
    expertise: document.forms['MemberAdd'].elements['expertise'].value,
    skill: document.forms['MemberAdd'].elements['skill'].value,
    hobby: document.forms['MemberAdd'].elements['hobby'].value,
    message: document.forms['MemberAdd'].elements['message'].value,
    point: 0,
    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  })
  .then(function(docRef){
    // 新しいレコードの登録が成功したらリロードする
    console.log("docID:", docRef.id);
    document.location.reload();
  })
  .catch(function(error){console.log("error:", error)});

  document.MemberAdd.action = "/index.html"; //index.htmlに戻る
}

// ボタン［画像テスト表示］ 
function avaterView() {
  var strHTML = '<table border="0"><tr><td>';
  strHTML = strHTML + '<div id="img"></div><div id="avaRad1"></div>';
  strHTML = strHTML + '</td></tr></table>';
  var storageRef = firebase.storage().ref();
  var listRef = storageRef.child('avaters');

  listRef.listAll().then(function(res){
    res.items.forEach(function(folderRef){
      var avaterImage = storageRef.child(folderRef.fullPath);
      var additionalImage = document.createElement('img');
      avaterImage.getDownloadURL().then(function(url){
        additionalImage.src = url;
        // アバターを選べるようにラジオボタンを追加する
        console.log('items:',folderRef.fullPath);
        console.log('image:',additionalImage);
        var strAva = '  <input type="radio" name="avatarpath" value="' + folderRef.fullPath + '" checked="checked"> ' + folderRef.fullPath + ' ';
        document.getElementById('avaRad1').insertAdjacentHTML('beforeend', strAva);
        document.getElementById('img').appendChild(additionalImage);
      });
    });
    console.log(strHTML);
    document.getElementById('avatarListPath').insertAdjacentHTML('beforeend', strHTML);
  });

  //var strFilename = "avaters/04robot.png";
  //var avaterImage = storageRef.child(strFilename);
  //console.log('ストレージのパス:', avaterImage);
  //avaterImage.getDownloadURL().then(function(url){
  //  document.getElementById('avaterView').style.backgroundImage = 'url(' + url + ')';
  //}).catch(function(error){
  //  console.log('画像が見つかりません', strFilename)
  //});
}

// 画像ファイルを［Firebase Storage］にアップロードする。
function MemberFileUpload() {
  var formFileUp = document.getElementById('btnUpload');
  formFileUp.addEventListener('change', function (e) {
    e.preventDefault();  // ページ遷移をキャンセル
    var fileObj = e.target.files; // ←ここで画像ファイルを取得する

    // （検査）WEBブラウザが File API に対応しているか確認
    if(window.File && window.FileReader && window.FileList && window.Blob) {
      //console.log('大丈夫、File API対応のブラウザだよ');
    } else {
      file.style.display = 'none';
      result.innerHTML = 'ファイルを選択できるWEBブラウザを利用ください（このブラウザはFile API非対応）';
      return;
    }
    if(!fileObj[0].type.match('image.*')) { alert('有効な画像ではありません'); return; }
    if(fileObj[0].size > 1000000) { alert('1MB未満のファイルのみアップロード可能です'); return; }
    var reader = new FileReader();
    // ファイルを読込実行
    reader.readAsDataURL(fileObj[0]);
    // ファイルを読み終わったら↓を実行する
    reader.onload = function() { 
      var img = document.createElement('img');
      img.src = reader.result;
      document.getElementById('imageOne').appendChild(img);

      // アップロードする画像を80x80にリサイズしよう
      // 画像ファイルをID<imageOne>に表示する
      var canvas = document.getElementById('canvas-area');
      var context = canvas.getContext('2d'); // 描画を有効にする
      canvas.height = 80;
      canvas.width = 80;
      canvas.style.backgroundColor = "rgb(100,150,100)";
      var imgResize = new Image();
      imgResize.src = img.src;
      //画像をオブジェクトに取り込んだら、画像を80x80にリサイズして表示する;
      imgResize.onload = function() {
        context.drawImage(imgResize,0,0,260,225,0,0,80,80);
      }

      UploadToStorage();
      async function UploadToStorage() {
      let imgBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      console.log(imgBlob);

      // 画像イメージをアップロードする
      var storageRef = firebase.storage().ref();
      storageRef.child('avaters/' + fileObj[0].name).put(imgBlob);
      console.log("File upload completed");
      }
      //canvas.image.toBlob(function(blob){
      //  storageRef.child('avaters/' + fileObj[0].name).put(blob);
      //  console.log("File upload completed");
      //}, 'image/png');
    }
  });  
}