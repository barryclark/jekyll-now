var inputs = $('input[type="text"]');
var googleSubmitBtn = $('#google-submit');
var snackbar = $('#snackbar');

var inputName = $('#name');
var inputAge = $('#age');
var inputArea = $('#area');

function isLoading(status){
  if(status){
    $('html, body').addClass('wait');
    googleSubmitBtn.attr('disabled', true).html('입력중...');
  } else {
    $('html, body').removeClass('wait');
    googleSubmitBtn.attr('disabled', false).html('입력');
  }
}

function checkInput(){
  var isEmpty = false;
  $.each(inputs, function (index, element) {
    if (element.value === '') {
      alert('빈 칸이 있어요.');
      isEmpty = true;
      return false;
    }
  });
  return isEmpty;
}

$('#google-submit').click(function () {

  //빈값 체크
  if (checkInput()) { return; }

  // 입력중..
  isLoading(true);

  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;

  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbwUVG8sQzcjHdRE7-4Z30E8HADueT4Fdcepnvd4gFNGFJPkRpQ/exec",
    data: {
      "name": inputName.val(),
      "date": dateString,
      "comment": inputArea.val()
    },
    success: function (response) {
      isLoading(false);

      snackbar.html('입력이 완료됐습니다.').addClass('show');
      setTimeout(function () {
        snackbar.removeClass('show');
      }, 3000);

      //값 비워주기
      inputName.val('');
      inputAge.val('');
      inputArea.val('');
    },
    error: function (request, status, error) {
      isLoading(false);
      console.log("code:" + request.status + "\n" + "error:" + error);
      console.log(request.responseText);
    }
  });
});
