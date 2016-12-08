import plotly.plotly as py
py.sign_in('rsjudka', 'APIKEY')
import plotly.graph_objs as go

year = []
count = []

with open('years-data.txt', 'r') as line:
    for data in line:
        if data[0] == '\t':
            break
        a = data.split(': ')
        year.append(int(a[0]))
        b = a[1]
        count.append(int(a[1]))


data = [go.Bar(
            x=year,
            y=count
    )]

py.iplot(data, filename='years-data')

