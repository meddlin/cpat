# Data Mapping

The unique challenge for CPAT, with its current API design and tech stack, is the need to translate data models through this "channel" C# -> NPoco -> Npgsql -> Cockroach DB.

- C# -> logical, basic data models
- NPoco -> ORM
- Npgsql -> Database "driver"
- Cockroach DB -> data store

## Mapping Nested Structures to JSONB

### Data Model

```csharp
[TableName("target")]
[PrimaryKey("id")]
public class TargetDto
{
    [Column("id")] public Guid Id { get; set; }

    [Column("name")] public string Name { get; set; }
    
    /* other properties... */

    /// <summary>
    /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
    /// </summary>
    [Column("documentrelation")]
    [SerializedColumn] // translates to JSONB in database
    public IEnumerable<DocumentRelation> DocumentRelation { get; set; }
}
```

### Cockroach DB column data type

Make sure the column that needs JSONB support gets the proper data type.

Ref: [https://www.cockroachlabs.com/docs/stable/demo-json-support.html](https://www.cockroachlabs.com/docs/stable/demo-json-support.html)

### NPoco Attribute

All of this seems to work as long as we include the `[SerializedColumn]` attribute on any property of our data model that needs to be mapped to a JSONB data type in Cockroach DB.

Ref: [https://github.com/schotime/NPoco/wiki/Mapping](https://github.com/schotime/NPoco/wiki/Mapping)


### Further Reading

The notes from the _Npgsql documentation here: [https://www.npgsql.org/efcore/mapping/json.html?tabs=data-annotations%2Cpoco](https://www.npgsql.org/efcore/mapping/json.html?tabs=data-annotations%2Cpoco)_ appeared to denote that some level of mapping from a C# object to JSON was supported. They're setting this up via some property attributes, and serializing elsewhere.

However, we are using NPoco micro-ORM for CPAT. That led to finding the NPoco `[SerializedColumn]` attribute.

Ref: [https://github.com/schotime/NPoco/wiki/Mapping](https://github.com/schotime/NPoco/wiki/Mapping)