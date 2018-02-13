This time I'll be working a bit with two search algorithms depth first and breadth first search and commiting changes to GitHub

### What's the main difference between depth first and breadth first search?

The difference is the way the algorithm goes through the whole tree, the depth first search algorithm will start going as far as possible until the bottom while the breadth first search will go from one node to the sibling node
Depth first searches all the sons first and then move to the parent's node sibling
Breadth first searches all the siblings first and then move to the sons

I decided that I'll be using python. First we need a class to build our tree and start working with a binary tree.
```python
class Node:
    def __init__(self, val):
        self.l = None
        self.r = None
        self.v = val
    
    def addLeft(self,node):
        self.l=node

    def getLeft(self):
        return self.l

    def addRight(self,node):
        self.r=node

    def getRight(self):
        return self.r

    def getNode(self):
        return self.v
```

### Creating our Git branch and pushing our changes to Git

1. Create a new file with the node class
Now that we have our Class in place we need to commit our changes, creating a new branch and then commiting to that branch
2. Create a new branch
```bash
git branch feature/node_class
```
3. Switch to the branch that we will be using
```bash
git checkout feature/node_class
```
4. Check the files and the status (OPTIONAL)
```bash
git status
```
5. Add everything
```bash
git add .
```
6. Commit and add a message
```bash
git commit -m "Addin node class"
```
6. Push changes to the new branch
```bash
git push --set-upstream origin feature/node_class
```

That's it! There should now be a new branch with our changes, it is time to open a new pull request and then merge to master 

### Coding the algorithms

It's time now to take a look at the algorithms that will be used

1. Depth first search: 
```python
def depthSearch(tree,visited):
    #This algorithm can be look at as an issue where you always want to start going on the right
    #If there's nothing else on the right then you can try with the left but only the brother of the node

    visited.append(tree.getNode())
    #Stopping until the bottom of the tree for both Right and Left childs
    if tree.getRight() != None:
        depthSearch(tree.getRight(),visited)

    if tree.getLeft() != None:
        depthSearch(tree.getLeft(),visited)

    return visited
```

2. Breadth search:
```python
def breadthSearch(queue, visisted):
    #We can try taking a look at the algorithm as a stack and queue problem
    #Using a queue it's easy to solve, the sons of a Node are sent to the end of the queue
    #When a node is visisted the value is saved to know the order it was visited
    if len(queue) != 0:#Stopping only when the array is completly empty

        visisted.append(queue[0].getNode())

        if queue[0].getLeft() != None:#In this way we only add the node if it exists at all
            queue.append(queue[0].getLeft())
        if queue[0].getRight() != None:
            queue.append(queue[0].getRight())

        queue.popleft()
        breadthSearch(queue,visisted)

    return visisted
```
Both algorithms are representing how the search would be made. So now we need a way to print our tree:
```python
def printTree(tree):
    if tree != None:
        printTree(tree.getLeft())
        print(tree.getNode())
        printTree(tree.getRight())
```

### Time to test the algorithms

```python
test = Node(0)
childLeft = Node(1)
childLeft.addRight(Node(3))
childLeft.addLeft(Node(5))
test.addLeft(childLeft)

childRight = Node(2)
childRight.addRight(Node(4))
childRight.addLeft(Node(6))
test.addRight(childRight)

print("Depth First search order:" + str(depthSearch(test,[])))
print("Breadth First search order:" + str(breadthSearch(deque([test]),[])))
```

### Commit the new changes


```python
git branch feature/algorithms
git checkout feature/algorithms
git add .
git commit -m "Adding the search algorithms"
git push --set-upstream origin feature/algorithms
```
Now we will create a pull request from the GitHub repository

1. Go to the project in Github
2. Select branches
3. Select the branch that you have been working on
4. click on create pull request
5. Accept pull request (OPTIONAL since you might not have the privileges to make pull requests to this branch)
