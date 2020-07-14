# (Working) Development Environment

Working System

- Containerization environment
    - Ubuntu 20.04
    - Docker 19.03+
    - docker-compose 1.25+

- Hardware
    - Ryzen 5 2600X
    - 32GB DDR4 RAM (running environment uses ~11GB)
    - SSD storage

## Introduction

This working version of a containerized environment was created from the "MongoDB & Kafka Docker end to end example"

[https://github.com/mongodb/mongo-kafka/tree/master/docker](https://github.com/mongodb/mongo-kafka/tree/master/docker)

The modified `docker-compose.yml` includes Docker specifications for the following

- Kafka (stack)
- MongoDB
- Elasticsearch

The modified `Dockerfile` includes connectors for

- *kafka-connect-datagen
- kafka-connect-elasticsearch:latest

Ref: Elastic connector

[https://www.confluent.io/hub/confluentinc/kafka-connect-elasticsearch](https://www.confluent.io/hub/confluentinc/kafka-connect-elasticsearch)

### Running the Example

- Clone the repo.
- Run `./run.sh`

## Other Tools

These tools were helpful in troubleshooting and validating various steps of the process. It's a growing "toolbox" of sorts for working with such a data back-end.

- Kaizen: [https://www.elastic-kaizen.com/](https://www.elastic-kaizen.com/)
    - GUI for viewing Elastic data

- kafkacat: [https://github.com/edenhill/kafkacat](https://github.com/edenhill/kafkacat)
    - [https://docs.confluent.io/current/app-development/kafkacat-usage.html](https://docs.confluent.io/current/app-development/kafkacat-usage.html)
    - `apt-get install kafkacat`

- curl
    - You can `curl` connector(s) status. _Vitally important for grabbing info on frustratingly subtle "degraded" connectors.
    - Ex: `curl http://localhost:8083/connectors/elasticsearch-sink/status | jq`
    - Ref: [https://docs.confluent.io/current/connect/managing/monitoring.html](https://docs.confluent.io/current/connect/managing/monitoring.html)


## Elasticsearch

The original `docker-compose` config was taken from here, Elastic's basic 3-node cluster config. We are able to copy/paste this config, and then make some alterations to make it work with our other containers.

[https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

- Container names, tags where changed from `es0x` to `elasic0x`
- The `networks` config was "merged" what already existed in the larger working example.
    - `networks: elastic: driver: bridge` was changed to `networks: localnet: attachable: true, driver: bridge`

### Elasticsearch Sink: The Key Missing Piece

_It was the `key.converter` and `value.converter` fields of the config fed to the ElasticsearchSinkConnector._ Let's take a look at that config.

```json
{"name": "elasticsearch-sink",
   "config": {
     "connector.class":"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
     "connection.url":"http://elastic01:9200",
     "tasks.max": "1",
     "type.name": "_doc",
     "topics":"pageviews",
     "value.converter.schema.registry.url": "http://schema-registry:8081",
     "key.converter": "org.apache.kafka.connect.storage.StringConverter",
     "value.converter": "org.apache.kafka.connect.json.JsonConverter",
     "value.converter.schemas.enable": "false",
     "schema.ignore": "true",
     "key.ignore": "true"
    }
}
```

And the full Elasticsearch Sink `POST` configuration added to the `./run.sh` bash script after the Mongo/Kafka sink/source configs.

_Notice how we're using the container names (`elastic01`) in the URLs of the config--**not `localhost`**. This is because the containers are accessible from the Ubuntu host via `localhost`, but in the Docker network (and Docker-DNS at play) they are accessible via their container names._

```bash
sleep 2
echo -e "\nAdding Elasticsearch Kafka Sink Connector for the 'pageviews' collection:"
curl -X POST -H "Content-Type: application/json" --data '
  {"name": "elasticsearch-sink",
   "config": {
     "connector.class":"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
     "connection.url":"http://elastic01:9200",
     "tasks.max": "1",
     "type.name": "_doc",
     "topics":"pageviews",
     "value.converter.schema.registry.url": "http://schema-registry:8081",
     "key.converter": "org.apache.kafka.connect.storage.StringConverter",
     "value.converter": "org.apache.kafka.connect.json.JsonConverter",
     "value.converter.schemas.enable": "false",
     "schema.ignore": "true",
     "key.ignore": "true"
}}' http://localhost:8083/connectors -w "\n"
```

### Kafka, Connectors, Serialization, and the "Unknown magic  byte"!

NOTE: _The issue in properly configuring the converters for the Elastic sink connector was fixed by **thinking about which data needed to be sent to Elastic**._ 

_**I noticed the data I wanted to be sent to Elastic--was already being sent back to Mongo--in the Mongo-Kafka sink connector configuration. If JSON-like data was being sent to Mongo via this sink connector--and happy with this Kafka connector config--then it was likely the same converter configs for this connector would work for Elastic's sink connector converter(s).**_

> Side note: The "unknown magic byte" is referenced in typical Avro conversion errors. Poke around in Google with "Kafka avro unknown magic byte", and you'll see numerous results decoding that error message.

A useful article, from Robin Moffatt, on explaining Kafka Connect Converters and Serialization. _It was referenced by multiple links encountered in this research._

[https://www.confluent.io/blog/kafka-connect-deep-dive-converters-serialization-explained/](https://www.confluent.io/blog/kafka-connect-deep-dive-converters-serialization-explained/)

The larger, Elasticsearch/Kafka example I was following originally. This config was not enough to get things going, _but was enough to get in the ballpark_. This was a starting point for getting the sink connector started.

[https://www.confluent.io/blog/kafka-elasticsearch-connector-tutorial/](https://www.confluent.io/blog/kafka-elasticsearch-connector-tutorial/)

Stackoverflow link letting me know I could narrow in on a serialize/deserialize config issue.

[https://stackoverflow.com/questions/52399417/unknown-magic-byte-with-kafka-avro-console-consumer](https://stackoverflow.com/questions/52399417/unknown-magic-byte-with-kafka-avro-console-consumer)

Github issue. Helpful for explaining a little context about when/why the AvroConverter in context of an Elasticsearch sink connector.

[https://github.com/confluentinc/kafka-connect-elasticsearch/issues/149](https://github.com/confluentinc/kafka-connect-elasticsearch/issues/149)

This is another article, with lots of info surrounding Kafka, Elastic, and the connectors. Not too useful for this issue, but seemed to have some good stuff in it.

[https://rmoff.net/2019/10/07/kafka-connect-and-elasticsearch/](https://rmoff.net/2019/10/07/kafka-connect-and-elasticsearch/)

## Kibana

NOTE: _**Still working on getting this operational.**_

Kibana: [https://www.elastic.co/guide/en/kibana/current/docker.html](https://www.elastic.co/guide/en/kibana/current/docker.html)

Example `kibana.yml`: [https://github.com/elastic/kibana/blob/master/config/kibana.yml](https://github.com/elastic/kibana/blob/master/config/kibana.yml)



## Further Reading, Links

- MongoDB/Kafka Dockerized Example
    - [https://github.com/mongodb/mongo-kafka/tree/master/docker](https://github.com/mongodb/mongo-kafka/tree/master/docker)

- Monitoring, troubleshooting Kafka connectors with `curl`
    - [https://docs.confluent.io/current/connect/managing/monitoring.html](https://docs.confluent.io/current/connect/managing/monitoring.html)