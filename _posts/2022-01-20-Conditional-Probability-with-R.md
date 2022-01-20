---
layout: post
title: Conditional Probability with R
tags: tutorials R 
---

In this post, we will explore conditional probability and how it relates to Bayes' Theorem.

Conditional Probability
-----------------------

Conditional probability is the likelihood of an event or outcome
occurring based on the occurrence of a previous event or outcome. Below
is the equation for the conditional probability.

$P(A|B) = \\frac{P(A \\cap B) }{P(B)}$

where:

*P*(*A* ∩ *B*) is the probability that event A and event B both occur.

*P*(*B*) is the probability that event B occurs.

For example:

-   Event A is a person completing their projects on time in a year.
    There is 85% chance that this person will complete their work on
    time.
-   Event B is that this person receiving a raise at the end of the
    year. Raises are only given to to 45% of those that complete their
    work on time in a year.  
-   P(complete work and raise) = P(raise|complete work) P(complete work)
    = 0.45 \* 0.85 = 0.3825

Looks like working hard does pay off. Conditional probability implies
there is a relationship between these two events, such as the
probability as completing your work on time in a year, and receiving a
raise. In other words, conditional probability depends on a previous
result. In this case, it is the probability of completing your work on
time.

Let’s take a look at a survey given to male and female students and
asking what their favorite past times are. Below a prepared a function
`rng_survey()` to generate the survey answers.

    #helper function for our survey
    rng_survey <- function(max, n){ 
      #max is the maximum number of surveys for a participant group (ie. Male)
      #n is the number of possible answers
      total = 0
      while (total != max){
        x <- sample(1:max, n, replace = TRUE)
        total = sum(x)
      }
      return(x)
    }

    #male = rng_survey(150,4)
    #female = rng_survey(150,4)
    #cat("male answers:", male, "\n") 
    #cat("female answers:", female, "\n") 

    #male answers: 7 19 26 98 
    #female answers: 7 69 40 34 

