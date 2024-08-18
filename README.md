### Login
```
heroku login
```

### Create a new Heroku app (if you haven't already)
```
heroku create your-app-name
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
```

### Deploy
```
git push heroku main
heroku ps:scale web=1
```
