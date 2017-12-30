
The story of rabbits in Australia, and the resulting eradication efforts, provides a cautionary tale about viruses and immunity. Captive rabbits were first introduced into Australia in 1788 by the first European settlement - the penal colony at Botany Bay. The early settlers brought five rabbits with them to Australia. The rabbits were breed and kept for food but never released into the wild. More rabbits subsequently arrived as settlements dotted the Australian landscape. They spread around Tasmania (then known as Van Diemen’s Land) but they were mostly controlled in the mainland and didn’t spread into the wild.
The settlers were able to keep the rabbit population in captivity and under control for over half a century, until one thing happened - they got bored. They wanted to hunt rabbits like they did in England and so, in 1859, they released 24 rabbits into the wild. From there the population grew, like, well, rabbits.


Rabbits have a gestation period of about four weeks, and each new litter of rabbits contains four baby bunnies. So if it takes two rabbits four weeks to make four baby rabbits, that’s a growth rate of about .5 rabbits per week for each rabbit. However, rabbits take about 17 weeks to reach sexual maturity and in the wild live only around one year, so they're only breeding about a third of their lives. Still, that’s an incredible growth rate and with the vastness of the Australian open landscape in front of them, the population grew. 



```python
import numpy as np
import matplotlib.pyplot as plt
```

Here’s a simulation of what the rabbit population would have looked like after a year.


```python
# Rabbit facts
# Two rabbits can make four rabbits every 4 weeks. Thus the growth rate is 4babys /2parents /4weeks = .5
growth_rate = .5 #increases by 20% each generation # this is the growth rate per week
time_to_sexual_maturity = 17 #weeks

```

Australia tried to used the deadly myxomatosis virus to control the invasive rabbit population. This notebook examines what happened and how immunity can grow in a population. To do this, we'll build a function for population growth.

The standard way is to combine all the factors of life and death into one term called the growth factor, then say that they change in population over time is equal to the population times the growth factor:

$$dP/dt = P*r$$

which we can integrate to give us the standard equation for exponential growth:

$$P(t) = P_oe^{rt}$$

However, this doesn't allow us enough precision. For example, rabbits don't reach sexual maturity until 17 weeks - how do we factor that in? We could find the average amount of their lifespan that rabbits spend as sexually mature and factor that into the growth rate, but we'll need more precision that

One important component that is missing is the carrying capacity - how many rabbits can there be until the land cannot hold them all? We'll use the following equation to factor that in:
sexually mature population at time 0
$$P_t =P_m * r_{grow} * (1 - P_{tot}/K)$$

* $P_t$ - population this week
* $r_{grow}$ - growth rate
* $P_m$ - sexually mature population from previous week
* $P_{tot}$ - total population from the previous week
* $K$ - carrying capacity


```python
def population_growth(sex_mature_pop, total_pop, growth_rate =.5, carrying_capacity=600000000):
    '''
    Yields the number of new members of a population (not the new total)
    '''
    return round(sex_mature_pop * growth_rate * (1 - (total_pop/carrying_capacity)))
```


```python
# But 24 rabbits started at a variety of ages!
# Create inital population as uniform distribution between 0 and 52 weeks?
```


```python
#Let's see what happens with unrestricted rabbit population growth
num_iterations = 52 # weeks
rabbit_population = np.zeros(num_iterations)
rabbit_population[0] = 24

for x in range(1, num_iterations):
    
    if x<17: #If it's under 17 weeks then the only sexually mature rabbits are the 24 that started
        new_pop = population_growth(24, rabbit_population[x-1])
    else:
        new_pop = population_growth(rabbit_population[x-time_to_sexual_maturity], rabbit_population[x-1])
    rabbit_population[x] = rabbit_population[x-1] + new_pop

x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after first rabbits introduced")
ax.set_ylabel("Number of rabbits")
plt.show()
```


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_11_0.png)


7000 rabbits. That’s a lot, but it’s manageable. But herein lies the problem with exponential growth. If you start with 24 rabbits, you’ll have around 7000 within a year. But after another year you have:



```python
# Let's run the simulation for two years
num_iterations = 104 # weeks
rabbit_population = np.zeros(num_iterations)
rabbit_population[0] = 24

for x in range(1, num_iterations):
    
    if x<17: #If it's under 17 weeks then the only sexually mature rabbits are the 24 that started
        new_pop = population_growth(24, rabbit_population[x-1])
    else:
        new_pop = population_growth(rabbit_population[x-time_to_sexual_maturity], rabbit_population[x-1])
    rabbit_population[x] = rabbit_population[x-1] + new_pop

current_week += num_iterations
x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after first rabbits introduced")
ax.set_ylabel("Number of rabbits")
plt.show()
```


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_13_0.png)


