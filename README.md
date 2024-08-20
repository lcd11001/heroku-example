## [How to Deploy a React app to Heroku](https://dev.to/mrcflorian/how-to-deploy-a-react-app-to-heroku-44ig)

### Login
```
heroku login
```

### Create a new Heroku app (if you haven't already)
```
heroku create your-app-name
```
or add to existing Heroku app
```
heroku git:remote -a your-heroku-app-name
```

### Check your current branch name:
```
git branch
```

### Deploy
```
git push heroku <branch-name>
heroku ps:scale web=1
```
