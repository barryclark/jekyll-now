---
layout: post
title: Implicit vs Explicit links in Holochain
tags: concepts building-blocks links
---

**TLDR**: explicit links use `link_entries(base, target...)` to explicitely define relationships, while with implicit links one entry contains the address of another entry and we don't use any hdk api.

There are two main ways to declare relationships between different entries in Holochain: implicit links and explicit links.

They both share one common thing: they are **unidirectional**, meaning that we can only declare a link from one base entry to another target entry. If we need to be able to navigate both ways, we have to declare the link in both directions.

Both kinds of linking have their place when designing a holochain app. The basic question you can ask to know if a relationship between entries is better expressed as implicit or explicit links is this: 

* **Should entry's A "identity" change when we add or change a relationship to entry B?**
 If so, use implicit links. If it shouldn't change, use explicit links.

For example, a tweet entry should change of identity when we change the author of the tweet. But the agent entry should not change when we add a new tweet.

> Explicit and implicit links are often used with one another to be able to navigate relationships of entries. 
> 
> In a twitter example, a tweet would reference the `author_address` (implicit link) to be able to navigate to the author, but we would declare an explicit link from agent addresses to all the tweets that that agent has made.

## Explicit links

Explicit links use the built-in linking mechanism of Holochain, allowing to define links of a certain type and semantic tag between two already existing entries, with a base entry and a target entry. These types of links:

* Are typically used in a many to many relationship
* Add overhead to the DHT processes (these links are only a special type of entry)
* Include their own validation rules
* Are statically defined between two types of entries (might change in the future)


#### Example of an **explicit link**:

* On entry definition:
```rust
links: [
    from!(
        ANCHOR_TYPE,
        link_type: ANCHOR_LINK_TYPE,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::LinkValidationData| {
            Ok(())
        }
    )
]
```

* On zome call:
```rust
#[zome_fn("hc_public")]
fn create_chunk(chunk: String) -> ZomeApiResult<Address> {
    let entry = Entry::App("chunk".into(), Chunk::from(chunk).into());
    let chunk_address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&AGENT_ADDRESS.clone(), &chunk_address, "author->chunk", "")
}
```

## Implicit links

In implicit links, the content of one entry contains the address of another referenced entry.

These links are not explicit in any holochain mechanisms, nonetheless they are very useful for navigating your entry graph.

* They don't add any new entry to the DHT, so no overhead
* They change the address of the base entry every time the relationship is changed
* They are often used in one to one / many to one relationships
* Can reference any type of entry from any other type