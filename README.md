# nginx-javascript

### build and run

```
docker build . -t local/njs
docker run --rm --name njs -p 3000:80 -it local/njs
```

### daemon

```
docker run --rm --name njs -p 3000:80 -d local/njs
```

### curl

```
curl -i 127.0.0.1:3000/njs
```

### open

```
xdg-open http://127.0.0.1:3000/njs
```
