# Basic Development Environment: Setup Notes


/**
* Notice in MongoDB
* -- DB: logistics
* -- coll(s): orders, shipments
*/

## MongoDB Test Data

_Be careful. This test data DOESN'T share the same schema as the Target data type coming from the API. This test data 
is only good for demonstrating how data moves through the Kafka pipeline._

```js
db.targets.insert({"_id": 1, "targetType": "Target", "region": "US", "name": "Test01", "ts": "2020-04-03T11:20:00"})
db.targets.insert({"_id": 2, "targetType": "Target", "region": "US", "name": "Test02", "ts": "2020-04-03T11:20:00"})
db.targets.insert({"_id": 3, "targetType": "Target", "region": "US", "name": "Test03", "ts": "2020-04-03T11:20:00"})
```

## Creating a User 

Added an entry to include `readWrite` role on `cpatdb` for the Debezium user. A change would be required here for each new 
Mongo database the Kafka pipeline will utilize.

Also, check out `db.grantRolesToUser()` to add roles after the user has been created.

- Ref: `db.grantRolesToUser()` - [https://docs.mongodb.com/manual/reference/method/db.grantRolesToUser/#db.grantRolesToUser](https://docs.mongodb.com/manual/reference/method/db.grantRolesToUser/#db.grantRolesToUser)
- Ref: `db.updateUser()` - [https://docs.mongodb.com/manual/reference/method/db.updateUser/](https://docs.mongodb.com/manual/reference/method/db.updateUser/)

```js
db.createUser({
  "user" : "dbz-user",
  "pwd": "dbz-pw",
  "roles" : [
    {
      "role" : "root",
      "db" : "admin"
    },
    {
      "role" : "readWrite",
      "db" : "logistics"
    },
    {
      "role" : "readWrite",
      "db" : "cpatdb"	
    },
    {
      "role" : "dbz-role",
      "db" : "config"
    }
  ]
})
```

## Create the MongoDB Connector

This pulls data _from_ MongoDB into Kafka.

Make note of `'collection.whitelist' = 'cpatdb.*'`. It may seem a little weird to use a field for _collections_ to just pull all collections
from a whole database. However, watch how the streams are used to break things out by the individual collections.

_NOTE: This also leaves connectors being concerned with data sources, instead of being concerned with data pipelines **within** those sources._

```bash
CREATE SOURCE CONNECTOR cpatdb_reader WITH (
    'connector.class' = 'io.debezium.connector.mongodb.MongoDbConnector',
    'mongodb.hosts' = 'mongo:27017',
    'mongodb.name' = 'my-replica-set',
    'mongodb.authsource' = 'admin',
    'mongodb.user' = 'dbz-user',
    'mongodb.password' = 'dbz-pw',
    'collection.whitelist' = 'cpatdb.*',
    'transforms' = 'unwrap',
    'transforms.unwrap.type' = 'io.debezium.connector.mongodb.transforms.ExtractNewDocumentState',
    'transforms.unwrap.drop.tombstones' = 'false',
    'transforms.unwrap.delete.handling.mode' = 'drop',
    'transforms.unwrap.operation.header' = 'true'
);
```

## Create a `ksql` stream for the Target data

Create a stream for the "Targets" data coming from the `cpatdb.targets` collection in MongoDB. 

_NOTE: Before you create the stream...data must be present in the collection for Kafka to pick it up and automatically create the topic. Without the topic, we can't create the stream._


_Notice the difference in the timestamp fields. Also...'timestamp_format' is only used when the specified timestamp field (i.e. 'ts') is a STRING type._

```bash
CREATE STREAM targets WITH (
    kafka_topic = 'my-replica-set.cpatdb.targets',
    value_format = 'avro',
    timestamp = 'dateCreated'
);
```

```bash
/* 
* THIS IS THE CREATE STREAM COMMAND FOR THE DUMMY/TEST DATA. THE TIMESTAMP WILL PREVENT THIS FROM WORKING FOR REAL CPAT DATA. 
* IT IS ONLY HERE FOR DEMONSTRATION PURPOSES
*/

CREATE STREAM targets WITH (
    kafka_topic = 'my-replica-set.cpatdb.targets',
    value_format = 'avro',
    timestamp = 'ts',
    timestamp_format = 'yyyy-MM-dd''T''HH:mm:ss'
);
```


## Send things to ElasticSearch

Finally, create a connector for ElasticSearch. Notice, this one uses the topic automatically created by the original MongoDB connector ingesting data.

```bash
CREATE SINK CONNECTOR targets_writer WITH (
    'connector.class' = 'io.confluent.connect.elasticsearch.ElasticsearchSinkConnector',
    'connection.url' = 'http://elastic:9200',
    'type.name' = 'kafka-connect',
    'topics' = 'my-replica-set.cpatdb.targets'
);
```