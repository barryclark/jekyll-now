---
layout: post
title: How to Use hdk::api::call for Inter-Zome Call
tags: [building-blocks, holochain]
author: Tatsuya Sato 
---
Welcome to the blog post on How to Use hdk::api::call for Inter Zome Call! In this blog post, I will be explaining how we can use the `hdk::api::call` to call zome functions from another zome! (Note: We will be focusing on inter-zome calls in this blog post but you can certainly use `hdk::api::call` for bridging between 2 DNAs as well!) I was inspired to write this blog post as I had a really difficult time learning how to use this api approrpiately as there was not enough example of using this api from projects within the community. Hopefully, this blog will help everyone have a smooth sailing using this amazing piece of api from holochain HDK!

In this guide, we will be walking you through on how to call zome functions from one zome to another. Knowing how to use this pattern will definitely come in handy as we build complex projects with multiple zomes (and even multiple DNAs!). 

We assume that the readers have a basic understanding of Holochain in this blog post. If not, you can always check the documentation to learn more about it and then dive into this post! Below are some of the useful documentation available for holochain! We will also include the documentation for `hdk::api::call` as well here. Make sure as well that you have [installed holochain](https://developer.holochain.org/docs/install/) locally before we get started!

* [Holochain](https://developer.holochain.org/docs/tutorials/coreconcepts/)
* [hdk::api::call](https://docs.rs/hdk/0.0.50-alpha4/hdk/api/fn.call.html)

### Understanding the function signature

Before we dive deep into how to actually use the `hdk::api::call`, let's make sure that we understand the function signature of this api so that we can expect what input to provide and what output we should handle when using this call.

Here's the function signature of `hdk::api::call`

```rust
pub fn call<S: Into<String>>(
    instance_handle: S, 
    zome_name: S, 
    cap_token: Address, 
    fn_name: S, 
    fn_args: JsonString
) -> ZomeApiResult<JsonString>
```

Explanation of each of the parameter of `hdk::api::call` is as follows:

- `instance_handle`: This is where you will specify which instance has the zome function you would like to call. In our case, since both zomes needed for inter-zome call resides in the same instance, we can pass in `hdk::THIS_INSTANCE` later in our example code.

- `zome_name`: As the name suggests, this is where you will specify the name of the zome where the zome function you'd like to call resides.

- `cap_token`: This is where you (as the caller of the remote zome function) will pass the address of any capability token you have for the call you are trying to make. We will not dive deep into this topic as capability token is another concept that deserves its own blog post. For now, what you need to understand is that if the caller has the right cap_token, the callee will accept the requested zome function to be used. If not, the callee will reject the call request. This is useful when an agent tries to call any remote zome function on behalf of another agent (e.g. read/write into another agent's source chain). For this blog post, we will use `hdk::PUBLIC_TOKEN` which basically allows anyone to make a remote zome call that's `hc_public`.

- `fn_name`: As the name suggest, this is the name of the function you are trying to remotely call.

- `fn_args`: This is the arguments the zome function you are calling need to execute the call properly. As you can see in the function signature, this parameter only accepts JsonString so we need to make sure that the argument we are passing can be serialized into [JsonString](https://docs.rs/hdk/0.0.50-alpha4/hdk/prelude/struct.JsonString.html).

Lastly, the `hdk::api::call` will return us a `JsonString` wrapped in ZomeApiResult. This means that we have to deserialize the returned JsonString so that we can return the appropriate value from the zome function we used the `hdk::api::call` in. 


### Code Time!!

Hopefully by now, it is clear to us what the `hdk::api::call` accept as arguments and what it returns. It is extremely crucial to understand what the `hdk::api::call` expects as arguments and how you should handle the returned values so that we won't be wasting our valuable time. 

If your answer is yes, then it's CODE TIME!! I will be creating two very simple zomes with one zome being the caller of the function written in another zome. After going through the step by step process of how to execute `hdk::api::call`, I will be sharing a more complex and probably realistic example of `hdk::api::call` (taken from Kizuna project) as I will only be writing very simple example of `hdk::api::call` so as to not confuse us all. 

Okay, enough writing for me and reading for you! Let's first enter the nix-shell environment.

(Tips for Linux/Mac user: if you are getting tired of typing the whole command to run nix-shell, just press ctrl + r then type `love` then type enter! This will run the command below but with lesser typing. Thanks @e-nastasia for this very helpful tip!)

``` nix
nix-shell https://holochain.love
```

Next, initialize your holochain app on the root directory and enter the app directory:

``` nix
hc init inter-zome-call
cd inter-zome-call
```

Now that we have the holochain project, let's add two zomes named `caller` and `callee` that we will be working on!
For this example, we will actually implement the example found [here](https://docs.rs/hdk/0.0.50-alpha4/hdk/api/fn.call.html) with one caveat! Instead of just returning the result of the sum to `caller` zome, we will instead commit the result of the sum to the DHT in `callee` and return its address to the `caller` zome! We will have a `handle_sum_and_commit` function in `callee` zome and the `caller` zome will contain the function that has the `hdk::api::call` that will call the `handle_sum_and_commit` function in `callee` zome.
To check the code in its entirety, you can click [here](https://github.com/tatssato/inter-zome-call) and follow this article together with the already written code!

```nix
hc generate zomes/caller rust-proc
hc generate zomes/callee rust-proc
```

Let's first open the `callee` zome and remove the codes that we won't be using. 
Let's also change the name of the module as well as the name of the struct `MyEntry` to `Sum`. 
```rust
- pub struct MyEntry {
-     content: String,
- }
+ pub struct Sum {
+     value: i32
+ }

+ impl Sum {
+     pub fn new(value: i32) -> Self {
+         Sum {
+             value
+         }
+     }
+     pub fn entry(self) -> Entry {
+         Entry::App("sum".into(), self.into())
+     }
+ }
- mod my_zome
+ mod callee_zome

-    #[entry_def]
-    fn my_entry_def() -> ValidatingEntryType {
-        entry!(
-            name: "my_entry",
-            description: "this is a same entry defintion",
-            sharing: Sharing::Public,
-            validation_package: || {
-                hdk::ValidationPackageDefinition::Entry
-            },
-            validation: | _validation_data: hdk::EntryValidationData<MyEntry>| {
-                Ok(())
-            }
-        )
-    }
+    #[entry_def]
+    fn sum_entry_def() -> ValidatingEntryType {
+        entry!(
+            name: "sum",
+            description: "this is the sum entry defintion",
+            sharing: Sharing::Public,
+            validation_package: || {
+                hdk::ValidationPackageDefinition::Entry
+            },
+            validation: | _validation_data: hdk::EntryValidationData<Sum>| {
+                Ok(())
+            }
+        )
+    }
-    #[zome_fn("hc_public")]
-    fn create_my_entry(entry: MyEntry) -> ZomeApiResult<Address> {
-        let entry = Entry::App("my_entry".into(), entry.into());
-        let address = hdk::commit_entry(&entry)?;
-        Ok(address)
-    }
-
-    #[zome_fn("hc_public")]
-    fn get_my_entry(address: Address) -> ZomeApiResult<Option<Entry>> {
-        hdk::get_entry(&address)
-    }
```
Okay! What we did above is that we change the `MyEntry` struct to `Sum` struct first. This `Sum` struct will
contain a single field named `value` which is the result of adding two numbers. We also implemented some
simple functionality to this `Sum` struct to make our life easier! `new()` just returns a new instance of `Sum`
struct and `entry()` function will return as the `Entry` type which we can commit to the source chain and DHT.
Following that, we change the name of the module to `callee_zome` and renamed the entry definition appropriately for `Sum` entry. We also deleted the functions we wont be using.

Next, let's write a simple function named `handle_sum_and_commit` which will accept two `i32` values as arguments that will be morphed into a `Sum` struct which we will commit to the DHT and return its address sa the return value of the function. Let's write this piece of function right below the `sum_entry_def()`.

```rust
+    #[zome_fn("hc_public")]
+    fn handle_sum_and_commit(num1: i32, num2: i32) -> ZomeApiResult<Address> {
+        let sum_value = num1 + num2;
+        let new_sum: Sum = Sum::new(sum_value);
+        let sum_entry: Entry = new_sum.entry();
+        let sum_entry_address = hdk::commit_entry(&sum_entry)?;
+        Ok(sum_entry_address)
+    }
```

Good! We got the function written nicely. Now our work is done with `callee` zome!
Let's open the `caller` zome now and write the function that will call this `handle_sum_and_commit` using
`hdk::api::call`!. First, once you opened the `caller` zome, let's clean up the code and change the name of the module as well. 

```rust
- #[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
- pub struct MyEntry {
-     content: String,
- }

- mod my_zome {
+ mod caller_zome {

-    #[entry_def]
-    fn my_entry_def() -> ValidatingEntryType {
-        entry!(
-            name: "my_entry",
-            description: "this is a same entry defintion",
-            sharing: Sharing::Public,
-            validation_package: || {
-                hdk::ValidationPackageDefinition::Entry
-            },
-            validation: | _validation_data: hdk::EntryValidationData<MyEntry>| {
-                Ok(())
-            }
-        )
-    }
-
-    #[zome_fn("hc_public")]
-    fn create_my_entry(entry: MyEntry) -> ZomeApiResult<Address> {
-        let entry = Entry::App("my_entry".into(), entry.into());
-        let address = hdk::commit_entry(&entry)?;
-        Ok(address)
-    }
-
-    #[zome_fn("hc_public")]
-    fn get_my_entry(address: Address) -> ZomeApiResult<Option<Entry>> {
-        hdk::get_entry(&address)
-    }
```

Great! Our `caller` zome is now pretty clean! Finally, we will write the zome function that will use the `hdk::api::call`! I will first show you the entire piece of function and explain what each line of code does!

```rust
+    #[zome_fn("hc_public")]
+    fn sum_and_get_address(num1: i32, num2: i32) -> ZomeApiResult<Address> {
+        #[derive(Serialize, Deserialize, Debug, DefaultJson)]
+        struct ZomeInput {
+            num1: i32,
+            num2: i32,
+        };
+        let call_input = ZomeInput {
+            num1,
+            num2,
+        };
+
+        let sum_address_string = hdk::call(
+            hdk::THIS_INSTANCE, 
+            "callee", 
+            Address::from(hdk::PUBLIC_TOKEN.to_owned()), 
+            "handle_sum_and_commit", 
+            call_input.into()
+        )?;
+    
+        match serde_json::from_str(&sum_address_string.to_string()) {
+            Ok(result) => result,
+            Err(_e) => Err(ZomeApiError::from("parsing failed".to_owned()))
+        }
+    }
```
Alright, so here's the complete function that will allow us to properly execute an inter-zome-call!
This `sum_and_get_address` will accept two `i32` values and will return the Address (wrapped in ZomeApiResult) of the `Sum` entry that will be committed in `handle_sum_and_commit` function in `callee` zome. 

Next, you can see that we are defining a struct `ZomeInput` with certain `derive` traits to allow this struct to be easily converted to and from JSON. This `ZomeInput`, as the name suggests, will be passed in to `hdk::api::call` as the argument needed for the `handle_sum_and_commit` function. Next, we made an instance of the `ZomeInput` and passed in the values we got from the parameters of this function. We name this instance `call_input`. 

Next, we define a variable `sum_address_string` which will contain the result of the `hdk::call` we are going to execute. The variable `sum_address_string` is named this way because `hdk::call` returns us a `JsonString` type when it runs successfully.

We passed `hdk::THIS_INSTANCE` for the `instance_handle` saying that the same instance should be used for this inter-zome call. 

Next, we passed the name of the zome which is `callee`, then pass the address of `hdk::PUBLIC_TOKEN` as the `cap_token` signifying that the token we are using is a public one. (since the zome function `handle_sum_and_commit` in `callee` is an `hc_public` function, this `cap_token` will be accepted). 

Subsequently, we pass the name of the zome function we would like to call (`handle_sum_and_commit`). Lastly, we passed the `call_input` serving as the arguments to `handle_sum_and_commit` function. We uesd `into` here since the `fn_args` parameter of `hdk::call` needs a JsonString. Since we gave `ZomeInput` struct `derive` traits for easy conversion to JSON, this will work without problem and will be converted to `JsonString`. Lastly, we added `?` operator so that if `hdk::call` fails for whatever reason, the `ZomeApiError` will be returned right away. 
(NOTE: The error that will be returned from here is the error from the `hdk::call` itself and not the error that can occur in the `handle_sum_and_commit` function.) 

Next, after setting up the `hdk::call` function, we need to handle the `JsonString` that will be returned from the `hdk::call`. This means that we have to deserialize the returned value from the `hdk::call` and also handle possible parsing error from `serde_json`. This is exactly what we are doing in the last three lines of the function. 

We invoked the `match` keyword for the deseralization of the `JsonString` that is stored in `sum_address_string`. `serde_json::from_str` attempts to deserialize an instance of type T(in our case, it will be `ZomeApiResult<Address>` since this is what is being returned from `handle_sum_and_commit`) from a string of JSON text. 
That is why we are passing the reference to `sum_address_string` that is converted to `String` type, giving us a string of JSON. 

Lastly, we simply return the value inside `Ok()` if it is successfuly parsed since this matches the return type of the `sum_and_get_address` function. If it is an error, for now we are simply returning a custom `ZomeApiError` signifying the failure of parsing but you can also use the `e` value from `Err` and pass it to the `caller` of this function.

Great!! Now we are done with both zomes, you hopefully now know how to use `hdk::api::call` to execute an inter-zome call! I have written a simple tryorama test script [here](https://github.com/tatssato/inter-zome-call/blob/master/inter-zome-call/test/index.js) to make sure that the inter-zome call works perfectly! You can simple enter the `nix-shell` environment and run `hc test` in the root directory if you'd like to see for yourself that the inter-zome call is working. Lastly, if you would like to learn more about inter-zome call, I have two things to share with you that you can do on your own!
1. You can try to write a new function in `callee` zome that will accept an address and return the `Sum` entry committed in DHT. And then you can write another function in `caller` zome to call the getter function in `callee` zome!

2. You can check the Kizuna project [here](https://github.com/hc-institute-japan/Kizuna/blob/develop/dnas/lobby/zomes/contacts/code/src/contact/handlers.rs#L223-L246) and [here](https://github.com/holochain-open-dev/profiles-zome/blob/9bcdb63411817f2e8ab719d42c8e7c3a31419ccf/code/src/profile/handlers.rs#L148-L186) to see an actual example of how `hdk::api::call` can be used to make meaningful inter-zome call. To give you a brief explanation, we have 2 zomes named `profiles` and `contacts`. the `profiles` zome has a function that allow us to pass in an address and returns the username that is located at that address. We remotely call this zome function in `contacts` zome because we want to make sure that the address being passed to functions like `add`(add the address to contact) is an actualy address of a username and not just some random address. 

We're done! I hope you found this guide useful! It would be lovely and awesome if you can share this article with anyone who are struggling with this topic. If you find some gap/bug in this guide, or want to expand some more ground on similar issues, please contact us in the forum or in the github repo! 

See you until next time!
