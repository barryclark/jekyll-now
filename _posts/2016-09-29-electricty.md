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
				['Sep-16', '200', '13.75', '9.18', '22.93'],
				['Aug-16', '164', '12.46', '10.75', '23.21'],
				['Jul-16', '147', '11.60', '10.70', '22.30'],
				['Jun-16', '170', '12.75', '12.37', '25.12'],
				['May-16', '164', '12.54', '11.07', '23.61'],
				['Apr-16', '202', '14.43', '13.64', '28.07'],
				['Mar-16', '196', '14.14', '15.53', '29.67'],
				['Feb-16', '243', '16.32', '18.19', '34.51'],
				['Jan-16', '249', '16.62', '18.34', '34.96'],
				['Dec-15', '217', '17.89', '16.18', '34.07'],
				['Nov-15', '188', '16.43', '14.33', '30.76']
  
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