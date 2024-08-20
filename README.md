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

### Set the buildpack:
```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static
```

### Specify the subdirectory: 
Create a .buildpacks file in the root of your project and specify the build directory.
```
echo "build" > .buildpacks
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
