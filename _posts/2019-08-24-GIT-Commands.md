GIT is distributed versions control system which is now widely used all around the industry. Familiarity with GIT command can accelerate your learning and might help you to correct your mistakes in future.

Let’s start with first few east commands and then further move on more advanced command

<h3>Status</h3>

Status command informs the user about the tracked and untracked changes it has made on the original file snapshot. It change could include -  rename, delete, modify etc, The general color code is green for the tracked changes and red for untracked changes. We can add untracked changes to tracked changes using the ```add``` command which will be discussed later.
```
git status
```

<img src = ./../images/Screen-Shot-2014-08-03-at-9.43.15-PM.png> add command</img>


<h3>Add</h3>

Git works on 3 tier tree architecture which involves - Working, Staging index and Repository. Whatever changes user makes will be first done in the working tier, Git provides the facility of choosing which all the file change you want to push it upstream. Staging area is for that, You can make the change put it on staging area.  You can’t commit to the repository without the changes being in the staging area. 
![add command](images/Screen-Shot-2014-08-03-at-9.43.15-PM.png)

```
git add Path/to/File
```
This command pushed the file change to the staging index before it can get committed 


We can work on future commands in the later section of the blog.
