# MongoDB Replica Cluster (in Docker)

This document covers how to stand up a basic 3-node MongoDB replica cluster for testing purposes.

**NOTE**: MongoDB _must_ be operating as a replica set in order for change streams to be enabled. So, we cover how to accomplish this with Docker, and some other points here.

Ref: [https://blog.skbali.com/2019/05/mongodb-replica-set-using-docker-compose/](https://blog.skbali.com/2019/05/mongodb-replica-set-using-docker-compose/)

### Prerequisites

- Docker
- Docker-compose
- mongo client

### Side Notes

The article references the image `mongo:4.0.4`, but it's been changed here to the latest MongoDB release. This is important because there was a change in "read concern" between MongoDB 4.2 and 4.0.

> Starting in MongoDB 4.2, change streams are available regardless of the "majority" read concern support; that is, read concern majority support can be either enabled (default) or disabled to use change streams.
>
> In MongoDB 4.0 and earlier, change streams are available only if "majority" read concern support is enabled (default).

[https://docs.mongodb.com/manual/changeStreams/](https://docs.mongodb.com/manual/changeStreams/)

## Instructions

Create the following file, and run `docker-compose up -d`. 

`docker-compose.yml`

```bash
version: "3"
services:
  mongo1:
    hostname: mongo1
    container_name: mongo1
    image: mongo:latest
    volumes:
      - ./data1/db:/data/db
      - ./data1/configdb:/data/configdb
    networks:
      - mongo-dev-net
    expose:
      - 27017
    ports:
      - 30001:27017
    restart: always
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "devrs" ]
  mongo2:
    hostname: mongo2
    container_name: mongo2
    image: mongo:latest
    volumes:
      - ./data2/db:/data/db
      - ./data2/configdb:/data/configdb
    networks:
      - mongo-dev-net
    expose:
      - 27017
    ports:
      - 30002:27017
    restart: always
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "devrs" ]
  mongo3:
    hostname: mongo3
    container_name: mongo3
    image: mongo:latest
    volumes:
      - ./data3/db:/data/db
      - ./data3/configdb:/data/configdb
    networks:
      - mongo-dev-net
    expose:
      - 27017
    ports:
      - 30003:27017
    restart: always
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "devrs" ]

networks:
  mongo-dev-net:
```