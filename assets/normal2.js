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
function find_recipe(searching_recipe, type, lng){
  var recipe_material = "<ul class='recipe_list'>";
    $.getJSON(baseurl+"/alchemist/"+type+".json?version=20220801", function(data) {
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

let searching_item = getParameterByName('item');
let searching_recipe = getParameterByName('recipe');

function get_recipe(data, lng){
  var step = '';
  var find = '';
  let recipe;

  find += "<ul class=\"normal_alc\">";
  for (var i=0; i < data.normal.length;++i){
    step = data.normal[i].split(',');
    recipe = step[2].split('-');
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

$('#searching_find ul li').click(function(){
  var className = $(this).attr('class');
  find_recipe(className, "recipe", lng);
  $('#recipe_material').show();
});

$('#searching_recipe input[type=radio][name=recipe_list]').change(function() {
  recipe_reset($(this).val(), find, lng);
});
