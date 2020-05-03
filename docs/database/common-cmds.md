# Common Commands

These commands are to be entered from the SQL prompt within a Cockroach DB node unless otherwise noted.

## Start a simple instance (Development)

This is only for starting an insecure, single-node instance for local development purposes. It doesn't follow any Cockroach DB articles, because CRDB should be run from containers. _This process should only be used for local application development._

### Start the cluster

Open a terminal (on Windows, PowerShell 7+)

```bash
cd [binary location]
.\cockroach.exe start --insecure
```

### Start SQL CLI instance

Open another terminal window

```bash
cd [binary location]
.\cockroach.exe sql --insecure --host=localhost:26257
```

## Show (List) Databases

```sql
show databases;
```

Ref: [https://www.cockroachlabs.com/docs/stable/show-databases.html#example](https://www.cockroachlabs.com/docs/stable/show-databases.html#example)

## Show Tables

```sql
show tables;
```

Ref: [https://www.cockroachlabs.com/docs/stable/show-tables.html](https://www.cockroachlabs.com/docs/stable/show-tables.html)

## Set (current) Database

```sql
set database = [DatabaseName]
```

Ref: Run `\h set session` to see the help text for this command.