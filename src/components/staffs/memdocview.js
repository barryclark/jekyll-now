"use strict";

function memberDocumentView() {

  document.addEventListener('DOMContentLoaded', function() {

    var db = firebase.firestore();
    db.collection("members").where("group", "==", "tachikawa")
      .get()
      .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
          if (doc.exists) {
            //console.log("DB呼出が可能:", doc.data()); 
            var strHTML = '<div class="member-tile">'
              + '<div><img border="0" src="' + doc.data().imageURL + '" width="80">'
              + '<span class="showname">' + doc.data().nickname + '</span></div>'
              + '<span class="badge badge-primary">' + doc.data().title + '</span> '
              + '<span class="badge badge-secondary">' + doc.data().gender + '</span> '
              + '<span class="badge badge-info">' + doc.data().expertise + '</span> '
              + '<span class="badge badge-success">' + doc.data().skill + '</span> '
              + '<span class="badge badge-warning">' + doc.data().hobby + '</span> '
              + '<div class="showmessage">' + doc.data().message + '</div>'
              + '<span class="showcontributor">' + doc.data().docid + '</span> '
              + '<span class="showcontributor">' + doc.data().uid + '</span> '
              + '<span class="showcontributor">' + doc.data().point + '</span> '
              + '<span class="showcontributor">' + doc.data().timestamp + '</span> '
              + '</div>';
            document.getElementById('member-list').insertAdjacentHTML('afterbegin', strHTML);
          } else {
            console.log("DB呼出できない");
          }
        })

      })
      .catch(function(error) {
        console.log("DB読み込みでエラー発生:", error);
      }); // db.collection

  }); // document.addEventListener
}



// -------------------- xxx.js ---------------------
//function memDocView() {
//var docRef = db.collection("members").doc("1ese643pRjo7p5qrUWxN");
//docRef.get().then(function(doc) {
//document.getElementById('memberDocid').textContent = doc.data().docid;
//document.getElementById('memberUserid').textContent = doc.data().uid;
//document.getElementById('memberImageURL').textContent = doc.data().imageURL;
//document.getElementById('memberNickname').textContent = doc.data().nickname;
//document.getElementById('memberTitle').textContent = doc.data().title;
//document.getElementById('memberGender').textContent = doc.data().gender;
//document.getElementById('memberExpertise').textContent = doc.data().expertise;
//document.getElementById('memberSkill').textContent = doc.data().skill;
//document.getElementById('memberHobby').textContent = doc.data().hobby;
//document.getElementById('memberMessage').textContent = doc.data().message;
//document.getElementById('memberPoint').textContent = doc.data().point;
//document.getElementById('memberTimestamp').textContent = doc.data().timestamp;
//}  // function

// -------------------- xxx.html ---------------------
//<div class="member-tile">
//<!--<img [src]="iconNobody" alt="ユーザ名無し">-->
//<span class="showcontributor"><div id="memberDocid">読み込み中</div></span>
//<span class="showcontributor"><div id="memberUserid">読み込み中</div></span>
//<span class="showcontributor"><div id="memberImageURL">読み込み中</div></span>
//<span class="showcontributor"><div id="memberNickname">読み込み中</div></span>
//<span class="badge badge-primary"><div id="memberTitle">読み込み中</div></span>
//<span class="badge badge-secondary"><div id="memberGender">読み込み中</div></span>
//<span class="badge badge-info"><div id="memberExpertise">読み込み中</div></span>
//<span class="badge badge-success"><div id="memberSkill">読み込み中</div></span>
//<span class="badge badge-warning"><div id="memberHobby">読み込み中</div></span>
//<span class="showmessage"><div id="memberMessage">読み込み中</div></span>
//<span class="showcontributor"><div id="memberPoint">読み込み中</div></span>
//<span class="showcontributor"><div id="memberTimestamp">読み込み中</div></span>
//</div> <!-- member-title -->
//<script>
//  memDocView();
//</script>
