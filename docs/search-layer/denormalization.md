# Data Denormalization

Denormalization is a common need when looking into NoSQL databases, but especially so when considering Elastic is a document-based NoSQL search engine. So, this means CPAT's data modeling needs an adjustment.

We have our basic types like so:

- Target
- Person
- Company
- Device
- Location

It would seem that if we want to pull related documents (ex: all "persons" related to a "target") that we would need a `JOIN`. This is exactly the type of operation to look towards in a `SQL` environment...but we don't have that. Performing any kind of JOIN-like operation in Elastic is prohibitively expensive, so it's best to simply design around it.

## What to do?

### Strategy: Data Duplication

When data is ingested into Elastic we need to send data to its correct index according to data type. _Then create a secondary, "global" index which includes a copy of everything._

So, indexes are...

- `cpat_global`: includes a copy of every document in every other index
- `targets`: Target documents from API -> Mongo -> Elastic
- `people`: Person documents from API -> Mongo -> Elastic
- `companies`: Company documents from API -> Mongo -> Elastic
- `devices`: Device documents from API -> Mongo -> Elastic
- `locations`: Location documents from API -> Mongo -> Elastic

### Strategy: Denormalization-_to create `cpat_global`_

The data is treated as if it follows this type of structure when in use in the app. This is what we'll call the "natural data structure".

#### Natural data structure

- Target
    - Person
    - Location
        - Target
            - Person
            - Device
    - Company
        - Person
        - Person
- Target
- _[...repeated structure]_

However, in order to avoid horrendously complicated queries when trying to pull back portions of this nested structure, we've designed things to be pulled apart. _This also plays a little nicer with SQL-oriented database systems._ This is at the expense of possibly needed repeated queries to the database--_maybe some future design choices can mitigate that issue._

So, the data follows this "semi-normalized structure".

#### Semi-normalized structure

So, we still create each document, but each document holds a relation to some other document its related to elsewhere in the database.

`Targets` collection

- Target {001-GUID}
    - [...fields]
    - `documentRelations`: [{docType, docId}, {docType, docId}, {docType, docId}, ...]

`Person` collection

- Person {002-GUID}
    - [...fields]
    - `documentRelations`: [{Target, 001-GUID}, {docType, docId}, {docType, docId}, ...]

In other MongoDB collections...

- _[...and the rest follow]

## Further Reading

_StackOverflow issue explaining the need to denormalize data instead of joining relations_

[https://stackoverflow.com/questions/49550556/elasticsearch-querying-across-multiple-indices-with-relations](https://stackoverflow.com/questions/49550556/elasticsearch-querying-across-multiple-indices-with-relations)



_An example pseudo code example of collapsing a binary tree_

[https://stackoverflow.com/questions/3411793/convert-a-binary-tree-to-linked-list-breadth-first-constant-storage-destructiv](https://stackoverflow.com/questions/3411793/convert-a-binary-tree-to-linked-list-breadth-first-constant-storage-destructiv)