Using the function, we create a data frame with the survey answers.

    #create data frame for the survey responses
    df <- data.frame(gender=rep(c('Male', 'Female'), each=150),
                     sport=rep(c('Exercise', 'Cooking', 'Reading', 'Television',
                                 'Exercise', 'Cooking', 'Reading', 'Television'),
                                  times=c(7, 19, 26, 98, 7, 69, 40, 34 )))
    df

    ##     gender      sport
    ## 1     Male   Exercise
    ## 2     Male   Exercise
    ## 3     Male   Exercise
    ## 4     Male   Exercise
    ## 5     Male   Exercise
    ## 6     Male   Exercise
    ## 7     Male   Exercise
    ## 8     Male    Cooking
    ## 9     Male    Cooking
    ## 10    Male    Cooking
    ## 11    Male    Cooking
    ## 12    Male    Cooking
    ## 13    Male    Cooking
    ## 14    Male    Cooking
    ## 15    Male    Cooking
    ## 16    Male    Cooking
    ## 17    Male    Cooking
    ## 18    Male    Cooking
    ## 19    Male    Cooking
    ## 20    Male    Cooking
    ## 21    Male    Cooking
    ## 22    Male    Cooking
    ## 23    Male    Cooking
    ## 24    Male    Cooking
    ## 25    Male    Cooking
    ## 26    Male    Cooking
    ## 27    Male    Reading
    ## 28    Male    Reading
    ## 29    Male    Reading
    ## 30    Male    Reading
    ## 31    Male    Reading
    ## 32    Male    Reading
    ## 33    Male    Reading
    ## 34    Male    Reading
    ## 35    Male    Reading
    ## 36    Male    Reading
    ## 37    Male    Reading
    ## 38    Male    Reading
    ## 39    Male    Reading
    ## 40    Male    Reading
    ## 41    Male    Reading
    ## 42    Male    Reading
    ## 43    Male    Reading
    ## 44    Male    Reading
    ## 45    Male    Reading
    ## 46    Male    Reading
    ## 47    Male    Reading
    ## 48    Male    Reading
    ## 49    Male    Reading
    ## 50    Male    Reading
    ## 51    Male    Reading
    ## 52    Male    Reading
    ## 53    Male Television
    ## 54    Male Television
    ## 55    Male Television
    ## 56    Male Television
    ## 57    Male Television
    ## 58    Male Television
    ## 59    Male Television
    ## 60    Male Television
    ## 61    Male Television
    ## 62    Male Television
    ## 63    Male Television
    ## 64    Male Television
    ## 65    Male Television
    ## 66    Male Television
    ## 67    Male Television
    ## 68    Male Television
    ## 69    Male Television
    ## 70    Male Television
    ## 71    Male Television
    ## 72    Male Television
    ## 73    Male Television
    ## 74    Male Television
    ## 75    Male Television
    ## 76    Male Television
    ## 77    Male Television
    ## 78    Male Television
    ## 79    Male Television
    ## 80    Male Television
    ## 81    Male Television
    ## 82    Male Television
    ## 83    Male Television
    ## 84    Male Television
    ## 85    Male Television
    ## 86    Male Television
    ## 87    Male Television
    ## 88    Male Television
    ## 89    Male Television
    ## 90    Male Television
    ## 91    Male Television
    ## 92    Male Television
    ## 93    Male Television
    ## 94    Male Television
    ## 95    Male Television
    ## 96    Male Television
    ## 97    Male Television
    ## 98    Male Television
    ## 99    Male Television
    ## 100   Male Television
    ## 101   Male Television
    ## 102   Male Television
    ## 103   Male Television
    ## 104   Male Television
    ## 105   Male Television
    ## 106   Male Television
    ## 107   Male Television
    ## 108   Male Television
    ## 109   Male Television
    ## 110   Male Television
    ## 111   Male Television
    ## 112   Male Television
    ## 113   Male Television
    ## 114   Male Television
    ## 115   Male Television
    ## 116   Male Television
    ## 117   Male Television
    ## 118   Male Television
    ## 119   Male Television
    ## 120   Male Television
    ## 121   Male Television
    ## 122   Male Television
    ## 123   Male Television
    ## 124   Male Television
    ## 125   Male Television
    ## 126   Male Television
    ## 127   Male Television
    ## 128   Male Television
    ## 129   Male Television
    ## 130   Male Television
    ## 131   Male Television
    ## 132   Male Television
    ## 133   Male Television
    ## 134   Male Television
    ## 135   Male Television
    ## 136   Male Television
    ## 137   Male Television
    ## 138   Male Television
    ## 139   Male Television
    ## 140   Male Television
    ## 141   Male Television
    ## 142   Male Television
    ## 143   Male Television
    ## 144   Male Television
    ## 145   Male Television
    ## 146   Male Television
    ## 147   Male Television
    ## 148   Male Television
    ## 149   Male Television
    ## 150   Male Television
    ## 151 Female   Exercise
    ## 152 Female   Exercise
    ## 153 Female   Exercise
    ## 154 Female   Exercise
    ## 155 Female   Exercise
    ## 156 Female   Exercise
    ## 157 Female   Exercise
    ## 158 Female    Cooking
    ## 159 Female    Cooking
    ## 160 Female    Cooking
    ## 161 Female    Cooking
    ## 162 Female    Cooking
    ## 163 Female    Cooking
    ## 164 Female    Cooking
    ## 165 Female    Cooking
    ## 166 Female    Cooking
    ## 167 Female    Cooking
    ## 168 Female    Cooking
    ## 169 Female    Cooking
    ## 170 Female    Cooking
    ## 171 Female    Cooking
    ## 172 Female    Cooking
    ## 173 Female    Cooking
    ## 174 Female    Cooking
    ## 175 Female    Cooking
    ## 176 Female    Cooking
    ## 177 Female    Cooking
    ## 178 Female    Cooking
    ## 179 Female    Cooking
    ## 180 Female    Cooking
    ## 181 Female    Cooking
    ## 182 Female    Cooking
    ## 183 Female    Cooking
    ## 184 Female    Cooking
    ## 185 Female    Cooking
    ## 186 Female    Cooking
    ## 187 Female    Cooking
    ## 188 Female    Cooking
    ## 189 Female    Cooking
    ## 190 Female    Cooking
    ## 191 Female    Cooking
    ## 192 Female    Cooking
    ## 193 Female    Cooking
    ## 194 Female    Cooking
    ## 195 Female    Cooking
    ## 196 Female    Cooking
    ## 197 Female    Cooking
    ## 198 Female    Cooking
    ## 199 Female    Cooking
    ## 200 Female    Cooking
    ## 201 Female    Cooking
    ## 202 Female    Cooking
    ## 203 Female    Cooking
    ## 204 Female    Cooking
    ## 205 Female    Cooking
    ## 206 Female    Cooking
    ## 207 Female    Cooking
    ## 208 Female    Cooking
    ## 209 Female    Cooking
    ## 210 Female    Cooking
    ## 211 Female    Cooking
    ## 212 Female    Cooking
    ## 213 Female    Cooking
    ## 214 Female    Cooking
    ## 215 Female    Cooking
    ## 216 Female    Cooking
    ## 217 Female    Cooking
    ## 218 Female    Cooking
    ## 219 Female    Cooking
    ## 220 Female    Cooking
    ## 221 Female    Cooking
    ## 222 Female    Cooking
    ## 223 Female    Cooking
    ## 224 Female    Cooking
    ## 225 Female    Cooking
    ## 226 Female    Cooking
    ## 227 Female    Reading
    ## 228 Female    Reading
    ## 229 Female    Reading
    ## 230 Female    Reading
    ## 231 Female    Reading
    ## 232 Female    Reading
    ## 233 Female    Reading
    ## 234 Female    Reading
    ## 235 Female    Reading
    ## 236 Female    Reading
    ## 237 Female    Reading
    ## 238 Female    Reading
    ## 239 Female    Reading
    ## 240 Female    Reading
    ## 241 Female    Reading
    ## 242 Female    Reading
    ## 243 Female    Reading
    ## 244 Female    Reading
    ## 245 Female    Reading
    ## 246 Female    Reading
    ## 247 Female    Reading
    ## 248 Female    Reading
    ## 249 Female    Reading
    ## 250 Female    Reading
    ## 251 Female    Reading
    ## 252 Female    Reading
    ## 253 Female    Reading
    ## 254 Female    Reading
    ## 255 Female    Reading
    ## 256 Female    Reading
    ## 257 Female    Reading
    ## 258 Female    Reading
    ## 259 Female    Reading
    ## 260 Female    Reading
    ## 261 Female    Reading
    ## 262 Female    Reading
    ## 263 Female    Reading
    ## 264 Female    Reading
    ## 265 Female    Reading
    ## 266 Female    Reading
    ## 267 Female Television
    ## 268 Female Television
    ## 269 Female Television
    ## 270 Female Television
    ## 271 Female Television
    ## 272 Female Television
    ## 273 Female Television
    ## 274 Female Television
    ## 275 Female Television
    ## 276 Female Television
    ## 277 Female Television
    ## 278 Female Television
    ## 279 Female Television
    ## 280 Female Television
    ## 281 Female Television
    ## 282 Female Television
    ## 283 Female Television
    ## 284 Female Television
    ## 285 Female Television
    ## 286 Female Television
    ## 287 Female Television
    ## 288 Female Television
    ## 289 Female Television
    ## 290 Female Television
    ## 291 Female Television
    ## 292 Female Television
    ## 293 Female Television
    ## 294 Female Television
    ## 295 Female Television
    ## 296 Female Television
    ## 297 Female Television
    ## 298 Female Television
    ## 299 Female Television
    ## 300 Female Television

