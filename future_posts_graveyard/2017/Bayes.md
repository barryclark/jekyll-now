## Bayes' rule

Can we predict the feature given only a single observation? For instance, given that the price of a Bitcoin has doubled in the last two months, what will the price be in another two months?

Well, the only way to make a prediction is by making some assumptions. I know very little of economics, but since the value of a Bitcoin has dramatically rising for quite some while now, it seems reasonable to me that it will keep increasing. Furthermore, from my perspective, I have no reason to assume that the price will increase faster or that the Bitcoin craze will mellow out. So assuming that the trends will keep up and the price went in October from about USD 4,000 to USD 10,000 in December, it seems like a good bet that a Bitcoin will be worth around USD 1,5000 in February. You can spot the fallacy here: of course at some point the prices will stagnate (or pop like a bubble)! But *to me*, it looks unlikely that the trend will change right now. This idea is similar to [the Doomsday argument](https://en.wikipedia.org/wiki/Doomsday_argument).

Another prediction: my nephew is born last August. Is it likely that, in addition to the four months that he has been around on this planet, he still has four months to go? Let us hope not! My grandmother on the other hand is close to ninety years old, healthy as she is, I fear she won't make it to 180. Apparently, we have different expectations for the distributions of peoples age than for the value of cryptocurrencies.

Based on our expectations on different phenomena around us, and a sound reasoning based on [Bayes' rule](https://www.countbayesie.com/blog/2015/2/18/bayes-theorem-with-lego). Some things, such as stock values, follow a **power law**: there is a huge difference in the scale of individual observations. Most stocks have a relatively low value while some have


![
Example of using Bayes rule to make predictions using a single observation. (top) Events that are normally distributed (such as the time required to read a chapter of a book) can be predicted using the average rule: (middle) Events that follow a power law (such as the time )
](../images/2017_algorithms/bayes.png)

- predicting using one data point
- *power-law distributions* => multiplicative rule
- *normal distributions* => average rule
- *Erlang distribution* => additive rule
