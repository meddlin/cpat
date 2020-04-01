# Common Commands

These commands are to be entered from the SQL prompt within a Cockroach DB node unless otherwise noted.

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
set database = [TableName]
```

Ref: Run `\h set session` to see the help text for this command.