First of all since I'll be working with GitHub I would like to have a quick guide and my own cheat sheet on github!

Let's get started, the easy stuff is to set up GitHub. 

1. Now to start a new project got to the folder and use:
```
git init .
```

2. Remember to add a README.md file to explain a bit about the project also a .gitignore file to ignore all the files that are not needed
An example of a .gitignore file of course not everything is needed:
```
# Compiled source #
*.com
*.class
*.dll
*.exe
*.o
*.so

# Packages #
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
*.log
*.sql
*.sqlite

# OS generated files #
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```
3. Now we can start with our first commit:
```
git add .
git commit -m "First commit - your message goes here"
```
This does not means it is already in Github but you can now start working in this directory

4. You will have to createa  new repository in github
5. Now let's push the new repo to GitHub and link the local repo to GitHub
```
git remote add origin https://github.com/ACCOUNT_NAME/REPO_NAME.git
git push -u origin master
```
This will ask you for a username and a password and that's it!

