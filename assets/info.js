const baseurl = "https://purple2m.github.io";

function isitem(datalist, item){
	var str='';
	for (var i=0; i < datalist.length;++i){
		if(datalist[i]['name'] === item){
			str = datalist[i];
      break;
		}
	}
	return str;
}

function get_recipe(recipe, item, target, lng){
    $.getJSON(baseurl+"/alchemist/"+recipe+".json?version=20220801", function(data) {
      var step = '';
      var print_end = '';
      var find = '';
      for (var i=0; i < data.length;++i){
        step = data[i]['recipe'].split('-');
        if(item == data[i]['name']){
          if(find == ''){
            find += "<ul>";
          }
          if(data[i]['up'] == 0){
            data[i]['up'] = "";
          } else {
            data[i]['up'] = "+"+data[i]['up']+" ";
          }
          if(lng == "jp"){
            find += "<li><span class='slot'>スロット"+step[1]+"</span>"+data[i]['up']+data[i]['jp']+" ("+data[i]['rand']+")</li>";
          } else {
            find += "<li><span class='slot'>슬롯"+step[1]+"</span>"+data[i]['up']+data[i]['name']+" ("+data[i]['rand']+")</li>";
          }
        }
      }
      if (find){
        find += "</ul>";
        var my_list2=document.getElementById("searching_find");
        my_list2.innerHTML = find;
      }
    });
}

var searching_item = getParameterByName('item');
var searching_recipe = getParameterByName('recipe');

if(searching_item){
	// 아이템 형식 뷴류
	const last = searching_item.charAt(0);

	if (last == 1){

	} else if (last == 2){

	} else if (last == 3){

	} else if (last == 4){

	} else if (last == 5){

	}

  var item = localStorage.getItem('item');
  item = JSON.parse(item);

  var find = isitem(item, searching_item);

  if (lng == "jp"){
    document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+find.icon+".png\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+find.jp;
  } else {
    document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+find.icon+".png\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+find.name;
  }

  var find_recipe = find.recipe;
  find_recipe = find_recipe.split(',');
  var find_recipe_print = '';
  for (var i=0; i < find_recipe.length;++i){

    find_recipe_print += "<input type=\"radio\" id=\"recipe_list"+find_recipe[i]+"\" name=\"recipe_list\" value=\""+find_recipe[i]+"\">";
    find_recipe_print += "<label for=\"recipe_list"+find_recipe[i]+"\">";
    if (lng == "jp"){
      find_recipe_print += "ふつう錬金"+find_recipe[i];
    } else {
      find_recipe_print += "일반 연금"+find_recipe[i];
    }
    find_recipe_print += "</label>";
  }
  document.getElementById("searching_recipe").innerHTML = find_recipe_print;

  $.getJSON("https://api-goats.plaync.com/search/l2m/collections?page=1&size=50&search_keyword="+find.name, function(data) {
    if (lng == "jp"){
      var option_lng;
      $.getJSON(baseurl+"/alchemist/option.json?version=20220801", function(data2) {
        option_lng = data2;
        col_option(data, data2, lng, baseurl);
      });
    } else {
      col_option(data, option_lng, lng, baseurl);
    }
  });
}
function col_option(data, option_lng, lng, baseurl){
  var col_print = "";
  for (var i=0; i < data.contents.length;++i){
    var col_option = "";
    for (var o=0; o < data.contents[i].options.length;++o){
      col_option += "<span>";
      col_option += data.contents[i].options[o].option_name;
      col_option += data.contents[i].options[o].display;
      col_option += "</span>";
    }
    col_option = "<h4>"+col_option+"</h4>";
    var col_item = "";
    for (var o=0; o < data.contents[i].items.length;++o){
      col_item_icon = data.contents[i].items[o].image;
      col_item_name = data.contents[i].items[o].item_name;
      col_item_enchant_level = data.contents[i].items[o].enchant_level;
      col_item += "<li>";
      if(lng == "jp"){
        col_item += "<a href='"+baseurl+"/jp/alchemist/?item="+col_item_name+"'>";
      } else {
        col_item += "<a href='"+baseurl+"/ko/alchemist/?item="+col_item_name+"'>";
      }
      col_item += "<img class=\"thumb\" src=\""+col_item_icon+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\"><span>+"+col_item_enchant_level+"</span>";
      col_item += "</a></li>";
    }
    col_print += "<div>"+col_option + "" + "<ul>" + col_item + "</ul>"+"</div>";
  }
  if (lng == "jp"){
    for (var i=0; i < option_lng.kor.length;++i){
      if(col_print.includes(option_lng.kor[i])){
        var regex = new RegExp(option_lng.kor[i], 'g');
        col_print = col_print.replace(regex, option_lng.jp[i]);
      }
    }
  }
  document.getElementById("collections").innerHTML = col_print;
}

function recipe_reset(searching_recipe, find, lng){
  if(searching_recipe){
    var recipe = get_recipe(searching_recipe, find.name, "recipe", lng);
    var recipe_material = "<ul class='recipe_list'>";
    $.getJSON(baseurl+"/alchemist/recipe.json?version=20220801", function(data) {
      for (var i=0; i < data.length;++i){
        if(data[i]['no'] == searching_recipe){
          for (var j=0; j < data[i]['recipe'].length;++j){
            if (lng == "jp"){
              find_recipe = data[i]['jp'][j].split(',');
            } else {
              find_recipe = data[i]['recipe'][j].split(',');
            }

            if(find_recipe[0] === undefined){
              find_recipe[0] = '';
            } else {
              recipe_material += "<li>";
              recipe_material += "<span>"+find_recipe[0]+"</span>";
            }

            if(find_recipe[1] === undefined){
              find_recipe[1] = '';
            } else {
              recipe_material += "<span>"+find_recipe[1]+"</span>";
            }

            if(find_recipe[2] === undefined){
              find_recipe[2] = '';
            } else {
              recipe_material += "<span>"+find_recipe[2]+"</span>";
            }

            if(find_recipe[3] === undefined){
              find_recipe[3] = '';
            } else {
              recipe_material += "<span>"+find_recipe[3]+"</span>";
            }

            if(find_recipe[4] === undefined){
              find_recipe[4] = '';
            } else {
              recipe_material += "<span>"+find_recipe[4]+"</span>";
            }
            if(find_recipe[0] === undefined){
              recipe_material += "</li>";
            }
          }

          break;
        }
      }
      if (recipe_material != "<ul class='recipe_list'>"){
        recipe_material += "</ul>";
        document.getElementById("recipe_material").innerHTML = recipe_material;
      }
    });
  }
}
if(searching_recipe){
  recipe_reset(searching_recipe, find, lng);
}
$('#searching_recipe input[type=radio][name=recipe_list]').change(function() {
  recipe_reset($(this).val(), find, lng);
});
