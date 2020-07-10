# ksqlDB Notes

ksqlDB Reference: [https://docs.ksqldb.io/en/latest/developer-guide/syntax-reference/](https://docs.ksqldb.io/en/latest/developer-guide/syntax-reference/)

## Commands

Create a stream

```bash
CREATE STREAM TEST01 (COL1 INT, COL2 VARCHAR)
  WITH (KAFKA_TOPIC='test01', PARTITIONS=1, VALUE_FORMAT='AVRO');
```

Drop a stream

```bash
DROP STREAM TEST01;
```

## Running ksqlDB w/ Docker

"Exec" into ksqlDB via Docker

> NOTE: This assumes your container is named `ksqldb`.

```bash
docker exec -it ksqldb ksql http://ksqldb:8088
```

