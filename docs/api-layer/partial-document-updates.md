# Partial Document Updates

Why: to reduce bandwidth when updating models with a large amount of attributes. _(We really don't want to be forced to throw around the potentially large `documentRelations` property because of API data mapping limitations.)_

Why's it difficult: RESTful APIs are traditionally centered around CRUD operations, not logical/business operations.

- PUT replaces the whole document
- POST is this weird tool for "use it when nothing else fits"
- PATCH doesn't have a clearly defined, prescribed implementation...and it's rarely discussed

## This is What Worked (for C#)

A pre-built, drop-in library for JSON Merge Patch. It's an implementation of JSON Patch, but less "noisy". You don't have to build out a weird operations document for each request, and it takes care of the loose typing inherent for this feature--_which is in direct opposition to C#'s strongly-typed nature_.

Ref: [https://dev.to/morcatko/json-merge-patch-in-aspnet-core-1e10](https://dev.to/morcatko/json-merge-patch-in-aspnet-core-1e10)

Ref: [https://github.com/Morcatko/Morcatko.AspNetCore.JsonMergePatch](https://github.com/Morcatko/Morcatko.AspNetCore.JsonMergePatch)

## Further Reading

These are the StackOverflow posts that let me know this was a deeper topic than just some copy/paste solution or learning a quick design pattern. 

[https://stackoverflow.com/questions/32184889/rest-api-design-different-granularity-for-receiving-and-updating-resources](https://stackoverflow.com/questions/32184889/rest-api-design-different-granularity-for-receiving-and-updating-resources)

[https://stackoverflow.com/questions/2443324/best-practice-for-partial-updates-in-a-restful-service](https://stackoverflow.com/questions/2443324/best-practice-for-partial-updates-in-a-restful-service)

Ref | Intro read: [https://apisyouwonthate.com/blog/put-vs-patch-vs-json-patch](https://apisyouwonthate.com/blog/put-vs-patch-vs-json-patch)

Ref | Intro 2: [https://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/](https://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/)

Ref | Quick list of implementations: [https://www.apuchkov.com/choosing-the-best-approach-for-partial-updates-in-rest-api/](https://www.apuchkov.com/choosing-the-best-approach-for-partial-updates-in-rest-api/)

Ref | RFC 7396: [https://tools.ietf.org/html/rfc7396](https://tools.ietf.org/html/rfc7396)