Over a million rabbits! It’s a classic example of unintended consequences. And given the size of Australia, the limit to the number of rabbits is huge. Based on population estimates, the maximum population for rabbits in a huge country like Australia is around 600 million (remember, the human population is only 24 million). Based on the exponential growth of rabbits, they would go from 24 to 600 million in only four years. Due to the additional time it would take to spread proportionally throughout the country, it probably took a bit longer than that. Either way, it was the fastest spread ever recorded of any mammal anywhere in the world. After the population hits 600 million they (roughly) reach the carrying capacity of Australia.


```python
# Let's run the simulation for two years
num_iterations = 208 # weeks
rabbit_population = np.zeros(num_iterations)
rabbit_population[0] = 24

for x in range(1, num_iterations):
    
    if x<17: #If it's under 17 weeks then the only sexually mature rabbits are the 24 that started
        new_pop = population_growth(24, rabbit_population[x-1])
    else:
        new_pop = population_growth(rabbit_population[x-time_to_sexual_maturity], rabbit_population[x-1])
    rabbit_population[x] = rabbit_population[x-1] + new_pop

current_week += num_iterations
x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after first rabbits introduced")
ax.set_ylabel("Number of rabbits")
plt.show()
```


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_15_0.png)


Obviously, 600 million additional animals competing with native wildlife for food and water has a devastating impact. The vast amount of plant life they consume not only decimates the native plant life, but that in turn causes erosion, which leads to nutrient-poor soil, thus increasing the damage. It wasn’t long before the Australian government determined that rabbits were causing significant economic damage. In 1887 the government of New South Wales started soliciting methods for removing them.

The most obvious method - hunt them, isn’t actually very effective. There were efforts to shoot, trap, and poison them. The efforts were expensive, but ultimately had little impact against the robust rabbit population. To get an idea of the futility, imagine launching a tremendous rabbit hunting, trapping, and poisoning campaign that is so incredible effective that it causes the death of 50 million rabbits in a single week. But the moment that expensive campaign is stopped, which would come eventually, the population just regrows. Here’s a simulation of 50 million rabbits being killed in week 240. As you can see, only ten weeks later the population is back at the levels it started at.



```python
#Now let's try to kill fifty million off and see what would happen
num_iterations = 250 # weeks
rabbit_population= np.zeros(num_iterations)
percent_resistant = np.zeros(num_iterations)
rabbit_population[0] = 24
for x in range(1, num_iterations):
    
    if x<17: #If it's under 17 weeks then the only sexually mature rabbits are the 24 that started
        pop = pop_grow(rabbit_population[x-1], 24)
    else:
        pop = pop_grow(rabbit_population[x-1], rabbit_population[x-time_to_sexual_maturity])
    rabbit_population[x] = rabbit_population[x-1] + pop
    myxomatosis_resistant[x] = myxomatosis_resistant[x-1] + (pop*percent_resistant[x-1])
    percent_resistant[x] = myxomatosis_resistant[x]/rabbit_population[x]
    if x == 240:
        rabbit_population[x] -= 50000000 #fifty million 

x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after first rabbits introduced")
ax.set_ylabel("Number of rabbits")
plt.show()
```


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_17_0.png)


But in the 1950’s, after decades and decades of ineffective techniques, the Australian Government tried something different - biological warfare. Viruses can be incredibly effective at population control. After the rabbits are infected, the infected rabbits are the ones finding new victims, and all of the rest of the work is done. The trouble is, how can you find a virus that’s safe to release in the wild but will not wreak havoc on the ecosystem?

 The myxoma virus seemed like a perfect candidate. Although the myxoma virus infects several mammals, from rabbits and mice to humans, it can only replicate in the cells of rabbits. Without the ability to replicate in the cells, as in the case of humans, it doesn’t cause any damage. On top of that, myxoma virus spreads easily and kills rabbits within two weeks.


Now we'll encode some basic facts about rabbits and myxomatosis. We'll also throw in some assumptions as well. 
Facts:
Rabbits die within two weeks of contracting myxomatosis.
Rabbits reach sexual maturity after 17 weeks.

Assumptions:
Rabbits are close enough to 10 other rabbits each day to spread the infection.
A rabbit exposed to a rabbit with myxomatosis has a 20% chance of contracting the virus.


```python
myxo_time_to_death = 2 #weeks
# Rabbit assumptions and guesses
#from internet: rabbits are receptive to mating about 14 of every 16 days
connections_per_day = 10 #include those that are close enough to be bit by same mosquito
chance_of_being_infected = .2
week_myxo_released = 520
num_myxo_released = 5000
#where is length of life factored in?
```


