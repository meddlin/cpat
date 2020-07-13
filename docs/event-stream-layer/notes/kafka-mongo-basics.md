# Kafka, Mongo Basics (Testing Only, Not Even Development)

This article was used to experiment with Kafka & MongoDB to see the individual pieces connecting the two systems. Production and efficient development workflows would use a "Docker-ized" solution, so this is meant only for 

_This is not for production purposes._

Ref: [https://medium.com/tech-that-works/cloud-kafka-connector-for-mongodb-source-8b525b779772](https://medium.com/tech-that-works/cloud-kafka-connector-for-mongodb-source-8b525b779772)

<hr />

## Setup MongoDB: Replica Set

We will be setting up a replica set, and our nodes will be at:

- localhost:27017
- localhost:27018
- localhost:27019

Download the `.tar.gz` version from here.

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Created a new directory for MongoDB configs.

```bash
mkdir pipeline-software
```

Create three new files to hold the configuration for the replica set.

`/pipeline-software/mongod_1.conf`
```bash
systemLog:
    destination: file
    path: /home/meddlin/pipeline-software/mongodb-4.2.8/s1/mongo.log
    logAppend: true
storage:
    dbPath: /home/meddlin/data/s1/db
net:
    bindIp: 127.0.0.1
    port: 27017
replication:
    replSetName: devrs
```

`/pipeline-software/mongod_2.conf`
```bash
systemLog:
    destination: file
    path: /home/meddlin/pipeline-software/mongodb-4.2.8/s2/mongo.log
    logAppend: true
storage:
    dbPath: /home/meddlin/data/s2/db
net:
    bindIp: 127.0.0.1
    port: 27018
replication:
    replSetName: devrs
```

`/pipeline-software/mongod_3.conf`
```bash
systemLog:
    destination: file
    path: /home/meddlin/pipeline-software/mongodb-4.2.8/s3/mongo.log
    logAppend: true
storage:
    dbPath: /home/meddlin/data/s3/db
net:
    bindIp: 127.0.0.1
    port: 27019
replication:
    replSetName: devrs
```

### Setup `path` directories

These directories hold the `mongo.log`--which is the log for MongoDB. The `mongo.log` file will be automatically created.

> Check here for error logs when problems with MongoDB come up.

```bash
cd /home/meddlin/pipeline-software/mongodb-4.2.8/s1
cd /home/meddlin/pipeline-software/mongodb-4.2.8/s2
cd /home/meddlin/pipeline-software/mongodb-4.2.8/s3
```

### Setup `dbPath` directories

Here, we're keeping these outside of the `pipeline-software` directory structure, but they really can be anywhere you like, as long as they're referenced correctly.

```bash
cd /home/meddlin/data/s1/db
cd /home/meddlin/data/s2/db
cd /home/meddlin/data/s3/db
```

### Start MongoDB Replica Set

Finally, returning to `/pipeline-software`, run this to start Mongo.

```bash
./bin/mongod --config mongod_1.conf &./bin/mongod --config mongod_2.conf &./bin/mongod --config mongod_3.conf &
```

Run this command to make sure all three instances of `mongod` are running. _Run this a couple times to make sure a node isn't prematurely crashing out._

```bash
ps aux | grep mongod
```

### Initialize the Replica Set

In another terminal, still from the `pipeline-software/` directory, open a CLI to Mongo

```bash
./bin/mongo --port 27017
```

Run each of these commands separately to initiate the replica set, and then add the other two nodes for replication, and finally we check the status of the replica set.

```bash
> rs.initiate()
> rs.add(“127.0.0.1:27018”)
> rs.add(“127.0.0.1:27019”)
> rs.status()
```

<hr />

## Gotchas: MongoDB Connection (potential) Issues

### Binding IPs in `mongod_x.conf`

Note the `net:` section of the Mongo configuration file. (ex: `mongod_1.conf`). 

Ref: [https://stackoverflow.com/questions/9154030/unable-to-connect-to-mongodb](https://stackoverflow.com/questions/9154030/unable-to-connect-to-mongodb)

```bash
net:
    bindIp: 127.0.0.1
    port: 27017
```

- Keeping `bindIp: 127.0.0.1`, as above, only binds to localhost--_yes, even with this being a "specified" `bind_ip`.
    - Even opening port(s) via `iptables` doesn't make anything available.
- Removing the `bind_ip` to automatically, only make accessible to localhost.
- Specify an IP, `bind_ip: 192.168.1.xxx`, to bind to the specified IP and _*NOT*_ be accessible from localhost.
    - Doing this, _you must_ open port(s) via `iptables`

> See this for help setting up an `iptables` configuration for MongoDB
> Ref: [https://medium.com/founding-ithaka/setting-up-and-connecting-to-a-remote-mongodb-database-5df754a4da89](https://medium.com/founding-ithaka/setting-up-and-connecting-to-a-remote-mongodb-database-5df754a4da89)

Keep in mind, if specifying `bind_ip` with a legitimate IP, the replica set is no longer accessible from `localhost`.

<hr />

## Use a MongoDB GUI client to insert data to MongoDB

Choose a GUI client

- Compass: [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Robo 3T: [https://robomongo.org/](https://robomongo.org/)

Remember the "gotcha" about binding to IPs and accessibility from localhost? Make sure the chosen client can run on the same host as the MongoDB replica set.

## Prepare for Confluent

Download connectors from Confluent Hub.

Ref: [https://www.confluent.io/hub/](https://www.confluent.io/hub/)

- Debezium MongoDB CDC connector: [https://www.confluent.io/hub/debezium/debezium-connector-mongodb](https://www.confluent.io/hub/debezium/debezium-connector-mongodb)