## Research

I don't yet have a good place to keep files, notes, links related to the larger idea(s) behind the CPAT project. The 80,000 ft view is this:

- An automated script engine for data reconnaissance (targeted at network security)
- Near-realtime communication (connected nodes/users know of data "as it happens")
- Distributed data provides failover protection (application is resilient to failed node(s))
- Mesh-networking topology provides self-contained network connection
- N-point outer-network access (each node can handle its own "WAN access")
- * Possibility for machine learning uses from service node analyzing real-time data

Possible deployments and use-cases

- Multi-drone aerial reconnaissance
	- High-rise building, or immediate urban area, attack vectors and rooftop stakeouts
- On-foot, backpack mobile telemetry and reconnaissance
	- More flexibility in compute power and battery size; wear computers in backpacks.
	- Semi-concealed reconnaissance while navigating city streets
	- Telemetry while tactical performs various tasks
- Telemetry tracking on vehicle systems
- Telemetry monitoring and support for vehicle fleet in-motion


### MongoDB -- Concerns/Topics on Distributed Data

Embedding, Two-phase commit, and linking
- mentions of "distributed locking"

[https://stackoverflow.com/questions/21468975/application-level-distributed-read-write-lock-for-mongodb](https://stackoverflow.com/questions/21468975/application-level-distributed-read-write-lock-for-mongodb)