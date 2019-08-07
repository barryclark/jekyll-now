---
layout: post
title: Configure A Static Single Page Application At Runtime
excerpt: |
  SPA are just made of purely static files. However, they often
  need at least the address of an API. This is typically a dynamic configuration
  as the API endpoint may not be the same for pre-production and production
  environments. This post exposes one solution to do overcome this problem.
img_url: /images/2019-08-07-control-panel.jpg
img_credits: Photo by <a href="https://unsplash.com/@dilucidus">Kai Dahms on Unsplash</a>
---

# What Problem Are We Trying To Solve?

I used to be a frontend developer in the past. However, life and job made me switch to the backend side and now to the joy of deploying those applications in the cloud.

Nowadays, all frontend applications subscribed to the single page app paradigm, using various frameworks like React, Vue, Angular or TheLastVeryPopularJsToy. They all have in common that they are web applications: all code is HTML, Javascript, CSS, and static assets. As a result, to host this application you just need to serve the static resources. Web servers like NGinx or Apache can do that very well, but in the Cloud you also have other alternatives like storing those static resources on object storages like S3 that allows to serve them.

The only problem that we are facing is that those single page applications often rely on a backend API. Depending on the environment that you are serving (dev, uat, pre-production), you probably do not want to serve the same endpoint. Unfortunately, static resources are static and do not allow configuring such endpoint dynamically. What we would like to do is to package our HTML application in a Docker container that conforms to the [12 factors app pattern](https://12factor.net/config) and takes environment variables to specify the endpoint URL.


# One Solution: A Different Build For Each Environment

A common solution to that problem is to build one image for each environment. By using tools like WebPack and a `dotenv` file, we can easily build a version of our web application with the encoded endpoint as part of the packaging.

The problem with this solution is that you need one separate build for each environment and if you want to qualify your application thru several review steps, this simply means that the image that your QA team reviews won't be the one that will run in production. Just from an audit standpoint, this may be a problem.

# Emulating The Dotenv File

In our application, we just need a variable or an object containing a dictionary of values that reflects the value of the environment variables. For instance, let's use a global variable (attached to the `window` object) that holds our values:

```javascript
window._env_ = {
  API_URL: "https://jsonplaceholder.typicode.com/users",
}
```

If we are able to generate an `env-config.js` file at startup that evaluates our environment variables, then we can include that file in our `index.html` file. Thanks to [this hack from Krunoslav Banovac](https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/) a simple shell script can do that for us.

I created a simple Docker image with an [entrypoint](https://github.com/dmetzler/html-docker-package/blob/7b6e3c2a36ad9fd3eb4f29be75aafe3257d922ea/entrypoint.sh) that embeds that mechanism. At the end the entrypoint take the resulting directory and moves it to a destination volume or synce it with a S3 bucket. A usable docker-compose file would then become:

```yaml
version: '3'
services:

  html:
    image: dmetzler/static-html
    command: vol /html_dir
    environment:
      API_URL: https://jsonplaceholder.typicode.com/users
    volumes:
    - html:/html_dir/
  nginx:
    image: nginx
    ports:
      - "8080:80"
    volumes:
    - html:/usr/share/nginx/html/:ro

volumes:
  html:
```

The entrypoint will move the static files (with our evaluated `env-config.js`) to a common volume between our image and the NGinx container.

What I like in this solution, is that the developer just takes care of the application and not how it isserved. The DevOps can then choose its preferred way to deploy the application: NGinx, Apache or S3. For instance, to deploy our application on an S3 bucket, we just need to run:


```console
docker run --rm \
     -e API_URL=https://jsonplaceholder.typicode.com/users \
     -e AWS_ACCESS_KEY_ID \
     -e AWS_SECRET_ACCESS_KEY \
     -e AWS_DEFAULT_REGION \
     -e AWS_SESSION_TOKEN \
     -it dmetzler/static-html s3 s3://mysamplestaticapp.com
```


The remaining drawback of this solution is that the Docker image is quite big because it holds a distribution to be able to run the shell and the `aws-cli` command.

# The Distroless Solution

However, it is a bit sad to embed a complete distribution to distribute our application. We need that distribution for two things:

 * a shell to be able to evaluate environment variables and copy files
 * the `aws-cli` to sync files to S3

Hopefully, it's quite easy to find in Golang a replacement for those two features. We can create a tool in Go that will embed this logic: it will be the only artifact that we will add to our application image.

I created a `go-deploy` tool ([Github](https://github.com/dmetzler/go-deploy)) that does exactly that. It is also available as a base Docker image on DockerHub so that it's super easy to package an application with a multi-step build:

```docker
FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

FROM dmetzler/go-deploy
ENV SRC_DIR=/src
COPY --from=builder /app/build $SRC_DIR
```

You can build then use this image using:

```console
# docker build -t dmetzler/static-html .
...

# docker run dmetzler/static-html help
Deploy a web application stores in $SRC_DIR in various places.

Usage:
  go-deploy [command]

Available Commands:
  help        Help about any command
  s3          Deploys to a S3 bucket
  serve       Serve the web app (for development use only)
  volume      Deploys the application in a directory, usually a Docker volume.

Flags:
  -h, --help   help for go-deploy

Use "go-deploy [command] --help" for more information about a command.
```

Thanks to some go features we are also able to locally serve the content of our package for development purpose.

```console
# docker run -e API_URL=https://myapi.com/ dmetzler/static-html serve
2019/07/25 20:31:42 [WARN] This is a development server, don't use for production
2019/07/25 20:31:42 [INFO] Listening for connection on port :8080
```

# Conlusion

In this post, I adapted a solution to package an application in a distroless Docker image that allows the configuration on environment variables at runtime.
I coded the Go-Deploy tool very (very) quickly in order to replace all the external tooling (shell and `aws-cli`), which allows the distroless image to be very small (21.4MB).
That tool is currently sufficient for my needs but it could definitely be improved, for instance by implementing other solutions like the one that modifies the `index.html` file instead of adding a JS file.
Feel free to [create Github issues](https://github.com/dmetzler/go-deploy/issues) or fork it and send some PR.



# References

 * [Go Deploy](https://github.com/dmetzler/go-deploy)
 * [A Sample app](https://github.com/dmetzler/html-docker-package)
 * The origin of this idea: [https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/](https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/)
 * An issue on Create React App that covers the problem and exposes some other solutions [https://github.com/facebook/create-react-app/issues/2353](https://github.com/facebook/create-react-app/issues/2353)

