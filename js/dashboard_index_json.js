

$(function() {

	// ..........................................................
	//
	// helper
	//
	// ..........................................................

	var __getArrow = function(last,before){
		return (last == before)?"fa-arrow-right":((last < before)?"fa-arrow-down":"fa-arrow-up");
	};

	var __getIcon = function(labels){
		if ( labels.match(/form/i) ){
			return "fa-file-text-o";
		}
		if ( labels.match(/facebook/i) ){
			return "fa-facebook";
		}
		if ( labels.match(/twitter/i) ){
			return "fa-twitter";
		}
		if ( labels.match(/telegram/i) ){
			return "fa-paper-plane-o";
		}
		return "fa-user";
	};

	var __getDataDefinition = function(element){
		var txt = $(element).attr("data-path");
		if (txt) {
			var textA = txt.split("::");
			var x = {}; 
			x.type = textA[0]; 
			x.table = textA[1]; 
			x.column = textA[2].split('[')[0];
			x.selection = textA[2].split('[')[1]?(textA[2].split('[')[1].split(']')[0]):"";
			return x;
		}
		return null;
	};

	// needed for safari !
	var __normalizeTime = function(date){
		return date.replace(/\-/gi,'/');
	};

	// ..........................................................
	//
	// get data an go ----->
	//
	// ..........................................................

	var mytest = Data.object("Segnalazioni",{"source":issues,"type":"json"}).import(function(mydata){

	//var szUrl = "https://raw.githubusercontent.com/emergenzeHack/terremotocentro/master/_data/issues.csv";
	//var myfeed = Data.feed("Segnalazioni",{"source":szUrl,"type":"csv"}).load(function(mydata){

		// json -> 2 dimensional table 
		// take the isue object and create the columns we know from the CSV 

		mydata.addColumn({'source':'issue','destination':'created_at'},function(value){
							return value['created_at'].replace("T"," ").split("+")[0];
							} 
						);
		mydata.addColumn({'source':'issue','destination':'title'},function(value){
							return value['title'];
							} 
						);
		mydata.addColumn({'source':'issue','destination':'url'},function(value){
							return value['url'];
							} 
						);
		mydata.addColumn({'source':'issue','destination':'labels'},function(value){
							return JSON.stringify(value['labels']);
							} 
						);
		mydata.addColumn({'source':'issue','destination':'lat'},function(value){
							return value['lat'];
							} 
						);
		mydata.addColumn({'source':'issue','destination':'lon'},function(value){
							return value['lon'];
							} 
						);

		$("#loading").hide();

		// create list of last 100 messages
		// --------------------------------------------------

		var iUrl	 = mydata.columnIndex("url");
		var iLabels	 = mydata.columnIndex("labels");
		var iDate    = mydata.columnIndex("created_at");
		var iTitle   = mydata.columnIndex("title");

		var list = "";
		for (i=0; i<100; i++ ){
			list += '<a href="'+mydata.records[i][iUrl]+'" target=_blank">';
			list += '<li>';
			list += '<i class="icon fa '+__getIcon(mydata.records[i][iLabels])+' fa-2x pull-left" ></i>';
			list += '<div class="message-block">';
			list += '<div><span class="username">'+mydata.records[i][iDate]+'</span> <span class="message-datetime">'+mydata.records[i][iLabels]+'</span>';
			list += '</div>';
			list += '<div class="message">'+mydata.records[i][iTitle]+'</div>';
			list += '</div>';
			list += '</li>';
			list += '</a>';
		}
		$('.message-list').html(list);
		// --------------------------------------------------


		// create new columns 'date' and 'hour' from one timestamp column
		// we need them to create pivot tables 
		// ---------------------------------------------------------------
		mydata.addColumn({'source':'created_at','destination':'date'},
								   function(value){
										var d = new Date(__normalizeTime(value));
										return( String(d.getDate()) + "." + String(d.getMonth()+1) + "." + String(d.getFullYear()) );
										} 
									);
		mydata.addColumn({'source':'created_at','destination':'hour'},
								   function(value){
										var d = new Date(__normalizeTime(value));
										return( d.getHours() );
										} 
									);

		// ..........................................................
		//
		// 1. loop over data request and set value into card templates
		//
		// ..........................................................

		$(".data-dynamic").each( function( index ) {

			var dataPath = __getDataDefinition($(this));
			if (dataPath) {
				if ( dataPath.type == "data" ){

					if ( (dataPath.table == "segnalazioni") && (dataPath.column == "records") && (dataPath.selection == "") ){

						var records = mydata.table.records;
						var pivot = mydata.pivot({ "lead":	'date',
												   "keep":  ['created_at']
												});

						var daysA = pivot.column("Total");
						var dateA = pivot.column("created_at");
			
						// get last 7 and 14 days timestamp
						var d = new Date();
						d = new Date(d.getFullYear(),d.getMonth(),d.getDate());
						var dateplus7  = d.getTime() - (1000*60*60*24 * (7-1));
						var dateplus14 = d.getTime() - (1000*60*60*24 * (14-1));

						// get last 7 and 14 days values
						var last = 0;
						var before = 0;
						var i = 0;
						while ( new Date(__normalizeTime(dateA[i])).getTime() > dateplus7 ){
							last += daysA[i++];
						}
						while ( new Date(__normalizeTime(dateA[i])).getTime() > dateplus14 ){
							before += daysA[i++];
						}

						// display sum, last 7 and trend arrow
						var szArrow = __getArrow(last,before);
						$(this).html("<span class='pull-left'>"+records+" </span><br><span class='' style='font-size:0.8em'>"+Math.abs(last)+"<i class='icon fa "+szArrow+"'></i></span> ");

					}else

					if ( (dataPath.table == "segnalazioni") && (dataPath.column == "records") ){

						// make reduced data tabel by selection
						var sdata = mydata.select(dataPath.selection);
						var records = sdata.table.records;

						// make pivot from this
						var spivot = sdata.pivot({ "lead":	'date',
												   "keep":  ['created_at']
												});

						var daysA = spivot.column("Total");
						var dateA = spivot.column("created_at");

						// get last 7 and 14 days timestamp
						var d = new Date();
						d = new Date(d.getFullYear(),d.getMonth(),d.getDate());
						var dateplus7  = d.getTime() - (1000*60*60*24 * (7-1));
						var dateplus14 = d.getTime() - (1000*60*60*24 * (14-1));

						// get last 7 and 14 days values
						var last = 0;
						var before = 0;
						var i = 0;
						while ( new Date(__normalizeTime(dateA[i])).getTime() > dateplus7 ){
							last += daysA[i++];
						}
						while ( new Date(__normalizeTime(dateA[i])).getTime() > dateplus14 ){
							before += daysA[i++];
						}
						// display sum, last 7 and trend arrow
						var szArrow = __getArrow(last,before);
						$(this).html("<span class='pull-left'>"+records+" </span><br><span class='t' style='font-size:0.8em'>"+Math.abs(last)+"<i class='icon fa "+szArrow+"'></i></span> ");
					}
				}
			}

		});

		// ..........................................................
		//
		// 2. make day per day curve chart
		//
		// ..........................................................

		var pivot = mydata.pivot({ "lead":	'date',
								   "keep":  ['created_at'],	
								   "cols":	'state' 
								});

		// invert data table (make last record the first)
		// ----------------------------------------------
		pivot = pivot.revert();

		// make chart with 2 curves, total and closed issues
		// -------------------------------------------------
		var set1  = pivot.column("Total");
		var set2  = pivot.column("closed");
		var label = pivot.column("date");
		
		if (0){
			var sum = 0;
			for ( i=0; i<set1.length; i++ ){
				set1[i] += sum;
				sum = set1[i];			
			}
			sum = 0;
			for ( i=0; i<set2.length; i++ ){
				set2[i] += sum;
				sum = set2[i];			
			}
		}

		var ctx, data, myBarChart, option_bars;
		Chart.defaults.global.responsive = true;
		ctx = $('#jumbotron-bar-chart').get(0).getContext('2d');
		options = {
		showScale: false,
		scaleShowGridLines: false,
		scaleGridLineColor: "rgba(0,0,0,.05)",
		scaleGridLineWidth: 1,
		scaleShowHorizontalLines: true,
		scaleShowVerticalLines: true,
		bezierCurve: false,
		bezierCurveTension: 0.4,
		pointDot: false,
		pointDotRadius: 4,
		pointDotStrokeWidth: 1,
		pointHitDetectionRadius: 20,
		datasetStroke: true,
		datasetStrokeWidth: 4,
		datasetFill: true,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		};
		options.type = "line";
		options.data = {
		labels: label,
		datasets: [
		  {
			label: "Total",
			backgroundColor: "rgba(188, 188, 188,0.2)",
			borderColor: "#9C9C9C",
			pointDot: false,
			pointColor: "#9C9C9C",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "#9C9C9C",
			data: set1
		  }, {
			label: "closed",
			backgroundColor: "rgba(26, 188, 156,0.2)",
			borderColor: "#1ABC9C",
			pointDot: false,
			pointColor: "#1ABC9C",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "#1ABC9C",
			data: set2
		  }
		]
		};
		options.options = {
		  scales : {
			xAxes: [{
				scaleLabel: {
					display: false,
					labelString: 'Day'
				}
			}],
			yAxes: [{
				ticks: {
					min: 0,
				},
				scaleLabel: {
					labelString: 'Value'
				}
			}]
		  }
		};

		myBarChart = new Chart(ctx, options);

	});
});

