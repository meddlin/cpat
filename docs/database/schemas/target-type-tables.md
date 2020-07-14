# Schemas: Target Types

These schemas were created for Cockroach DB.

## Company

```sql
CREATE TABLE company(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,

    documentrelation JSONB,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,

    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```


## Device

```sql
CREATE TABLE device(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,
    organizations JSONB,

    documentrelation JSONB,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,

    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```


## Location

```sql
CREATE TABLE location(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,
    latitude STRING,
    longitude STRING,

    documentrelation JSONB,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,

    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```


## Person

```sql
CREATE TABLE person(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    firstname STRING,
    middlename STRING,
    lastname STRING,
    nickNames JSONB,
    phoneNumbers JSONB,
    emailAddresses JSONB,
    organizations JSONB,
    employers JSONB,
    socialLinks JSONB,

    documentrelation JSONB,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,

    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```


## Target

```sql
CREATE TABLE target(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    datecreated TIMESTAMPTZ,

    name STRING,
    region STRING,
    collectiontype STRING,
    selected BOOL,
    documentrelation JSONB,
    updatedat TIMESTAMPTZ,
    lastmodifiedbyuserid UUID,
    CONSTRAINT target_pk PRIMARY KEY(id, datecreated)
);
```