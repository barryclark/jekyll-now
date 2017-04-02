---
layout: page
title: Dashboard
permalink: /dashboard/
js:
        - //js/dashboard_index_json.js
ext-js: 
        - //cdn.rawgit.com/mholt/PapaParse/master/papaparse.min.js
        - //cdn.rawgit.com/gjrichter/data.js/master/data.js
        - //cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.min.js
---

{% raw %}

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<title>data.js | demo data TCI</title>


<!-- CSS per DASHBOARD statistica -->
<link rel="stylesheet" type="text/css" href="/css/dashboard_style.css">
<link rel="stylesheet" type="text/css" href="/css/dashboard_flat-blue.css">
<!-- ------------------------ -->


<body>

<!-- statistica main content -->

<div class="container-fluid flat-blue">
<div class="side-body padding-top">

<div id="loading"><br>caricamento dati ...</div>	

<!-- sum and trend cards
-->	
<h1>Segnalazioni				
<span style="font-size:0.5em;margin-bottom:0.5em;margin-left:0.2em">totale e ultimi 7 giorni</span></h1>

<div class="row">

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card yellow summary-inline">
<div class="card-body">
<i class="icon fa fa-flag fa-4x"></i> <span style="font-size:1.2em">Tutti </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card blue summary-inline">
<div class="card-body">
<i class="icon fa fa-map-marker fa-4x"></i> <span style="font-size:1.2em">Georeferenziati</span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE lat BETWEEN 1 AND 100]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card green summary-inline">
<div class="card-body">
<i class="icon fa fa-check fa-4x"></i> <span style="font-size:1.2em">Closed </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE state is closed]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>
</div>

<div class="row">

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card dark summary-inline">
<div class="card-body">
<i class="icon fa fa-child fa-4x"></i> <span style="font-size:1.2em">Fabbisogni </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Fabbisogni]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card dark summary-inline">
<div class="card-body">
<i class="icon fa fa-home fa-4x"></i> <span style="font-size:1.2em">Alloggi </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Alloggi]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card dark summary-inline">
<div class="card-body">
<i class="icon fa fa-heart-o fa-4x"></i> <span style="font-size:1.2em">Donazioni </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Donazioni]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card dark summary-inline">
<div class="card-body">
<i class="icon fa fa-user fa-4x"></i> <span style="font-size:1.2em">Contatti </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Contatti]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

</div>

<div class="row">

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card summary-inline">
<div class="card-body">
<i class="icon fa fa-file-text-o fa-4x"></i> <span style="font-size:1.2em">Form </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Form]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card summary-inline">
<div class="card-body">
<i class="icon fa fa-facebook fa-4x"></i> <span style="font-size:1.2em">Facebook </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Facebook]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card summary-inline">
<div class="card-body">
<i class="icon fa fa-twitter fa-4x"></i> <span style="font-size:1.2em">Twitter </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Twitter]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>

<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
<a href="">
<div class="card summary-inline">
<div class="card-body">
<i class="icon fa fa-paper-plane-o fa-4x"></i> <span style="font-size:1.2em">Telegram </span>
<div class="content">
<div class="title data-dynamic" data-path="data::segnalazioni::records[WHERE labels like Telegram]">--</div>
<div class="sub-title data-dynamic">ultimi&nbsp;7&nbsp;giorni</div>
</div>
<div class="clear-both"></div>
</div>
</div>
</a>
</div>



</div>

<!-- day by day curves
-->	

<h1 id="curves"><br>
<span style="font-size:0.5em;margin-bottom:0.5em;margin-left:0.2em">Sequenza temporale delle segnalazioni aggregate per giorno</span></h1>


<div class="row">
<div class="col-lg-9 col-md-12 col-sm-12">
<div class="card">
<div class="card">
<canvas id="jumbotron-bar-chart" class="chart"></canvas>
</div>
<div class="card-body half-padding">
<h4 class="float-left no-margin font-weight-300"></h4>
<h2 class="float-right no-margin font-weight-300"></h2>
<div class="clear-both"></div>
</div>
</div>
</div>
</div>

<div class="row  no-margin-bottom">
<!--
<div class="col-md-6 col-xs-12">
<div id="eventi" class="card red">
<div class="card-header">
<div class="card-title pull-left">
<span class="title" ><i class="fa fa-calendar-check-o"></i> Segnalazioni georeferenziati</span>
</div>
<div class="card-title pull-right" style="margin:0.8em;">
<span class="title" ><a href="http://projects.ixmaps.com.s3-website-eu-west-1.amazonaws.com/terremoto_new/maptune/maptune_embed.html" target="_blank"><i class="fa fa-external-link" style="color:white"></i></a></span>
</div>
<div class="clear-both"></div>
</div>
<div class="card-body no-padding">
<iframe src="http://projects.ixmaps.com.s3-website-eu-west-1.amazonaws.com/terremoto_new/maptune/maptune_embed.html" height="550px" width="100%" frameborder="0" style="margin-bottom:-1.1em"></iframe>
</div>
</div>
</div>
-->
<div class="col-lg-6 col-md-12 col-xs-12">
<div class="card card-success">
<div class="card-header">
<div class="card-title">
<div class="title"><i class="fa fa-comments-o"></i> Ultimi segnalazioni</div>
</div>
<div class="clear-both"></div>
</div>
<div class="card-body no-padding" style="height:550px;overflow:auto" >
<ul class="message-list" >
<a href="" id="message-load-more">
<li class="text-center load-more">
<i class="fa fa-refresh"></i> load more..
</li>
</a>
</ul>
</div>
</div>
</div>
</div>

</div>
</div>

</body>
{% endraw %}

</html>


[credits](http://terremotocentroitalia.info/about/)