We convert the data frame to a table.

    #create two-way table from data frame
    survey_data <- addmargins(table(df$gender, df$sport))

    survey_data

    ##         
    ##          Cooking Exercise Reading Television Sum
    ##   Female      69        7      40         34 150
    ##   Male        19        7      26         98 150
    ##   Sum         88       14      66        132 300

We can extract information from our table by calling a row and a column.
For instance, let’s ask for the number of males that prefer cooking.

    survey_data['Male', 'Cooking']

    ## [1] 19

Now we can ask the probability of being male given that they prefer
cooking. We know that the probability of being male is `0.5`. We can
calculate the rest from the table.

    P_male = 0.5
    P_cooking_male = survey_data['Male', 'Cooking'] / survey_data['Male', 'Sum'] #probability of only males that prefer cooking

    P_male_P_cooking_male = P_male * P_cooking_male
    P_cooking = survey_data['Sum', 'Cooking'] / survey_data['Sum', 'Sum'] #probability of male and female that prefers cooking

    P_male_cooking =  P_male_P_cooking_male / P_cooking

    P_male_cooking #probability of being male given they prefer cooking

    ## [1] 0.2159091

Alternatively, we can use the table to easily answer the same problem.

    survey_data['Male', 'Cooking'] / survey_data['Sum', 'Cooking'] 

    ## [1] 0.2159091

