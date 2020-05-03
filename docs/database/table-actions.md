# Table Actions

## Optimizing Paging Queries

To make this type of query performant, we want to use something called _"keyset pagination"_. Without this technique, just using `LIMIT` and `OFFSET` by themselves would require a full table scan--_really slow_.

Here's an example keyset pagination query. Notice using a `WHERE` with `LIMIT`, but there's no `OFFSET`. The `WHERE` clause is functioning as an "offset".

```sql
SELECT * FROM t
WHERE key > ${value}
ORDER BY key
LIMIT ${amount}
```

The full table scan comes into play if the query must scan all the way up to the `OFFSET` value.

Ref: [https://www.cockroachlabs.com/docs/stable/selection-queries.html#pagination-example](https://www.cockroachlabs.com/docs/stable/selection-queries.html#pagination-example)

### Schema Strategy: Monotonically increasing UUIDs

Check out this warning from the CRDB docs:

> Using a sequential (i.e., non-UUID) primary key creates hot spots in the database for write-heavy workloads, since concurrent INSERTs to the table will attempt to write to the same (or nearby) underlying ranges. This can be mitigated by designing your schema with multi-column primary keys which include a monotonically increasing column. 

So, we want a UUID-based primary key. This helps prevent the mentioned "hot spots" as CPAT is write heavy. **_But_** UUIDs are not _monotonically increasing_ by themselves. They're random, by definition.

#### Multi-column primary keys = UUID + Monotonically increasing column(s)

So, there are a few things we need to be aware of.

- Still base the primary key on a UUID
- Monotonically increasing field needs to be _after_ first column of primary key
- A `TIMESTAMPTZ` counts as monotonically increasing

Good! We actually already have all of this, we simply need to re-order our table to have a specially-created primary key constraint.

Ref: [https://www.cockroachlabs.com/docs/stable/performance-best-practices-overview.html#use-multi-column-primary-keys](https://www.cockroachlabs.com/docs/stable/performance-best-practices-overview.html#use-multi-column-primary-keys)

#### Schema Example

Current (w/o our special keyset-pagination-ready schema)

```sql
CREATE TABLE target(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation STRING,
    datecreated TIMESTAMPTZ,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID);
```

New (w/ special schema)

```sql
CREATE TABLE target(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation STRING,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID
    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
    );
```

So, we have to add a constraint, but we've already created the table and want to preserve our data. This is a problem because `ADD CONSTRAINT` can only be used upon creating a table.

Ref: [https://www.cockroachlabs.com/docs/stable/add-constraint.html](https://www.cockroachlabs.com/docs/stable/add-constraint.html)

So, we need to:

- create a temp table -> target_temp

```sql
CREATE TABLE target_temp(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation STRING,
    datecreated TIMESTAMPTZ,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID);
```

- copy the data over

```sql
INSERT INTO target_temp(id, name, region, collectiontype, selected, documentrelation, datecreated, updatedat, lastmodifiedbyuserid)
SELECT * FROM target;
```

- drop target

```sql
DROP TABLE target;
```

- recreate with proper schema (w/ constraint)

```sql
CREATE TABLE target(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation STRING,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,
    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```

- copy data back to target

```sql
INSERT INTO target(id, datecreated, name, region, collectiontype, selected, documentrelation, updatedat, lastmodifiedbyuserid)
SELECT 
    id,
    datecreated,
    name,
    region,
    collectiontype,
    selected,
    documentrelation,
    updatedat,
    lastmodifiedbyuserid
FROM target_temp;
```

- drop target_temp

```sql
DROP TABLE target_temp;
```