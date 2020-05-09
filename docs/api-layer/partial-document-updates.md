# Partial Document Updates

Why: to reduce bandwidth when updating models with a large amount of attributes. _(We really don't want to be forced to throw around the potentially large `documentRelations` property because of API data mapping limitations.)_

Why's it difficult: RESTful APIs are traditionally centered around CRUD operations, not logical/business operations.

- PUT replaces the whole document
- POST is this weird tool for "use it when nothing else fits"
- PATCH doesn't have a clearly defined, prescribed implementation...and it's rarely discussed

## Solution (for C#)

A pre-built, drop-in library for JSON Merge Patch. It's an implementation of JSON Patch, but less "noisy". You don't have to build out a weird operations document for each request, and it takes care of the loose typing inherent for this feature--_which is in direct opposition to C#'s strongly-typed nature_.

Ref: [https://dev.to/morcatko/json-merge-patch-in-aspnet-core-1e10](https://dev.to/morcatko/json-merge-patch-in-aspnet-core-1e10)

Ref: [https://github.com/Morcatko/Morcatko.AspNetCore.JsonMergePatch](https://github.com/Morcatko/Morcatko.AspNetCore.JsonMergePatch)

## Warning: Possible Serialization/Deserialization Issue

Sending partial document updates, containing changes to the "document relations" array, cause data validation errors because of the way this particular array is serialized.

**Good news though.** This seems to mostly affect the partial updpate controller methods using JSON Merge Patch, and _switching from `System.Text` serialization to the `Newtonsoft` serialization fixes the issue.

**How?** Use the `Morcatko.AspNetCore.JsonMergePatch.NewtonsoftJson` package, instead of the System.Text version of the package: `Morcatko.AspNetCore.JsonMergePatch.SystemText`.

### The Specific Error

When this happened, an obscure data validation error popped up client-side.

`Unsupported ValueKind - Array`

It was detected by ripping out the response text from the error response returned to the browser.

```js
function handleHttpResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 400) {
                if (data && data.errors) {
                    console.error('HTTP 400 Response: Validation error');
                    // iterate over data validation error(s) found in 'data'
                    Object.keys(data.errors).forEach(k => {
                        console.error(data.errors[k])
                    });
                }
            }
            // other possible responses follow...
        }
    })
}

```

Searching for the obscure validation error gave me results like this .NET Core [GitHub Issue](https://github.com/dotnet/runtime/issues/30524) where people were discussing limitations of the new JSON serialization library in .NET Core 3.

They mentioned limitations specifically around converting to `Dictionary<TKey, TValue>`-like data types. _Oddly similar to the model data structures I'm using._ Further, suggested solutions surrounded providing custom serialization implementation(s).

That led to trying the alternative, `Morcatko.AspNetCore.JsonMergePatch.NewtonsoftJson`.

Ref: [https://github.com/dotnet/runtime/issues/30524](https://github.com/dotnet/runtime/issues/30524)

### Why: The serialization complexity

The partial update controller methods have an extra layer of complication for serialization/deserialization needs. Here's the method below. Notice the model being deserialized from the HTTP request body: `JsonMergePatchDocument<Target>`.

```csharp
[HttpPatch]
[Consumes(JsonMergePatchDocument.ContentType)]
public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Target> patch)
{
    Guid docId = new Guid(id);

    var ops = new List<string>();
    patch.Operations.ForEach(op =>
    {
        ops.Add(op.path.TrimStart('/'));
    });

    var data = new Target();
    patch.ApplyTo(data);

    var query = new TargetQuery();
    return query.PartialUpdate(docId, data, ops);
}
```

This `JsonMergePatchDocument<Target>` model has a couple of complex layers.

We have the `JsonMergePatchDocument` model, which contains several generic structures already. 

Then `Target` which contains a structure like this:

```csharp
public class Target : AbstractTarget
{
    public string Name { get; set; }
    public string Region { get; set; }
    /* other properties... */
    public List<DocumentRelation> Relations { get; set; }
    /* other properties... */
}
```

...and `DocumentRelation`

```csharp
public class DocumentRelation
{
    public string CollectionName { get; set; }
    public string DocumentId { get; set; }
}
```

So, deserialization isn't as complex as type-switching at runtime, but there's still something in this "nested list of dictionary(string, string)"-type that `System.Text` didn't like.

## Further Reading

These are the StackOverflow posts that let me know this was a deeper topic than just some copy/paste solution or learning a quick design pattern. 

[https://stackoverflow.com/questions/32184889/rest-api-design-different-granularity-for-receiving-and-updating-resources](https://stackoverflow.com/questions/32184889/rest-api-design-different-granularity-for-receiving-and-updating-resources)

[https://stackoverflow.com/questions/2443324/best-practice-for-partial-updates-in-a-restful-service](https://stackoverflow.com/questions/2443324/best-practice-for-partial-updates-in-a-restful-service)

Ref | Intro read: [https://apisyouwonthate.com/blog/put-vs-patch-vs-json-patch](https://apisyouwonthate.com/blog/put-vs-patch-vs-json-patch)

Ref | Intro 2: [https://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/](https://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/)

Ref | Quick list of implementations: [https://www.apuchkov.com/choosing-the-best-approach-for-partial-updates-in-rest-api/](https://www.apuchkov.com/choosing-the-best-approach-for-partial-updates-in-rest-api/)

Ref | RFC 7396: [https://tools.ietf.org/html/rfc7396](https://tools.ietf.org/html/rfc7396)