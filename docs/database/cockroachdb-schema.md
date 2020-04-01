# Table Schema

## Connecting

Ref: [https://www.cockroachlabs.com/docs/stable/start-a-local-cluster.html](https://www.cockroachlabs.com/docs/stable/start-a-local-cluster.html)

From a docker cli

```bash
docker exec -it roach1 ./cockroach sql --insecure
```

From within the Cockroach DB node [`roach1`]

```bash
cockroach sql --insecure --host=localhost:26257
```

## Creating a Basic Preview

```sql
CREATE TABLE target(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation STRING,
    datecreated TIMESTAMPTZ,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID);
```