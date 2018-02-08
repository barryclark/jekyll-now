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
1. Create a new file with the node class
Now that we have our Class in place we need to commit our changes, creating a new branch and then commiting to that branch
2. Create a new branch
```
git branch feature/node_class
```
3. Switch to the branch that we will be using
```
git checkout feature/node_class
```
4. Check the files and the status (OPTIONAL)
```
git status
```
5. Add everything
```
git add .
```
6. Commit and add a message
```
git commit -m "Addin node class"
```
6. Push changes to the new branch
```
git push --set-upstream origin feature/node_class
```

That's it! There should now be a new branch with our changes, it is time to open a new pull request and then merge to master 

It's time now to take a look at the algorithms that 
