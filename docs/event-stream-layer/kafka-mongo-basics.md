# Kafka, Mongo Basics (Testing Only, Not Even Development)


_This is not for production purposes._

Ref: [https://medium.com/tech-that-works/cloud-kafka-connector-for-mongodb-source-8b525b779772](https://medium.com/tech-that-works/cloud-kafka-connector-for-mongodb-source-8b525b779772)

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

## Gotchas: MongoDB Connection (potential) Issues