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
  $('.pull-left').click(function(){
    $('.wrapper-masthead').children(":first").toggle();
    $('.wrapper-masthead').children(":last").toggle();
  });
	//저장
	var item = localStorage.getItem('item');
	var update = localStorage.getItem('version');
  const version = 20200728;

	item = JSON.parse(item);

	function datalist_add(datalist, target){
		var str='';
		for (var i=0; i < datalist.length;++i){
			if(datalist[i]['option'] != ""){
				str += "<option value=\""+datalist[i]['name']+"\" label=\""+datalist[i]['recipe']+"\" /></option>";
			}else{
				str += "<option value=\""+datalist[i]['name']+"\" /></option>";
			}
		}
		var my_list=document.getElementById(target);
		if (str) {
			my_list.innerHTML = str;
		}
	}

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
                        $('<div>').html("<a href='https://purple2m.github.io/alchemist/"+lang+"/?item="+arg.name+"'>"+item_name+"</a>").attr({'recipe':arg.recipe})
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


	if(typeof item === 'undefined' || item === null || update != version){
    window.localStorage.clear();
		$.getJSON("https://purple2m.github.io/alchemist/item.json?version=20220728", function(data) {
			localStorage.setItem('item', JSON.stringify(data));
      localStorage.setItem('version', 20200728);
      auto_come(data);
		});

	}else{
    if(item.length != 1174 || update != version){
      window.localStorage.clear();
      $.getJSON("https://purple2m.github.io/alchemist/item.json?version=20220728", function(data) {
				localStorage.setItem('item', JSON.stringify(data));
        localStorage.setItem('version', 20200728);
        auto_come(data);
  		});
    } else {
		    auto_come(item);
    }
	}
});
