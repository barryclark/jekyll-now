---
layout: post
title: Build Your Own Event-Based Backtester in Python
tags:
- Finance
- Practical
summary: Use multiprocessing to speed up your backtesting!
---

When testing an investment strategy, a common way is called backtesting. Backtesting is when you run the algorithm on historic data as if you were trading at that moment in time and had no knowledge of the future. Although backtesters exist in Python, this flexible framework can be modified to parse more than just tick data-- giving you a leg up in your testing. In this post, we're going introduce a simple event-based backtester in Python which utilizes the multiprocessing library.

# Basics

The ideal algorithm would perform well in a backtest because that indicates that-- at some point in time-- the algorithm worked. There are many pitfalls that people run into when making a backtester. Many of the issues have to do with your choice of data, but the design can be a problem as well. Some common problems in finance lingo are
    1. Look Ahead Bias: Your backtester somehow has more (immediate) future information than it should. This can happen in "vector" based backtesters.
    2. Survival Bias: Your algorithm's stock universe is missing delisted (failed/bankrupt) stocks and is choosing stocks that exist in the present. Similar to look ahead bias in that your algorithm also "knows" part of the future.

Both of these are examples of what the machine learning community would call "leakage". And in fact, all the tenets of machine learning are valid for building a trading algorithm. However, in this case, your training and test set are refered to as "in sample" and "out of sample" and refer to non-overlapping periods of time. Your algorithm could have nothing to do with machine learning at all, and could be as straightforward as storing prices over time and watching the "momentum" of the stocks.

## Event-Based Backtesting

We avoid the problem of look ahead bias by making an event based backtester. This type of backtester receives a data feed, or "events", which trigger the algorithm to respond in real time (or at least, as the data comes in). This is the most accurate and fool-proof way to avoid look-ahead bias, because literally, your algorithm will not have the data while it is making decisions.

# Design

