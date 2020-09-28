### Docker common commands

> docker pull ubuntu  
> docker run -i -t ubuntu:latest /bin/bash

##### saving changes to docker 
> docker commit 9aefd4092ca5 ubuntu-react:v10

##### running docker on a port with a volume mount 
> docker run -i -t -p 3001:3000 -v /Users/kumarman/git-projects/reactdocker/my-app:/my-app ubuntu-react:v10 /bin/bash -c "cd my-app/ && npm start"
path is absolute here

> use cp command to copy whole directory as well 
sdfsdfdsfsd
sdfsdfdsfsd
