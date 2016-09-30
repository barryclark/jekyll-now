---
layout: post
title: DP&L Bill
tags: [money]
keywords: [electricity, cost, statistics, DP&L, dayton power and light]
javascripts: [/js/d3.min.js, /js/c3.min.js]
css: /css/c3.css
---

<div id="electricBillChart" style="width: 100%; height: 300px;"></div>
<script type="text/javascript">
    var chart = c3.generate({
        bindto: '#electricBillChart',
        data: {
            x: 'month',
            rows: [
                ['month', 'usage', 'delivery', 'supply', 'total'],
				['12', '200', '13.75', '9.18', '22.93'],
				['9', '164', '12.46', '10.75', '23.21'],
				['8', '147', '11.60', '10.70', '22.30'],
				['7', '170', '12.75', '12.37', '25.12'],
				['6', '164', '12.54', '11.07', '23.61'],
				['5', '202', '14.43', '13.64', '28.07'],
				['4', '196', '14.14', '15.53', '29.67'],
				['3', '243', '16.32', '18.19', '34.51'],
				['2', '249', '16.62', '18.34', '34.96'],
				['1', '217', '17.89', '16.18', '34.07'],
				['0', '188', '16.43', '14.33', '30.76']
  
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