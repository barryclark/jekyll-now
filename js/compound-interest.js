$(document).ready(function() {
  var start;
  var rate;
  var period;
  var invest;
  var years;

	if(hasKey('start') && hasKey('rate') && hasKey('period') && hasKey('invest')) {
		
	} else {
		start = 100;
    rate = 0.01;
    period = 12;
    invest = 10;
    years = 2;
	}
  
  var balance = ['balance', start];
  var interest = ['interest', 0];
  var deposits = ['deposit', 0];
  var time = ['0'];
  
  var previous = start;
  
  for(var p = 1; p <= period * years; p++) {
    balance.push(previous);
    interest.push(previous * rate / period);
    deposits.push(invest);
    time.push((p / period).toString());
    previous = previous + previous * rate / period + invest;
  }
  
  c3.generate({
    bindto: '#interest-chart',
    data: {
        columns: [balance, interest, deposits],
        type: 'bar',
    	groups: [['balance', 'interest', 'deposit']],
	order: null
    },
    axis: {
    	x: {categories: time,
		label: {text: 'time', position: 'outer-center'}},
    	y: {label: {text: 'money', position: 'outer-middle'}}
    }
  });
});