Next, we can ask the probability of being female given that they prefer
reading.

    survey_data['Female', 'Reading'] / survey_data['Sum', 'Reading']

    ## [1] 0.6060606

Bayes’ Theorem
--------------

Suppose that we have the same survey but male and female was not
recorded by accident. How could we solve the probability of being male
given that they prefer cooking? Let us assume from a previous survey we
knew that 12.67% of males prefer to cook or is the probability of
preferring to cook given that they are male. We can use something called
[Bayes’ Theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem){:target="_blank"},

$P(A|B) = \\frac{P(B|A) P(A) }{P(B)}$.

Bayes’ Theorem describes the probability of an event based on prior
knowledge of conditions that may be related to the event.

Knowing that the equation for conditional probability is

$P(A|B) = \\frac{P(A \\cap B) }{P(B)}$

then

*P*(*A* ∩ *B*) = *P*(*A*|*B*)*P*(*B*)

and

*P*(*A* ∩ *B*) = *P*(*B*|*A*)*P*(*A*).

We can solve for *P*(*A* ∩ *B*) with substitution to yield

$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$.

    #view table
    survey_data

    ##         
    ##          Cooking Exercise Reading Television Sum
    ##   Female      69        7      40         34 150
    ##   Male        19        7      26         98 150
    ##   Sum         88       14      66        132 300

    P_male = 0.5
    P_cooking_male = 0.1267 #probability of prefering to cook given that they are male
    P_cooking = survey_data['Sum', 'Cooking'] / survey_data['Sum', 'Sum'] #probability of male and female that prefers cooking

    P_male_cooking =  (P_cooking_male * P_male) / P_cooking

    P_male_cooking #probability of being male given they prefer cooking

    ## [1] 0.2159659

Let’s try to solve for the reverse, the probability of prefering to cook
given that they are male, using Bayes’ Theorem.

    P_male_cooking * P_cooking / P_male

    ## [1] 0.1267

Is there a way to solve for the probability of preferring to cook given
that they are female using Bayes’ Theorem?

    P_female = 1 - P_male #We have a binary choice and the probabilities sum up to 1
    P_female_cooking = 1 - P_male_cooking
    P_female_cooking * P_cooking / P_female

    ## [1] 0.4599667

Looking back at the table, we can use Bayes’ Theorem to solve this
problem.

    survey_data['Female', 'Cooking'] / survey_data['Female', 'Sum']

    ## [1] 0.46

Additional Resources
--------------------

-   [Conditional Probability with
    R](https://districtdatalabs.silvrback.com/conditional-probability-with-r){:target="_blank"} 
-   [Introduction to Conditional Probability and Bayes theorem in R for
    data science
    professionals](https://www.analyticsvidhya.com/blog/2017/03/conditional-probability-bayes-theorem/){:target="_blank"} 
