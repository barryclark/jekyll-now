const baseurl = "https://purple2m.github.io";

$('.view_recipe').click(function(){
  $('#recipe').toggle();
  var offset = $('#recipe').offset();
  $('html').animate({scrollTop : offset.top}, 400);
});

function isitem(element, item)  {
  if(element.no === item)  {
    return true;
  }
}

let searching_item = getParameterByName('item');
let searching_recipe = getParameterByName('recipe');

function get_recipe(data, lng){
  var step = '';
  var find = '';
  let recipe;
  find += "<ul class=\"normal_alc\">";
  for (var i=0; i < data.normal.length;++i){
    step = data.normal[i].split(',');
    let recipe = step[2].split('-');
    if(lng == "jp"){
      find += "<li class=\""+recipe[0]+"\">"+step[2]+" +"+step[0]+" "+data.name+" ("+step[1]+")</li>";
    } else {
      find += "<li class=\""+recipe[0]+"\">"+step[2]+" +"+step[0]+" "+data.name+" ("+step[1]+")</li>";
    }
  }
  find += "</ul>";

  find += "<ul class=\"top_alc\">";
  for (var i=0; i < data.top.length;++i){
    step = data.top[i].split(',');
    recipe = step[2].split('-');
    if(lng == "jp"){
      find += "<li class=\""+recipe[0]+"\">"+step[2]+" +"+step[0]+" "+data.name+" ("+step[1]+")</li>";
    } else {
      find += "<li class=\""+recipe[0]+"\">"+step[2]+" +"+step[0]+" "+data.name+" ("+step[1]+")</li>";
    }
  }
  find += "</ul>";

  var my_list2=document.getElementById("searching_find");
  my_list2.innerHTML = find;
}

function get_item(item, lng){
  let item_type;
  let item_type1 = item.substr(0, 2);
  let item_type2 = item.substr(2, 2);

  if(item_type1 == 10){ // 무기
    item_type = "weapone";
  } else if(item_type1 == 20){ // 방어구
    item_type = "armor";

  } else if(item_type1 == 30){ // 장신구
    item_type = "accessary";

  } else if(item_type1 == 50){ // 스킬
    item_type = "skill";
  }

  $.getJSON(baseurl+"/item/"+item_type+"/"+item_type2+".json", function(data) {
    const info = data.find(v => v.no == item);

    if (lng == "jp"){
      document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+info.icon+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+info.jp;
    } else {
      document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+info.icon+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+info.name;
    }

    get_recipe(info, lng)
  });
}

if(searching_item){
  get_item(searching_item, lng);
}
if(searching_recipe){
  recipe_reset(searching_recipe, find, lng);
}
$('#searching_recipe input[type=radio][name=recipe_list]').change(function() {
  recipe_reset($(this).val(), find, lng);
});
