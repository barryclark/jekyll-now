function DebtProto() {
	this.snowball = 0;
	this.getMinPayment = function() {
	    if(this.minpaymenttype === 'percent') {
			return Math.max(Math.round(this.balance * this.minpayment), 1);
	    } else {
			return this.minpayment;
	    }
	};
	this.getPayment = function() {
		if(this.makeMin) {
			this.payment =  this.getMinPayment();
		}
		
		return this.payment;
	};
	this.update = function() {		
	    this.balance = this.balance * (1 + this.rate / 12) - this.getPayment();
	    this.balance = Math.round(this.balance);
		
	    if(this.balance < this.payment) {
			if(this.getminpaymenttype === 'dollar' && this.balance < this.minpayment) {
		    	this.minpayment = this.balance;
			}
			this.snowball = this.payment - this.balance;
			this.payment = this.balance;
	    }
		
	    if(this.balance <= 0) {
			this.balance = 0;
			this.minpayment = 0;
			this.snowball = this.payment;
			this.payment = 0;
	    }
	};
}

function Debt(name, balance, rate, minpayment, minpaymenttype) {
	this.name = name;
	this.balance = balance;
	this.rate = rate;
	this.payment = minpaymenttype === 'dollar' ? minpayment : minpayment * balance;
	this.makeMin = true;
	this.minpayment = minpayment;
	this.minpaymenttype = minpaymenttype;
	$.extend( this, new DebtProto() );
}

function avalanche(debts, method) {
    var snowballs = debts.reduce(function(p, c) {return p + c.snowball;}, 0);
    
    if(snowballs > 0) {
        var toSnowball = debts.filter(function(debt) {return debt.snowball == 0;});
        
        debts.forEach(function(debt) {debt.snowball = 0;});
        
        if(toSnowball.length > 0) {
            var avalanche = method(toSnowball);
            avalanche.payment = avalanche.payment + snowballs;
	    avalanche.makeMin = false;
        }
    }
}
	
function sumBalances(debts) {
    return debts.reduce(function(p, c){return p + c.balance;}, 0);
}
	
function sumMinpayments(debts) {
    return debts.reduce(function(p, c) {return p + c.getMinPayment();}, 0);
}

function sumPayments(debts) {
    return debts.reduce(function(p, c) {return p + c.getPayment();}, 0);
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
	
	if(typeof method !== 'undefined') {
		method(debts).makeMin = false;
	}
	
	var results = {
			balances: [['year', 'balance', 'minimum payment'],
				  [0, sumBalances(debts), sumMinpayments(debts)]],
			accounts: [['month','number of debts'],
				   [0, numOpen]],
			totalPaid: 0,
			months: 0
	};
	
	var month = 1;
	
	for(var balance = sumBalances(debts); balance > 0; balance = sumBalances(debts)) {
        
		debts.forEach(function(debt) {debt.update();});
		
		if(month % 12 === 0) {
			results.balances.push([month / 12, balance, sumMinpayments(debts)]);	
		}
		
		var nowNumOpen = totalAccounts(debts);
		
		if(nowNumOpen !== numOpen) {
			results.accounts.push([month, nowNumOpen]);
			numOpen = nowNumOpen;
		}
		
		results.totalPaid = results.totalPaid + sumPayments(debts);
		
        
		if(typeof method !== 'undefined') {
			avalanche(debts, method);
		}
		
		month++;

		if(month > 500) {
		    break;
		}
    	}
	
	if(month % 12 != 0) {
		results.balances.push([month / 12, sumBalances(debts), sumMinpayments(debts)]);	
	}
	
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
	$('#' + divString + '-total-paid').append('$' + results.totalPaid + " in " + getTimeString(results.months));

    c3.generate({
        bindto: '#' + divString + '-balance-chart',
        data:{x: 'year', rows:results.balances, type:'spline'},
        axis:{x: {label: {text: 'year', position: 'outer-center'}},
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
			debt.name = decodeURIComponent(debt.name);
			debt.rate = debt.rate / 100;
			debt.balance = parseInt(debt.balance);
			if(debt.minpaymenttype === 'percent') {
				debt.minpayment = debt.minpayment / 100;
				debt.payment = debt.payment * debt.minpayment;
			} else {
				debt.minpayment = parseInt(debt.minpayment);
				debt.payment = debt.minpayment;
			}			
		});
	} else {
		debts = new Array();
		
		var house = new Debt('mortgage', 150000, 0.03, 750, 'dollar');
		var car = new Debt('car loan', 20000, 0.1, 250, 'dollar');
		var creditcard1 = new Debt('credit card 1', 5000, 0.20, 0.04, 'percent');
		var creditcard2 = new Debt('credit card 2', 100, 0.01, 0.04, 'percent');
		debts = [house, car, creditcard1, creditcard2];
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
