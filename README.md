# nginx-javascript

### build and run

```
docker build . -t local/njs
docker run --rm --name njs -p 8000:80 -it local/njs bash
```

### curl

```
curl -i 127.0.0.1/njs
```
