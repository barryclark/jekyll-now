var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");
var rangeTotal = document.getElementById("rs-total");
var rangeInvestment = document.getElementById("rs-investment");

var rangeWithoutContributors = document.getElementById("rs-without-contributors");
var rangePublish = document.getElementById("rs-publish");
var rangeTriar = document.getElementById("rs-triar");
var rangeContact = document.getElementById("rs-contact");
var rangeTests = document.getElementById("rs-tests");
var rangeInterview = document.getElementById("rs-interview");
var rangeWithoutPerMonth = document.getElementById("rs-without-month");
var rangeWithoutTotal = document.getElementById("rs-without-total");


rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  let rangerValue = rangeSlider.value;
  rangeBullet.innerHTML = rangerValue;

  // empreguei results
  rangeTotal.innerHTML = getValueByContributors(rangerValue).formatMoney(2, "", ".", ",");
  rangeInvestment.innerHTML = getInvestmentByContributors(rangerValue).formatMoney(2, "R$ ", ".", ",");

  // without empreguei results
  rangeWithoutContributors.innerHTML = Math.ceil((rangerValue * 0.33))
  rangePublish.innerHTML = withoutPublish(rangerValue).formatMoney(2, "", ".", ",");
  rangeTriar.innerHTML =  withoutTriage(rangerValue).formatMoney(2, "", ".", ",");
  rangeContact.innerHTML =  withoutContact(rangerValue).formatMoney(2, "", ".", ",");
  rangeTests.innerHTML =  withoutTests(rangerValue).formatMoney(2, "", ".", ",");
  rangeInterview.innerHTML =  withoutInterview(rangerValue).formatMoney(2, "", ".", ",");
  rangeWithoutTotal.innerHTML = withoutTotal(rangerValue).formatMoney(2, "", ".", ",");
  rangeWithoutPerMonth.innerHTML = (withoutTotal(rangerValue) / 12).formatMoney(2, "", ".", ",");
}

function withoutPublish (count){
  let percent = count * 0.33;
  return percent * 34.09;
}

function withoutTriage (count){
  let percent = count * 0.33;
  return percent * 238.64;
}

function withoutContact (count){
  let percent = count * 0.33;
  return percent * 102.27;
}

function withoutTests (count){
  let percent = count * 0.33;
  return percent * 511.36;
}

function withoutInterview (count){
  let percent = count * 0.33;
  return percent * 272.73;
}

function withoutTotal (count){
  var publish = withoutPublish(count);
  var triar = withoutTriage(count);
  var contact  = withoutContact(count);
  var tests = withoutTests(count);
  var interview = withoutInterview(count);
  return  (publish + triar + contact + tests + interview);
}

function getValueByContributors (count) {
  if (count <= 10){
    return 99;
  }
  if (count >= 11 && count <= 20){
    return 149;
  }
  if (count >= 21 && count <= 40){
    return 249;
  }
  if (count >= 41 && count <= 60){
    return 319;
  }
  if (count >= 61 && count <= 100){
    return 479;
  }
  if (count >= 101 && count <= 200){
    return 729;
  }
  if (count >= 201 && count <= 300){
    return 999;
  }
  if (count >= 301 && count <= 500){
    return 1499;
  }
}

function getInvestmentByContributors(count){
  if (count <= 10){
    return 300;
  }
  if (count >= 11 && count <= 20){
    return 300;
  }
  if (count >= 21 && count <= 40){
    return 300;
  }
  if (count >= 41 && count <= 60){
    return 550;
  }
  if (count >= 61 && count <= 100){
    return 550;
  }
  if (count >= 101 && count <= 200){
    return 1000;
  }
  if (count >= 201 && count <= 300){
    return 1000;
  }
  if (count >= 301 && count <= 500){
    return 2000;
  }
}

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};