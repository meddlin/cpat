# Kafka Issues & Gotcha's

## Kafka, ksql: Delete topics is difficult?

Ref: [https://stackoverflow.com/questions/33537950/how-to-delete-a-topic-in-apache-kafka](https://stackoverflow.com/questions/33537950/how-to-delete-a-topic-in-apache-kafka)

## ksql: Data not moving through `ksql` streams, topics

Here's a summary of what happened. *This came down to a schema issue.*

- Pipeline was setup MongoDB -> ksql -> Elastic
- Test data was flowing through correctly
- Hooked up API, inserted data (different schema) from application, _*data quit flowing*_.

**Troubleshooting**

First, verified the data reached MongoDB. _It did._ And MongDB is running from the same `docker-compose` file the rest of the streaming pipeline is (_and we've already verified things are working--at least basically--with test data prior to this issue).

So, what happened? What changed?

Open `ksql-cli`, run:

```bash
show streams;
```

Produces...

```
 Stream Name         | Kafka Topic                        | Format 
-------------------------------------------------------------------
 CUSTOMERS           | customers.public.customers         | AVRO   
 ENRICHED_ORDERS     | ENRICHED_ORDERS                    | AVRO   
 KSQL_PROCESSING_LOG | default_ksql_processing_log        | JSON   
 ORDERS              | my-replica-set.logistics.orders    | AVRO   
 SHIPMENTS           | my-replica-set.logistics.shipments | AVRO   
 SHIPPED_ORDERS      | shipped_orders                     | AVRO   
 TARGETS             | my-replica-set.cpatdb.targets      | AVRO   
-------------------------------------------------------------------
```

Interested in `TARGETS` stream, so:

```bash
select * from targets emit changes;
```

Produces...

```
+------------------------------------+------------------------------------+------------------------------------+------------------------------------+------------------------------------+
|TARGETTYPE                          |REGION                              |NAME                                |TS                                  |ID                                  |
+------------------------------------+------------------------------------+------------------------------------+------------------------------------+------------------------------------+
```

Meaning this stream is expecting a schema different from the data inserted from the API/application.

Test data "schema" (From `ksql-cli`, run: `describe targets;`)

```
Name                 : TARGETS
 Field      | Type            
------------------------------
 TARGETTYPE | VARCHAR(STRING) 
 REGION     | VARCHAR(STRING) 
 NAME       | VARCHAR(STRING) 
 TS         | VARCHAR(STRING) 
 ID         | DOUBLE          
------------------------------
```

So, to fix this we have two main options:

- Delete the old connectors, streams, and topics (_directly deleting topics is not supported in `ksql`_).
- Rebuild `cpatdb.targets` pipelilne with the "correct" schema (using data from the API, stored in Mongo, automatically registers the data schema in Kafka, Avro, schema-registry)