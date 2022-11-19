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
    const info = data.find(v => v.no === item);
    console.log(info.name);
  });
}

if(searching_item){

}
if(searching_recipe){
  recipe_reset(searching_recipe, find, lng);
}
$('#searching_recipe input[type=radio][name=recipe_list]').change(function() {
  recipe_reset($(this).val(), find, lng);
});
