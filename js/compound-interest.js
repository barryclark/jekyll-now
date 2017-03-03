$(document).ready(function() {
  var start;
  var rate;
  var period;
  var invest;
  var years;

	if(hasKey('start') && hasKey('rate') && hasKey('period') && hasKey('invest')) {
		
	} else {
		start = 10000;
    rate = 0.01;
    period = 12;
    invest = 100;
    years = 10;
	}
  
  var balance = ['balance', start];
  var interest = ['interest', 0];
  var deposits = ['deposits', invest];
  
  var previous = start;
  
  for(var year = 0; year <= years; year++) {
    balance.push(previous);
    interest.push(previous * rate / period);
    deposits.push(invest);
    
    previous = previous + previous * rate / period + invest;
  }
  
  c3.generate({
    bindto: '#interest-chart',
    data: {
        columns: [balance, interest, deposits],
        type: 'bar'
    }
  });
}