```python
def spread_myxo(infected, resistant, total): #infected is the number of infected rabbits, total is the total population
    susceptible = total - resistant - infected
    susceptible_percentage = susceptible / total
    new_infections = round(infected * connections_per_day * chance_of_being_infected * susceptible_percentage)
    return new_infections
```


```python
#Now let's start the population at 600000000 and introduce the disease
num_iterations = 80 # weeks
rabbit_population, infected, myxomatosis_resistant = np.zeros(num_iterations), np.zeros(num_iterations), np.zeros(num_iterations)
percent_resistant = np.zeros(num_iterations)
rabbit_population[0] = 600000000
relative_week_myxo_released = 2
infected[relative_week_myxo_released] = num_myxo_released
for x in range(1, num_iterations):
    pop = pop_grow(rabbit_population[x-1], rabbit_population[x-time_to_sexual_maturity])
    if rabbit_population[x-1] < 2:
        print("Rabbits have been removed")
        break
    if x>relative_week_myxo_released: #If we're past the time myxo was first released
        infected[x] = spread_myxo(infected[x-1], 0, rabbit_population[x-1]) #0 rabbits are resistant
    dead_from_myxo = infected[x-myxo_time_to_death]
    rabbit_population[x] = rabbit_population[x-1] + pop - dead_from_myxo
    if rabbit_population[x] < 0:
        rabbit_population[x] = 0
    if infected[x] < 0:
        infected[x] = 0

x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.fill_between(x, 0, infected, color='r')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after myxomatosis introduced")
ax.set_ylabel("Number of rabbits")
ax.legend(("Total rabbits", "Infected rabbits"), loc='upper left')
plt.show()
```

    Rabbits have been removed
    


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_22_1.png)


After some initial trials, the technique was approved and released into the rabbit population. The rabbit population, which started at 600 million, dropped to 500 million. Then 400, 300, 200 million. The disease continued to spread and kill more and more rabbits. The population hit 100 million. But the problem is, in any large population, there’s likely to be some members that, through chance genetic mutation, have a natural resistance. This is true for nearly all diseases. Some people were naturally immune to the Black Death that killed half of all Europeans in the 14th century. Even HIV has a rival in people born with a mutation known as Delta32.

As the population of rabbits without the resistance died off, those with it swelled. Although the virus has a large impact initially, it ultimately left Australia with a large population of mutant, disease-resistant rabbits.



```python
#pop growth with no disease - use this to tell the number of new rabbits, which includes births and death from overpopulation
#the gestation is incorporated into the growth rate, so you don't have to calculated number of births or natural deaths
#this encompasses births and natural deaths
#Stop using births and overcapacity deaths and population next week
#use this as additional rabbits and then subtract myxo deaths from the total population after you've added this!
num_iterations = 600
rabbit_population, infected, myxomatosis_resistant = np.zeros(num_iterations), np.zeros(num_iterations), np.zeros(num_iterations)
percent_resistant = np.zeros(num_iterations)
rabbit_population[0] = 24
myxomatosis_resistant[0] = round(rabbit_population[0] / 10)
infected[week_myxo_released] = num_myxo_released
for x in range(1, num_iterations):
    if x<17: #If it's under 17 weeks then the only sexually mature rabbits are the 24 that started
        pop = pop_grow(rabbit_population[x-1], 24)
    else:
        pop = pop_grow(rabbit_population[x-1], rabbit_population[x-time_to_sexual_maturity])
    if rabbit_population[x-1] < 2:
        print("Rabbits have been removed")
        break
    if x>week_myxo_released:
        infected[x] = spread_myxo(infected[x-1], myxomatosis_resistant[x-1], rabbit_population[x-1])
    rabbit_population[x] = rabbit_population[x-1] + pop - infected[x-myxo_time_to_death]
    myxomatosis_resistant[x] = myxomatosis_resistant[x-1] + (pop*percent_resistant[x-1])
    percent_resistant[x] = myxomatosis_resistant[x]/rabbit_population[x]

x = np.arange(num_iterations)
fig, ax = plt.subplots()
ax.fill_between(x, 0, rabbit_population, color='g')
ax.fill_between(x, 0, infected, color='r')
ax.fill_between(x, 0, myxomatosis_resistant, color='b')
ax.fill_between(x, 0, infected, color='r')
ax.set_title("Rabbit growth in Australia")
ax.set_xlabel("Weeks after first rabbits introduced")
ax.set_ylabel("Number of rabbits")
ax.legend(("Total rabbits", "Infected rabbits", "Resistant rabbits"), loc='upper left')
plt.show()
```


![png](2000-08-25-Rabbits-in-Australia_files/2000-08-25-Rabbits-in-Australia_24_0.png)


And that's where we are today.


```python

```
