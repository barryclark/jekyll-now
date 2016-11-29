function DebtProto() {
	this.getMinPayment = function() {
	    var payment;
		
	    if(this.minpaymenttype === 'percent') {
			payment = Math.max(Math.round(this.balance * this.minpayment), 1);
	    } else {
			payment = this.minpayment;
	    }
	    
	    return Math.min(payment, this.balance);
	};
	this.update = function() {
	    this.balance = this.balance * (1 + this.rate / 12);
	    this.balance = Math.round(this.balance);
	    return this.pay(this.getMinPayment());
	};
	this.pay = function(amount) {
	    var extra = 0;
	    this.balance = this.balance - amount;
		
	    if(this.balance <= 0) {
		extra = - this.balance;
		this.balance = 0;
		this.minpayment = 0;
	    }
		
	    return extra;
	};
}

function Debt(name, balance, rate, minpayment, minpaymenttype) {
	this.name = name;
	this.balance = balance;
	this.rate = rate;
	this.minpayment = minpayment;
	this.minpaymenttype = minpaymenttype;
	$.extend( this, new DebtProto() );
}

function avalanche(debts, method, totalPayment) {	
	var snowball = totalPayment - sumMinpayments(debts);
	
	snowball = snowball + payDebts(debts);

	while(snowball > 0) {
		debts = getDebtsWithBalances(debts);
		if(debts.length > 0 ){
			var avalanche = method(debts);
			snowball = avalanche.pay(snowball);	
		} else {
			snowball = 0;	
		}
	}
}

function payDebts(debts) {
   return debts.reduce(function(p, c){return p + c.update();}, 0);	
}

function getDebtsWithBalances(debts) {
    return debts.filter(function(debt) {return debt.balance > 0;});	
}
	
function sumBalances(debts) {
    return debts.reduce(function(p, c){return p + c.balance;}, 0);
}
	
function sumMinpayments(debts) {
    return debts.reduce(function(p, c) {return p + c.getMinPayment();}, 0);
}

function totalAccounts(debts) {
    return debts.reduce(function(p, c){return p + Math.min(c.balance, 1);}, 0);
}

function lowestBalance(debts){
    return debts.reduce(function(p, c) {
        if(p == null) {
		return c;
	} else if(p.balance > c.balance) {
		return c;
	} else if(p.balance === c.balance) {
		if(p.rate < c.rate) {
			return c;
		} else {
			return p;
		}
	} else {
		return p;
	}
    });
}

function highestRate(debts) {
    return debts.reduce(function(p, c) {
        if(p == null) {
		return c;
	} else if(p.rate < c.rate) {
		return c;
	} else if(p.rate === c.rate) {
		if(p.balance > c.balance) {
			return c;
		} else {
			return p;
		}
	} else {
		return p;
	}
    });
}

function usingMethod(debts, method) {
	var numOpen = totalAccounts(debts);
	var totalPayment = sumMinpayments(debts);
	
	var results = {
			balances: [['month', 'balance', 'minimum payment'],
				  [0, sumBalances(debts), sumMinpayments(debts)]],
			accounts: [['month','number of debts'],
				   [0, numOpen]],
			totalPaid: 0,
			months: 0
	};
	
	var month = 1;
	
	for(var balance = sumBalances(debts); balance > 0 && month <= 500; balance = sumBalances(debts), month++) {
		
		if(typeof method !== 'undefined') {
			avalanche(debts, method, totalPayment);
		} else {
			payDebts(debts);
		}
        		
		if(month % 12 === 0) {
			results.balances.push([month, balance, sumMinpayments(debts)]);	
		}
		
		var nowNumOpen = totalAccounts(debts);
		
		if(nowNumOpen !== numOpen) {
			results.accounts.push([month, nowNumOpen]);
			numOpen = nowNumOpen;
		}
		
		if(typeof method !== 'undefined') {
			if(totalPayment < sumBalances(debts)) {
				results.totalPaid = results.totalPaid + totalPayment;
		        } else {
				results.totalPaid = results.totalPaid + sumBalances(debts);
		   	}
		} else {
			results.totalPaid = results.totalPaid + sumMinpayments(debts);
		}
    	}
	
	results.balances.push([month, sumBalances(debts), sumMinpayments(debts)]);
	
	results.months = month;
	
	return results;
}

