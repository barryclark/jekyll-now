---
layout: post
title: Gameboard Problem
date: April 10, 2019
time: 22:54 UTC-4 
---

This problem was posed in the Spring 2019 ACM Lower Division Codeathon. I chose this problem because it is a very nice strategy problem. Not necessarily solely an algorithm problem anymore. It is also partly a strategy and optimization problem all rollwed into one. The original analysis was from USACO's Nick Wu, [Cow Tipping](http://usaco.org/current/data/sol_cowtip_bronze_jan17.html). The [Original Problem](http://usaco.org/index.php?page=viewproblem2&cpid=689).

> 
> ### Gameboard
> 
> ---
> 
> The queen is trying to repaint her $$n x n$$ chessboard. Someone decided to repaint the chessboard, so it is no longer in the alternating colors like a chessboard should be. The squares in the chessboard can be of two colors, black, or white. The queen can only work in rectangles(squares included) however, and she doesn't have any paint. The squares are very scared of the frightening queen, so when she orders the squares to switch they switch, from where she is standing to the upper-left most square(in a rectangular fashion).
> 
> When she does order the squares, every square to the left most square on the same row, to the top most square, and all squares from those boundaries to the upper most left square, flip from black to white, and from white to black. However it is very taxing for the queen to order all of her square. She would like to know what the minimum number of orders would be sufficent for her to get all of her squares in the correct orientation so she can bring her pieces to the board.
> 
> The board should be such that no square shares a direct border with a same color square. It also should be that the top left square is white.
> 
> An example of a valid board is.
> 
> ```
> 0101
> 1010
> 0101
> 1010
> ```
> 
> An example of one done is starting with the board:
> 
> ```
> 000
> 101
> 010
> ```
> 
> In just two moves we can get to the final board. The first by flipping everything from the middle square to the upper-left most corner. And then again with the upper-left most corner.
> 
> ```
> 110
> 101
> 010
> ```
> ```
> 010
> 101
> 010
> ```
> 
> So the output for the inputted board would be 2.
> 
> ## Input
> 
> ---
> 
> The first line of the input will n, the number of rows and columns of the board.
> Every row will then be, 0 for a white square, and 1 for a black square and every row will be on its own line.
> 
> ### Parameters
> 
> $$3 < n < 100$$
> 
> ## Output
> 
> ---
> 
> The output should be the minimum number of orders the queen must make so that the board returns to the correct ordering, followed by a newline.
> 

The algorithm is simply a strategy problem. We have say a 3x3 board, and every change affects all the ones between that position and the top corner. So we can say every square affects it subsquare between it and above.

So if we're given a board of  
```
010
110
001
```
It corresponds to the board  
![Input Board](../images/qboard/input.png "Input Board"){:height="200px" width="200px"}.  
The question is what is the minimum number of steps to get to this board,  
![Output Board](../images/qboard/output.png "Output Board"){:height="200px" width="200px" align="center"}.  
Which square do we start with? Well let's try to find a square, that we need to flip. Then when we choose the bottom right corner, all squares will have to flip. But all other squares when they're flipped, the bottom right corner is not flipped. So with that in mind we know that the first one we need to flip is the bottom right corner. Then we can use the same deduction logic. Now that the bottom right corner is solved, there are 2 squares that only can be flipped when you flip themselves. Both are valid strategies.


## Python Solution

```python
#! /usr/bin/env python3

from sys import stdin, stdout

# Get board
def getboard(board, n):
  for i in range(n):
    line = stdin.readline()
    board[i] = list(map(lambda x: int(x), list(line)[:n]))

# Solution
def main():
  n = int(stdin.readline())
  # Get an array like structure
  board = [[0 for i in range(n)] for j in range(n)]
  getboard(board, n)
  # Solution
  numtips = 0
  for i in range(n-1, -1, -1):
    for j in range(n-1, -1, -1):
      if board[i][j] != (i+j) % 2: # Not the correct square so flip all above and to the left
        numtips += 1
        for ii in range(i+1):
          for jj in range(j+1):
            board[ii][jj] += 1
            board[ii][jj] %= 2
  print(numtips)


if __name__ == '__main__':
    main()
```

## Java Solution

```java
import java.io.*;
import java.util.*;

public class Solution {
  public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);
        int n = keyboard.nextInt();
        char[][] grid = new char[n][n];
        keyboard.nextLine();
        final char UPRIGHT = '0';
        final char WRONG   = '1';
        for(int i = 0; i < n; i++) {
            String line = keyboard.nextLine();
            for(int j = 0; j < n; j++) {
                grid[i][j] = line.charAt(j);
                //Insert character into grid
            }//Per character
        }//Per line
        
        int numOfTips = 0;
        for(int i = n - 1; i >= 0; i--) {
            for(int j = n - 1; j >= 0; j--) {
                if(grid[i][j] != correctSquare(i, j)) {
                    //Add one to the tips we need
                    numOfTips++;
                    //If the one we're looking at is wrong, flip everything
                    for(int ii = 0; ii <= i; ii++) {
                        for(int jj = 0; jj <= j; jj++) {
                            grid[ii][jj] = (grid[ii][jj] == UPRIGHT) ? WRONG : UPRIGHT;
                        }
                    }//Flip them all
                }//Check if the one is wrong
            }//go from column right to left
        }//go from row right to left
        System.out.println(numOfTips);
    }//main

    public static char correctSquare(int i, int j) {
      return (i + j) % 2 == 0 ? '0' : '1';
    }
}//solution
```

#### Note

It seems that this problem is $$O(n^4)$$.
