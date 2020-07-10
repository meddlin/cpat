# ksqlDB Example: Streaming ETL Pipeline

Used this example as a starting point for standing up a "streaming ETL pipeline" for CPAT.

This example feeds data by:
- _extracting from_ Postgres, MongoDB
- _transforming via_ Kafka, ksql
- _loading into_ ElasticSearch

[https://docs.ksqldb.io/en/latest/tutorials/etl/](https://docs.ksqldb.io/en/latest/tutorials/etl/)

## Special Notes for CPAT Setup

See `./setup-notes.md` for adjustments to get this integrated with CPAT's API.