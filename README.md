# README

```shell
docker run -d --rm \
    --name cup-db \
    -e POSTGRES_PASSWORD=supersecret \
    -p 5432:5432 \
    postgres
```

results in

```dotenv
DATABASE_URL="postgresql://postgres:supersecret@localhost:5432/cup-db"
```
