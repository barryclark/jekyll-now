# EPPS 7V81 Advanced Programming
# Instructor: Dr.Ho
# Min Shi
# June.16th 2020

rm(list=ls())

## Load packages
library(tidyverse)
library(ggplot2)
library(dplyr)
library(lubridate)
library(zoo)


setwd("/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2")

mydata <- read.csv(file = '/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/Trump-U.S.-China trade war.csv')

str(mydata)

# add dates column to my data frame.
mydata$dates <- as.Date(mydata$date, tryFormats = c("%Y-%m-%d") ,optional = FALSE)
mydata$yr <- year(mydata$dates)
mydata$monyr <- as.yearmon(mydata$dates)


# plot the frequency of retweets about U.S.-China trade war
mydata %>%
ggplot(aes(x=dates,y=retweets))+
  geom_point(color = "darkorchid4") +
  labs(title = "Plot for Frequency of Retweets about U.S.- China Trade War",
       y = "The frequency of retweets",
       x = "Date(in month-year)") + theme_bw(base_size = 13)
dev.copy(png,"/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/TwitterRetweetsUSChina1.png")

# Plot the frequency of replies in Twitter about U.S.-China trade war
mydata %>%
  ggplot(aes(x=monyr,y=replies))+
  geom_point(color = "darkorchid4") +
  labs(title = "Plot for frequency of replies in Twitter about U.S.-China trade war",
       y = "The frequency of replies",
       x = "Date") + theme_bw(base_size = 13)
dev.copy(png,"/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/TwitterRepliesUSChina1.png")

# Plot the frequency of favorites about U.S.-China trade war
mydata %>%
  ggplot(aes(x=monyr,y=favorites))+
  geom_point(color = "darkorchid4") +
  labs(title = "Plot for frequency of favorites in Twitter about U.S.-China trade war",
       y = "The frequency of favorites",
       x = "Date") + theme_bw(base_size = 13)
dev.copy(png,"/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/TwitterFavoritesUSChina1.pdf")

# Plot mentions

mydata %>%
  ggplot(aes(x=monyr,y=mentions))+
  geom_point(color = "darkorchid4") +
  labs(title = "Plot for Mentions about U.S.- China Trade War in Twitter",
       y = "Mentions",
       x = "Date") + theme_bw(base_size = 13)
dev.copy(png,"/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/TwitterMentionsUSChina1.png")

# Make a barplot for the frequency of tweets about U.S.-China trade war
barplot(table(mydata$monyr), main="Barplot for Frequency of tweets about U.S.- China Trade War", 
        xlab="Date", ylab="frequency of tweets")
dev.copy(png,"/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 2/TwitterFrequencyUSChina.png")