Because we will be reading each data point one at a time, we need the algorithm to be as fast as possible. Vector-based backtesters are usually the fastest kind (however it's also easy to introduce errors), but we will try to use the multiprocessing module in Python to alleviate any performance concerns. As its name suggests, this module allows multiple pieces of Python code to run in different processes and communicate with each other.

We utilize what is called a Producer-Consumer pattern for parallelism. One process, the Producer, will read from a data source and fill a queue with parsed information. Meanwhile, the other process, the Consumer, will take that data and use it for the backtesting process. 

## The multiprocessing Module

The multiprocessing module allows us to run python code in multiple processes. The central class is called a Process which takes in a target function to run and arguments for the function. When a processes is started (via the aptly named .start() function), an identical copy of the current process is made-- that is-- all objects are transfered over in their current state to the new process. We can use a Queue class to communicate between each process. The boilerplate code is found in the Backtester class:


{% highlight python linenos %}
from multiprocessing import Process, Queue

q= Queue()
p = Process(target=DataSource.process, args=((q,))

p.start()
p.join # Halts the main process until the started process completes
{% endhighlight %}


## The DataSource Class

The Producer class for the backtester is called the DataSource. The source is able to connect to anything, including a real time feed. One must just implement the get_data() method. In this basic example, the 'POISON' message can be sent from the source to kill the process. This is also a common pattern known as the poison pill.

Here is a basic interface that would need to be extended:


{% highlight python linenos %}
class DataSource:
    '''
    Data source for the backtester. Must implement a "get_data" function
    which streams data from the data source.
    
    Each data point should be of the form (Timestamp, Ticker, Price).
    '''
    def __init__(self):
        self._logger = logging.getLogger(__name__)

    @classmethod
    def process(cls, queue, source = None):
            source = cls() if source is None else source
            while True:
                data = source.get_data()
                if data is not None:
                    queue.put(data)
                    if data == 'POISON':
                        break
{% endhighlight %}

We use a simple format for the data which is centered around pricing updates, but you can add a more complicated approach.

## The Controller Class

In our backtester, the Controller class acts as the Consumer and runs the backtest itself. The Controller class takes a Portfolio and an Algorithm. During each loop it follows the same pattern:
    1. Check the queue for new data points.
    2. Process the data points by adding them to the algorithm's data bank (if implemented) and updating the stock in the Portfolio.
    3. Allow the Algorithm to any generate orders.
    4. Execute orders by calling the OrdersAPI class.
    
Now, steps 3 and 4 could technically by done asyncronously as well for even more of a performance boost and a more valid simulation of high frequency trading. However, this backtester is envisioned more for a day trader rather than HFT.

The main loop of the class described above is

{% highlight python linenos %}
 @classmethod
    def backtest(cls, queue, controller = None):
        controller = cls() if controller is None else controller
        try:
            while True:
                if not queue.empty():
                    o = queue.get()
                    controller._logger.debug(o)

                    
                    if o == 'POISON':
                        # Poison Pill!
                        break

                    timestamp = o[0]
                    ticker = o[1]
                    price = o[2]

                    # Update pricing
                    controller.process_pricing(ticker = ticker, price = price)

                    # Generate Orders
                    orders = controller._algorithm \
                            .generate_orders(timestamp, controller._portfolio)

                    # Process orders
                    if len(orders) > 0:
                        # Randomize the order execution
                        final_orders = [orders[k] for k in np.random.choice(len(orders), 
                                                                            replace=False, 
                                                                            size=len(orders))]

                        for order in final_orders:
                            controller.process_order(order)

                        controller._logger.info(controller._portfolio.value_summary(timestamp))

        except Exception as e:
            print(e)
        finally:
            controller._logger.info(controller._portfolio.value_summary(None))
{% endhighlight %}

# The OrderApi Class

The Controller class takes an OrderApi class that simulates a trade occuring. This way, we can include things like slippage (the stock price changing from when we generated the sale), fees, and simply failed trades. It adds another level of realism to the simulation. This can be augmented as much or as little as one likes.


{% highlight python linenos %}
class OrderApi:
    def __init__(self):
        self._slippage_std = .01
        self._prob_of_failure = .0001
        self._fee = .02
        self._fixed_fee = 10
        self._calculate_fee = lambda x : self._fee*abs(x) + self._fixed_fee

    def process_order(self, order):
        slippage = np.random.normal(0, self._slippage_std, size=1)[0]

        if np.random.choice([False, True], p=[self._prob_of_failure, 1 -self._prob_of_failure],size=1)[0]:
            trade_fee = self._fee*order[1]*(1+slippage)*order[2]
            return (order[0], order[1]*(1+slippage), order[2], self._calculate_fee(trade_fee))
{% endhighlight %}

# The Algorithm Class

The Algorithm class is your chance to do whatever you want. The only requirement is you implement a generate_orders() and update() method. Otherwise, whatever you do "under the covers" like storing information, etc., is up to you. Here's an interface:


{% highlight python linenos %}
class Algorithm:
    '''
    Must implement a "generate_orders" function which returns a list of orders
    and an update function.
    
    Each order is a tuple of the form
        ( Stock Ticker str, Current Price float, Order Amount in shares float)
    '''
    
    def update(self, stock, price):
        # Update
        pass
 
    def generate_orders(self, timestamp, portfolio):
        # Make some orders based off the data
        return orders
{% endhighlight %}

# Example Implementations

To see full examples of these classes, see the check out the [repo](https://github.com/srome/pybacktester/) on github. I will briefly go through a few implementations here to give you a feel for writing them.


## DataSource 

You can implement the DataSource to pull data from Yahoo via pandas. The data source must put tuples of the form (timestamp, ticker, price) into the queue. Here's one such way to do this: we pull the data and then place them one by one into a list. Whenever get_data() is called, we pop the top entry of the list off and return it. When our list is empty, we send the dreaded poison pill.


{% highlight python linenos %}
def set_source(self, source, tickers, start, end):
    prices = pd.DataFrame()
    counter = 0.
    for ticker in tickers:
        try:
            self._logger.info('Loading ticker %s' % (counter / len(tickers)))
            prices[ticker] = DataReader(ticker, source, start, end).loc[:, 'Close']
        except Exception as e:
            self._logger.error(e)
            pass
        counter+=1

    events = []
    for row in prices.iterrows():
        timestamp=row[0]
        series = row[1]
        vals = series.values
        indx = series.index
        for k in np.random.choice(len(vals),replace=False, size=len(vals)): # Shuffle!
            if np.isfinite(vals[k]):
                events.append((timestamp, indx[k], vals[k]))

    self._source = events

    self._logger.info('Loaded data!')

def get_data(self):
    try:
        return self._source.pop(0)
    except IndexError as e:
        return 'POISON'
{% endhighlight %}

## Algorithm

Here is an example of a basic Algorithm class. Disclaimer: this strategy is for educational purposes only.

What we will do is keep a moving average of every stock, and when the price of a stock exceeds a percentage of its average, we will buy it. If it drops, we will sell it. For fun, the strategy will randomly liquidate holdings as well.

First, the update method will keep track of a dictionary of stocks:


{% highlight python linenos %}
def update(self, stock, price):
    if stock in self._averages:
        self.add_price(stock, price)
    else:
        length = self._price_window
        self._averages[stock] = {'History' : np.zeros(length), 'Index' : 0, 'Length' : length}
        data = self._averages[stock]['History']
        data[0] = price
{% endhighlight %}

Next, we can implement a _determine_if_trading() function to first decide if the algorithm will trade at all. This way, we can set limits on the number of trades we perform to limit the amount of fees we incur. We will call this function in our generate_orders method. You can see that there's a few criteria, either:
    1. We have enough data to compute the moving averages (i.e. _updates = # of updates = price_window for the first set of trades).
    2. The required number of days have passed since our last trade.
    3. The past trend of the portfolio is much greater than the current value, i.e. the portfolio is doing worse than its recent trend.
    4. The cash balance is too high.


{% highlight python linenos %}
def _determine_if_trading(self, date, portfolio_value, cash_balance):
    time_delay_met = True
    trade = False
    override = False
    self._updates += 1

    if self._last_date is not None:
        if (date - self._last_date).days <= self._minimum_wait_between_trades:
            # Make orders based on previous day
            return False

    if self._updates == self._price_window+1:
        trade = True

    if (np.mean(self._trend)-portfolio_value)/portfolio_value > 0.05:
        override = True

    if cash_balance > portfolio_value*.03:
        override = True

    return trade or override
{% endhighlight %}

Now we'll write a simple generate orders method. It'll first call the _determine_if_trading() method to see if we will trade, otherwise we return an empty set of orders. Then, we grab the stocks that have seen enough days to have a valid moving average. After calculating the average, we select stocks that are either on the rise (greater than their moving average) or falling (lower than their moving average) and buy/sell them. We buy based on the proportion of our available cash and when we sell, we liquidate, because why not?


{% highlight python linenos %}
def generate_orders(self, timestamp, portfolio):
    orders = []
    cash_balance = portfolio.balance
    portfolio_value = portfolio.get_total_value()
    self.add_trend_value(portfolio_value)

    if not self._determine_if_trading(timestamp,portfolio_value,cash_balance):
        return orders

    valid_stocks = [stock for stock in self._averages if portfolio.get_update_count(stock) > self._price_window]

    if len(valid_stocks) == 0:
        return orders

    for stock in np.random.choice(valid_stocks, replace=False, size=len(valid_stocks)):
        amt = cash_balance / len(valid_stocks) # Spend available cash
        relative_change = (self.get_window_average(stock=stock) - self.get_price(stock))/self.get_price(stock)

        if abs(relative_change) > .03:
            # Positive is buy, negative is sell
            order_type = np.sign(relative_change)
            if order_type > 0 and np.random.uniform(0,1,size=1)[0] < .9:
                amt = np.round(amt/self.get_price(stock),0)
            else:
                amt = - portfolio.get_shares(stock) # Liquidate! Why not?

            if abs(amt) < .01:
                # Stop small trades
                continue

            orders.append((stock, self.get_price(stock), amt))

    self._last_trade = self._updates
    self._last_date = timestamp

    return orders
{% endhighlight %}

# Simulation

Now that we've went over an implementation. Let's try it out!

## The Backtester Class

To set up a simulation, use the Backtester class. The backtester class exposes setter methods to control settings of the simulation. There is also a default run setup which starts with an empty portfolio with cash in it and tests it on historical data using the default implementation of the DataSource (more info below).

{% highlight python linenos %}
class Backtester:
    def __init__(self):
        self._logger = logging.getLogger(__name__)
        self._settings = {}

        self._default_settings = {
            'Portfolio' : Portfolio(),
            'Algorithm' : Algorithm(),
            'Source' : 'yahoo',
            'Start_Day' : dt.datetime(2016,1,1),
            'End_Day' : dt.datetime.today(),
            'Tickers' : ['AAPL','GOGL','MSFT','AA','APB']
        }

    def set_portfolio(self, portfolio):
        self._settings['Portfolio'] = portfolio

    def set_algorithm(self, algorithm):
        self._settings['Algorithm'] = algorithm

    def set_source(self, source):
        self._settings['Source'] = source

    def set_start_date(self, date):
        self._settings['Start_Day'] = date

    def set_end_date(self, date):
        self._settings['End_Day'] = date

    def set_stock_universe(self, stocks):
        self._settings['Tickers'] = stocks
{% endhighlight %}

You run the class by instantiating it and calling the "backtest" method, like so:


{% highlight python linenos %}
    b = Backtester()
    b.backtest()
{% endhighlight %}

The code by default will log much of the information of to a "run.log" file in the directory which you called the program from. This includes ticker updates, values of trades, and updates on your portfolio's value. An example output looks like:

    Loaded data!
    (Timestamp('2016-01-04 00:00:00'), 'APB', 9.8900000000000006)
    (Timestamp('2016-01-04 00:00:00'), 'GOGL', 1.01)
    (Timestamp('2016-01-04 00:00:00'), 'AAPL', 105.349998)
    (Timestamp('2016-01-04 00:00:00'), 'AA', 9.7100000000000009)
    (Timestamp('2016-01-04 00:00:00'), 'MSFT', 54.799999) 
    ...
    Trade on GOGL for 317460.0 shares at 0.627397882997 with fee 89.6694927745
    Trade on AAPL for 2127.0 shares at 94.8422810289 with fee 90.6918126994
    Trade on MSFT for 4048.0 shares at 48.9216529629 with fee 89.2139404775
    2016-02-08 00:00:00 : Stock value: 599992.013619, Cash: 400792.309876, Total 1000784.32349

# Extensions

Now, you should be ready to implement your own algorithms/data sources and test the results. This framework is very open ended and could be extended in many ways. However, when you implement your own backtester, you can add data points that other packages do not allow. For example, your data feed could also include twitter data that you'd parse and use (somehow?) to trade. It could use a news feed to determine catastrophic events. The possibilities are endless, and this is why trading is difficult. 

# Disclaimer
This backtester code is provided for educational purposes ONLY!
