# MongoDB, Docker Issues

Still unsure how it happened, but started getting connection errors when trying to connect Compass Mongo client and the C#/Mongo driver from code. 

The error mentioned setting "primary preferred", failing to find the `mongo1`, or somehow automatically connecting to a secondary node. What makes this strange is any attempt to connect to the replica set from the mongo cli, to check the replica info, everything looked like it was operating normally. It was also possible to see Mongo running from the host.

No amount of restarting via `docker-compose stop/start` or `docker-compose restart` was working, even though that had worked in the past.

## Fix

Run: `docker-compose down`

This took down the containers and removed the network.

Then: `docker-compose start`

Starts everything back up...but fresh--*er?*

Ref: [https://stackoverflow.com/questions/46428420/docker-compose-up-down-stop-start-difference](https://stackoverflow.com/questions/46428420/docker-compose-up-down-stop-start-difference)

Ref - `docker-compose down`: [https://docs.docker.com/compose/reference/down/](https://docs.docker.com/compose/reference/down/)

Ref - `docker-compose stop`: [https://docs.docker.com/compose/reference/stop/](https://docs.docker.com/compose/reference/stop/)

## Another Fix (Revisiting Issue)

Ref [https://stackoverflow.com/questions/56463705/mongodb-secondary-replica-does-not-show-databases-code-notmasternoslaveok?noredirect=1&lq=1](https://stackoverflow.com/questions/56463705/mongodb-secondary-replica-does-not-show-databases-code-notmasternoslaveok?noredirect=1&lq=1)

From within MongoDB CLI, run this

```bash
rs.slaveOk();
```