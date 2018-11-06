# [For an existing Heroku app](https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app)

If you have already created your Heroku app, you can easily add a remote to your local repository with the heroku git:remote command. All you need is your Heroku app’s name:

```
heroku git:remote -a thawing-inlet-61413
set git remote heroku to https://git.heroku.com/thawing-inlet-61413.git
```

## Renaming remotes

By default, the Heroku CLI names all of the Heroku remotes it creates for your app heroku. You can rename your remotes with the git remote rename command:

```
git remote rename heroku heroku-staging
```

Renaming your Heroku remote can be handy if you have multiple Heroku apps that use the same codebase (for example, the staging and production versions of an app). In this case, each Heroku app has its own remote in your local repository.