function getResults(debts) {	
	var highest = JSON.parse(JSON.stringify(debts));
	highest.forEach(function(debt) {$.extend(debt, new DebtProto() );});
	
	var lowest = JSON.parse(JSON.stringify(debts));
	lowest.forEach(function(debt) {$.extend(debt, new DebtProto() );});
	
	var just = JSON.parse(JSON.stringify(debts));
	just.forEach(function(debt) {$.extend(debt, new DebtProto() );});
	
	var results = {
		highestRate: usingMethod(highest, highestRate),
		lowestBalance: usingMethod(lowest, lowestBalance),
		justPayments: usingMethod(just)
	};
    return results;
}

function getTimeString(months) {	
	var years = Math.floor(months / 12);
	var m = months - years * 12;
	
	return years + " years " + m + " months";
}
	
function generateRow(debt) {
	var nameString = "<input type='text' name='name' value='" + debt.name + "' required />";
        var balanceString = "<span class='input-dollar'>$</span><input type='number' name='balance' class='input-dollar' min='0' value='" + debt.balance + "' required />";
        var rateString = "<input type='number' name='rate' class='input-percent' min='0' max='100' step='0.01' value='" + debt.rate * 100 + "' required /><span class='input-percent'>%</a>";
        var minpaymentString = "<input type='number' name='minpayment' min='0' value='";
	
	if(debt.minpaymenttype === 'percent') {
	    minpaymentString = minpaymentString + debt.minpayment * 100;
	} else {
	    minpaymentString = minpaymentString + debt.minpayment;
	}
	
	minpaymentString = minpaymentString + "' required />";
	
        var minpaymenttypeString = "<select name='minpaymenttype'><option value='dollar'" 
            + (debt.minpaymenttype === 'dollar' ? ' selected' : '') 
            + ">dollar</option><option value='percent'" 
            + (debt.minpaymenttype === 'percent' ? ' selected' : '')
            + ">percent</option></select>";
	
        var row = '<tr><td>' + nameString + '</td><td>' 
            + balanceString  + '</td><td>' 
            + rateString + '</td><td>'
            + minpaymentString + '</td><td>'
            + minpaymenttypeString + '</td></tr>';
	
	return row;
}

function make(divString, results) {
	$('#' + divString + '-total-paid').append('$' + results.totalPaid.toLocaleString() + " in " + getTimeString(results.months));

    c3.generate({
        bindto: '#' + divString + '-balance-chart',
        data:{x: 'month', rows:results.balances, type:'spline'},
        axis:{x: {label: {text: 'month', position: 'outer-center'}},
              y: {label: {text: 'dollars', position: 'outer-middle'}}}
    });
	
    c3.generate({
        bindto: '#' + divString + '-account-chart',
        data:{x: 'month', rows:results.accounts, type:'area-step'},
        axis:{x: {label: {text: 'month', position: 'outer-center'}},
              y: {label: {text: 'number of debts', position: 'outer-middle'}}},
	    line: {step: {type: 'step-after'}}
    });
}

$(document).ready(function() {
	$("#addRowButton").click(function() {
		var row = generateRow(new Debt('', 0, 0, 0, 0, 'dollar'));		
		$('#debt-table tbody').append(row);
	});
	
	$("#removeRowButton").click(function() {	
		$('#debt-table tbody tr').last().remove();
	});
	
	var debts;
	
	if(hasKey('name') && hasKey('balance') && hasKey('rate') && hasKey('minpayment')) {
		debts = getObjectArray();		
		debts.forEach(function(debt) {
			$.extend( debt, new DebtProto() );
			debt.name = decodeURIComponent(debt.name.replace(/\+/g,  " "));
			debt.rate = debt.rate / 100;
			debt.balance = parseInt(debt.balance);
			if(debt.minpaymenttype === 'percent') {
				debt.minpayment = debt.minpayment / 100;
			} else {
				debt.minpayment = parseInt(debt.minpayment);
			}
		});
	} else {
		debts = new Array();
		
		var creditcard1 = new Debt('credit card 1', 3000, 0.13, 0.04, 'percent');
		var creditcard2 = new Debt('credit card 2', 8000, 0.16, 0.04, 'percent');
		debts = [creditcard1, creditcard2];
	}
    
	for(var i = 0; i < debts.length; i++) {
		var debt = debts[i];                
		$('#debt-table').append(generateRow(debt));
	}

	var results = getResults(debts);
	
	make('highest-rate', results.highestRate);
	make('lowest-balance', results.lowestBalance);
	make('just-payments', results.justPayments);
});
