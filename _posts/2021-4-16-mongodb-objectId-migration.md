---
layout: post
title: fun with mongodb
---

Recently I had a problem with mongoDB and Spring data mongoDb, which was mostly my own fault. That is what happens when you go into a project without a real clue about the technology.
In Mongodb there are basically 2 ways to reference other documents, or to roughly translate it for people, who like myself, have a much bigger background in SQL: a Foreign key relationship.
1. Manual referencing
2. DBRef

After some consideration and reading [the docs](https://docs.mongodb.com/manual/reference/database-references/) and some stack overflow posts, I decided to go with the manual referencing.

## Problem

Instead of storing the references as an ObjectId, for some reason, I was storing them as plain String. At first, this did not cause any problem, which was kind of surprising in hindsight. I was able to implement endpoints to query by id, do projections, filter by certain fields and so on.

Then I tried to add an endpoint, which fetches those nested documents and outputs the parent object and the child object in one JSON. This requires an aggregation pipeline with a lookup operation for each nested document (in SQL lingo: we want to join tables). 

```
db.test_data.aggregate([
    { $match: {_id: ObjectId("607439178a069ecb9f5c4d94")}},
    {
        $lookup: {
            from: "test_data",
            localField: "referencedObjectId",
            foreignField: "_id",
            as: "referencedObject"
        }
    }
```
This is where the problems started.
I was getting strange errors regarding the Bson size limit, which did not help a lot to understand what the problem was.
```
com.mongodb.MongoCommandException: Command failed with error 10334 (BSONObjectTooLarge): 'BSONObj size: 22881537 (0x15D2501) is invalid. Size must be between 0 and 16793600(16MB) First element: _id: ObjectId('607dadabe9099700b688d510')' on server localhost:27018. The full response is {"ok": 0.0, "errmsg": "BSONObj size: 22881537 (0x15D2501) is invalid. Size must be between 0 and 16793600(16MB) First element: _id: ObjectId('607dadabe9099700b688d510')", "code": 10334, "codeName": "BSONObjectTooLarge"}
```

## Solution

Since I am using the Spring boot data mongo wrapper, there is always some magic going on in the background, which can lead to misunderstandings. My original Model class looked something like this:

```
@Document(collection = "test_data")
public class TestData {

@Id
private String id;

private String referencedObjectId;

private String anotherReferencedObjectId;
}
```

Using the `@Id` Annotation maps the String on java level to the _id field of [type ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) in the mongoDB.
For the "foreign keys" I could not use this annotation, as it is only for the "primary key" of the collection.

Turns out, what I needed to do was add the annotation `@Field(targetType = FieldType.OBJECT_ID)` in order to tell spring data to map String on java level to an ObjectId in the mongoDB.

```
@Field(targetType = FieldType.OBJECT_ID)
private String referencedObjectId;
```

## Migration
Since the old version of the data model was already in use on a server, I could not just delete the old data and start from scratch, but I needed a migration script to convert the Strings in the existing data to ObjectIds.


I came up with the following script, which is inspired by this [SO post](https://stackoverflow.com/questions/37718005/change-document-value-from-string-to-objectid-using-update-query)

```
var requests = [];
// let cursor = db.test_data.find({}, { "to": 1 });
let cursor = db.test_data.find({})
print("start migration script..")
cursor.forEach( document => {
    print(tojson(document))
    // only update id if it is type string
    if (typeof document.referencedObjectId == "string") {
    requests.push( {
        "updateOne": {
            "filter": { "_id": document._id },
            "update": { "$set": 
                { 
                    "referencedObjectId": ObjectId(document.referencedObjectId),
                    "anotherReferencedObjectId": ObjectId(document.anotherReferencedObjectId) 
                } 
            }
        }
    });
}
    print("requests: " + requests.length)
    // print(requests)
    if (requests.length === 1000) {
        // Execute per 1000 operations and re-init
        db.collection.bulkWrite(requests);
        requests = [];
    }
});

// Clean up queues
if (requests.length > 0)
    db.test_data.bulkWrite(requests);
```

## Spring data mongoTemplate Query
Now with that Problem out of the way, I only needed to translate the raw mongo query into an equivalent Spring data query.
```
        LookupOperation lookup1 = Aggregation.lookup("test_data", // Join Table
                "referencedObjectId",// Query table fields
                "_id",// Join fields in tables
                "referencedObject");// The name of the property in which the data is returned

        LookupOperation lookup2 = Aggregation.lookup("test_data",
                "anotherReferencedObjectId",
                "_id",
                "anotherReferencedObject");

TypedAggregation<TestData> typedAggregation =
                Aggregation.newAggregation(TestData.class, lookup1, lookup2);
        AggregationResults<TestDataDTO> aggregationResults = mongoTemplate.aggregate(typedAggregation, TestDataDTO.class);
        List<TestDataDTO> resultList = aggregationResults.getMappedResults();
```

The TestDataDTO is just a POJO with the referenced Objects instead of the IDs:
```
public class TestDataDTO {

@Id
private String id;

private ReferencedObject referencedObjectId;

private AnotherReferencedObject anotherReferencedObjectId;
}
```
