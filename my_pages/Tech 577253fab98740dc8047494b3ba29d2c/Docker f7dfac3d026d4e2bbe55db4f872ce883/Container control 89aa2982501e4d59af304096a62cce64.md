# Container control

## Container

Run image & Remove the container upon exit

```bash
docker run --rm image_name
```

Stop ALL container

```bash
docker stop $(docker ps -a -q)
```