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

### Set the buildpack:
```
heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
heroku buildpacks:add heroku/nodejs
```

### Specify the subdirectory: 
Create a .buildpacks file in the root of your project and specify the build directory.
```
echo "build" > .buildpacks
heroku config:set PROJECT_PATH=build
```

### Check your current branch name:
```
git branch
```
in my case, it named "tick-tac-toe"

### Deploy
```
git push heroku tick-tac-toe:main
heroku ps:scale web=1
```
