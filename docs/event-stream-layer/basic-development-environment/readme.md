# ksqlDB Example: Streaming ETL Pipeline

Used this example as a starting point for standing up a "streaming ETL pipeline" for CPAT.

Streaming ETL Tutorial: [https://docs.ksqldb.io/en/latest/tutorials/etl/](https://docs.ksqldb.io/en/latest/tutorials/etl/)

This example feeds data by:
- _extracting from_ Postgres, MongoDB
- _transforming via_ Kafka, ksql
- _loading into_ ElasticSearch

## Special Notes for CPAT Setup

See `./setup-notes.md` for adjustments to get this integrated with CPAT's API.

## Running the Environment

This `docker-compose` file currently only gives us the data/streaming back-end.

Navigate to the directory, and run `docker-compose up -d`

Produces

- Kafka
- Mongo
- Elastic
- Kibana