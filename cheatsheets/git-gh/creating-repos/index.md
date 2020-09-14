---
title: "Creating Git (and GitHub) Repositories"
layout: page
---
## Prerequisites 
- Git installed
- VS Code installed
- Github Account created
- [Command Line Cheatsheet]({{site.basurl}}/cheatsheets/command-line)
- [File Naming Conventions Cheatsheet]({{site.basurl}}/cheatsheets/naming-conventions)
- [Git Cheatsheet]({{site.basurl}}/cheatsheets/git-gh)

## Before You Start
### Questions to Consider
Before you go initializing Git repositories willy nilly, take some time to answer (or at least consider):
1. Am I working alone or will I need to collaborate with other coders? For our purposes, we'll assume you're working alone.
2. Is this an existing project? In other words, do you already have a folder of files on your system that you'd like to commit?
3. Will you need to access the code on different machines?
4. Is the project a static website? If yes, do you want to (eventually) deploy it to GH Pages?
5. Do you plan to make changes to the repo? Many repos (such as static libraries like jQuery) are meant to be read-only.
6. If you don't own the repo, do you plan on submitting Pull Requests?

## Scenario 1: Clone a read-only remote repo to your local system
The course materials for this course are all stored as public repos that you can clone onto your system. These are meant to be for reference in support of each day's lesson. It is not expected that you will be altering these files.

### Terminology
<dl>
  <dt>Read-only Repo</dt>
  <dd>A remote repository (on a service such as GitHub) that you do not own or have permission to change.</dd>
</dl>

### Assumptions
- Read-only: Yes
- Pull Requests: No

### Cloning a read-only repo to your system
1. Using the terminal, navigate to the directory you will be storing the repos associated with this program.
2. Browse to the repository you would like to clone. For example, here is the [WBDV sample-code](https://github.com/sait-wbdv/sample-code) repo.
3. Copy and paste the clone URL listed under the green `Code` menu. GitHub recommends you use the [HTTPS link](https://stackoverflow.com/questions/11041729/why-does-github-recommend-https-over-ssh).
4. Clone the repo to your machine by entering the following terminal command:

    ```
    $ git clone https://github.com/sait-wbdv/sample-code.git
    ```

5. Navigate to the new directory that Git copied to your location:

    ```
    $ cd [dir-name]
    ```

6. Confirm the status of your new local repo:

    ```
    $ git status
    ```

### Refreshing your local repo
Your instructor will be pushing updates to the program repos throughout this program. You can refresh your local copy by pulling new changes:

```
$ git pull
```

The connection between your local copy and the remote master copy was created when you first created clone the repo.

### Pushing changes to the remote repo
If you have permissions to push changes to this repo, see this Cheatsheet for the [`add`/`commit`/`push` life cycle]({{site.basurl}}/cheatsheets/git-gh/add-commit-push/).

## Scenario 2: Initialize a new local repo inside an existing project
### Terminology
<dl>
  <dt>Project</dt>
  <dd>A directory that contains all the files needed for a website or application to function.</dd>
</dl>

### Assumptions
- Existing project: Yes
- Read-only: No

### Initializing a new repo
1. Using the terminal, navigate to your project directory.
2. Confirm that you are not already in a git repository:

    ```
    $ git status
    ```

    should return "fatal: not a git repository" or similar. If the command outputs branch information, you're inside a repo you've already created. That's a tricky situation you should ask your closest Git nerd about.
3. Initialize your repo

    ```
    $ git init
    ```

4. Stage and commit your project files:

    ```
    $ git add --all
    $ git commit -m "initial commit"
    ```

Note: To link a local repo to a remote GitHub repo, see Scenario 4 below.

## Scenario 3: Create a Burnable Remote repo
### Terminology
<dl>
  <dt>Burnable</dt>
  <dd>Tony's expression: a repo or project that can be deleted without losing any work you'd like to keep.</dd>
  <dt>Burn the Farm</dt>
  <dd>Tony's expression for deleting a repo or project and rebuilding and start fresh (if needed). There should be nothing left but ashes (no lingering files cluttering up your system/GH account).</dd>
</dl>

### Assumptions
- Existing project: Yes
- Read-only: Yes
- Local repo: No

1. Create a public repo on GH, with `Add a README file` **unchecked**.
2. Click on `Add an existing file`.
3. Upload (for example) a static website template of your choice. Note: the GH interface is limited to 100 file uploads. If your project is too large, you can:
    - Upload root directories gradually as separate commits;
    - Remove any unneeded files (i.e. file formats that the browser doesn't support, such as Photoshop files);
    - Use the command line instead by following Scenario 4 below.
4. Commit your changes in the GH web interface.
5. Optional: Edit your new file using the GH edit feature.
6. Optional: Turn on GH Pages
    - Settings -> scroll to GH Pages
    - Optional: Choose theme (GH Pages uses [Jekyll](https://jekyllrb.com/) internally)
7. Optional: Burn the farm by deleting the repo and start over.

**Pro-tip**: Building "throw-away" _Hello World!_ repos is a great way to test different templates. Try naming them `hello-[whatever]` so you know not to put important content in them. Otherwise, they're harder to burn later.
{:.notice--info}

## Scenario 4: Link an existing repo to a new GitHub remote repo
### Terminology
<dl>
  <dt>Linked Repo</dt>
  <dd>A local repo that is associated with one or more remote repos (on GitHub, for example). This is done using the `git remote add` command.</dd>
  <dt>Origin</dt>
  <dd>A shorthand name for the remote repository URL.</dd>
</dl>

### Assumptions
- Existing project: Yes
- Existing local repo: Yes (see Scenario 2 above)
- Empty remote repo: Yes (see Scenario 3 above)

### Link and push initial commit to empty local repo
1. Ensure you have a clean working tree with `git status`.
2. Link and empty remote repo to your local repo (using the HTTPS method):

    ```
    $git remote add origin https://github.com/sait-wbdv/temp.git
    ```

3. Push your local repo to the remote repo (after this initial push, you only need to use `git push` for future pushes):

    ```
    $ git push -u origin master
    ```