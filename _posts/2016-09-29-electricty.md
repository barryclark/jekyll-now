---
layout: post
title: DP&L Bill
tags: [money]
keywords: [electricity, cost, statistics, DP&L, dayton power and light]
javascripts: [/js/d3.min.js, /js/c3.min.js]
css: /css/c3.css
---

<div id="electricUseChart" style="width: 90%; height: 300px;"></div>
<script type="text/javascript">
    var chart = c3.generate({
        bindto: '#electricUseChart',
        data: {
            x: 'month',
            rows: [
                ['month', 'usage'],
				['12', '200'],
				['10', '164'],
				['9', '147'],
				['8', '170'],
				['7', '164'],
				['6', '202'],
				['5', '196'],
				['4', '243'],
				['3', '249'],
				['2', '217'],
				['1', '188']
            ],
            type: 'spline'
        },
        axis: {
            x: {
                label: {
                    text: 'month',
                    position: 'outer-center'
                }
            },
            y: {
                label: {
                    text: 'use',
                    position: 'outer-middle'
                }
            }
        }
    });
</script>

<div id="electricCostChart" style="width: 90%; height: 300px;"></div>
<script type="text/javascript">
    var chart = c3.generate({
        bindto: '#electricCostChart',
        data: {
            x: 'month',
            rows: [
                ['month', 'delivery', 'supply', 'total'],
				['12', '13.75', '9.18', '22.93'],
				['10', '12.46', '10.75', '23.21'],
				['9', '11.60', '10.70', '22.30'],
				['8', '12.75', '12.37', '25.12'],
				['7', '12.54', '11.07', '23.61'],
				['6', '14.43', '13.64', '28.07'],
				['5', '14.14', '15.53', '29.67'],
				['4', '16.32', '18.19', '34.51'],
				['3', '16.62', '18.34', '34.96'],
				['2', '17.89', '16.18', '34.07'],
				['1', '16.43', '14.33', '30.76']
            ],
            type: 'spline'
        },
        axis: {
            x: {
                label: {
                    text: 'month',
                    position: 'outer-center'
                }
            },
            y: {
                label: {
                    text: 'cost',
                    position: 'outer-middle'
                }
            }
        }
    });
</script>

<div id="electricCostOverUserChart" style="width: 90%; height: 300px;"></div>
<script type="text/javascript">
    var chart = c3.generate({
        bindto: '#electricCostOverUserChart',
        data: {
            x: 'month',
            rows: [
				['month','delivery/usage','supply/usage','total/usage'],
				['12','0.0688','0.0459','0.1147'],
				['10','0.0760','0.0655','0.1415'],
				['9','0.0789','0.0728','0.1517'],
				['8','0.0750','0.0728','0.1478'],
				['7','0.0765','0.0675','0.1440'],
				['6','0.0714','0.0675','0.1390'],
				['5','0.0721','0.0792','0.1514'],
				['4','0.0672','0.0749','0.1420'],
				['3','0.0667','0.0737','0.1404'],
				['2','0.0824','0.0746','0.1570'],
				['1','0.0874','0.0762','0.1636']
            ],
            type: 'spline'
        },
        axis: {
            x: {
                label: {
                    text: 'month',
                    position: 'outer-center'
                }
            },
            y: {
                label: {
                    text: 'cost over use',
                    position: 'outer-middle'
                }
            }
        }
    });
</script>