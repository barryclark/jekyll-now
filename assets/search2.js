function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function() {
  $('#autoMaker').hide();
  $('.pull-left').click(function(){
    $('.wrapper-masthead').children(":first").toggle();
    $('.wrapper-masthead').children(":last").toggle();
  });
	//저장
	var item2 = localStorage.getItem('item2');
	var update2 = localStorage.getItem('version2');
  const version2 = 20221112;

	item2 = JSON.parse(item2);

  function auto_come(data){
    var ref = data;
    var isComplete = false;  //autoMaker 자식이 선택 되었는지 여부
    $('#search_area').keyup(function(){
        var txt = $(this).val();
        txt = txt.replace(/ /g, '');
        if(txt != ''){  //빈줄이 들어오면
            $('#autoMaker').show();
            $('#autoMaker').children().remove();

            ref.forEach(function(arg){

                if(arg.name.replace(/ /g, '').indexOf(txt) > -1 || arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                  if(arg.name.replace(/ /g, '').indexOf(txt) > -1){
                    var item_name = arg.name;
                    var lang = "ko";
                  } else if(arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                    var item_name = arg.jp;
                    var lang = "jp";
                  }
                    $('#autoMaker').append(
                        $('<div>').html("<a href='https://purple2m.github.io/"+lang+"/alchemist/?item="+arg.no+"'><img class=\"thumb\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+arg.icon+".png\"\">"+item_name+"</a>").attr({'recipe':arg.recipe})
                    );
                }
            });
            $('#autoMaker').children().each(function(){
                $(this).click(function(){
                    $('#search_area').val($(this).text());
                    $('#insert_target').val($(this).text());
                    $('#autoMaker').children().remove();
                    isComplete = true;
                });
            });
        } else {
            $('#autoMaker').children().remove();
            $('#autoMaker').hide();
        }
    });
    $('#search_area').keydown(function(event){
        if(isComplete) {  //autoMaker 자식이 선택 되었으면 초기화
            $('#insert_target').val('')
        }
    });
  }


	if(typeof item2 === 'undefined' || item2 === null || update2 != version2){
    window.localStorage.clear();
		$.getJSON("https://purple2m.github.io/alchemist/item2.json?version=20220809", function(data) {
			localStorage.setItem('item2', JSON.stringify(data));
      localStorage.setItem('version2', 20221112);
      auto_come(data);
		});
	}else{
    auto_come(item2);
	}
});
