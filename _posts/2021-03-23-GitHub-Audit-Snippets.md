---
layout: post
title: Github Audit Snippets
toc: true
---
### Summary
It blows my mind that I couldn't already find this in a library somewhere. Enterprises need a way to:
- Tail audit logs (users are added/commits are made/plugins are authorized)
- Get the corporate email of a github user within the org

## Github Audit Log Tailer
The functions below allow you to use a scheduled job to tail Github audit logs.
- REST API info is [here](https://docs.github.com/en/rest/reference/orgs#get-the-audit-log-for-an-organization)

***They really should put the warnings before the spells***
- You'll need an OAuth token with the `admin:org` scope
- These recursive functions aren't designed for large orgs; if you wanted to get this production ready:
    - Create a generator instead
    - Use async.io to process each page instead of concatenating them all together
    - Add logic to monitor API limits and react to rate-limit [throttling](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

### A helper for generating query urls
You'll need a few uri parameters on your first query. Subsequent queries use the url provided in the `Link` header. Provide `start_date` as a string `YYYY-mm-dd`
- `?phrase` : Allows you to filter using Github query language
- `created` : Only grab logs since $DATE
- `order` : Set to ascending (so we start with the oldest logs)
- `per_page` : 100 is the max, default is 30
- `include` : Set to `all`, ensures we grab `web` (add user) and `git` events (git commit)

```
def gen_url(org, start_date):
    url_base = 'https://api.github.com/orgs/{org_name}/audit-log'.format(org_name=org)
    url_tail = '?phrase=created:>={yyyy_mm_dd}&order=asc&per_page=100&include=all'.format(yyyy_mm_dd = start_date)
    return url_base + url_tail
```

### Set some variables via environs
I like to store things like this in my keychain and load them as environs via .bash_profile. Here's a neat [gist](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) by [Bryan Hatfield](https://twitter.com/brianhatfield) to make it easy.
```
username = os.environ.get("GITHUB_USERNAME")
github_pass = os.environ.get("GITHUB_LOG_TOKEN")
org = os.environ.get("GITHUB_ORG")
auth = requests.auth.HTTPBasicAuth(username, github_pass)
```

### Paging the Github REST API
Github uses the `Link` header to track pages... here's a function that pulls out the next_url
```
def get_next(link_header):
    sanitized = link_header.replace('"', "").replace("rel=", "").replace(" ", "")
    links = dict(x.split(";")[::-1] for x in sanitized.split(","))
    return links.get("next")
```


### Get the logs
I'm returning the cursor as well as the log_data. Persisting the cursor would allow you to pickup where you left off on subsequent queries and ***REDUCES*** (but does not eliminate) duplicates.
```
def get_logs(auth, url, log_data=None):
    if log_data is None:
        log_data = []
    url = url.rstrip(">").lstrip("<")
    ans = requests.get(url, auth=auth)
    next_url = get_next(ans.headers.get("Link"))
    log_data.extend(ans.json())
    if next_url is not None:
        get_logs(auth, next_url, log_data)

    results = {"cursor": url, "data": log_data}
    return results
```


## Get corporate email for Github organization users
I don't want to email hashtagcyber@gmail.com when a bug gets found; I want to cut a ticket for hashtagcyber@dayjob.com. To do this, I need a valid mapping of github users <> corporate email. If the organization uses SAML, I can use the GraphQL endpoint to retreive this mapping.

Notes:
- People who aren't using SSO won't have a mapping
- No one knows if this works without SCIM [Issue](https://github.com/github/platform-samples/issues/168)
- See notes in the Audit Log Tailer about making this production ready

### Pretty Graph Queries (are long)
These two queries allow us to page using nodes.
- Curly braces are doubled to allow format strings to work.
    - If you want to ditch the format strings, replace them with singles.
    - Fun Fact: Github pages (well, Jekyll) doesn't like curly braces either... here's a neat [blog](https://blog.slaks.net/2013-06-10/jekyll-endraw-in-code/) on the problem
- Use the first query when you don't have a cursor (First call to graph)
- Use the paged query on subsequent calls to reduce duplicates

<details>
<summary> First Query </summary>

```
{% raw %}
solo_query ='''query {{
  organization(login: "{org}") {{
    samlIdentityProvider {{
      ssoUrl
      externalIdentities(first: 10) {{
        edges {{
          node {{
            guid
            samlIdentity {{
              nameId
            }}
            user {{
              login
            }}
          }}
        }}
        pageInfo {{
        endCursor
        hasNextPage
      }}
      }}
    }}
  }}
}}
'''
{% endraw %}
```
</details>

<details>
<summary> Paged Query </summary>

```
{% raw %}
paged_query ='''query {{
  organization(login: "{org}") {{
    samlIdentityProvider {{
      ssoUrl
      externalIdentities(first: 100 after: "{cursor}") {{
        edges {{
          node {{
            guid
            samlIdentity {{
              nameId
            }}
            user {{
              login
            }}
          }}
        }}
        pageInfo {{
        endCursor
        hasNextPage
      }}
      }}
    }}
  }}
}}
'''
{% endraw %}
```
</details>

### Query the graph
The GraphQL endpoint uses an Authorization header with bearer token instead of basic HTTP auth.
- Provide a token and the Github Org name, receive the response edges

```
def get_users(org, token, cursor=None, user_data=None):
    if user_data is None:
        user_data = []
    url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'bearer {token}'.format(token=token)}
    if cursor is None:
        ans = requests.post(url, headers=headers, json={'query':solo_query.format(org=org)}).json()
    else:
        ans = requests.post(url, headers=headers, json={'query':paged_query.format(org=org, cursor=cursor)}).json()
    new_cursor = ans['data']['organization']['samlIdentityProvider']['externalIdentities']['pageInfo']['endCursor']
    new_data = ans['data']['organization']['samlIdentityProvider']['externalIdentities']['pageInfo']['hasNextPage']
    user_data.extend(ans['data']['organization']['samlIdentityProvider']['externalIdentities']['edges'])
    if new_data:
        get_users(org, token, new_cursor, user_data)
    return user_data
```

### Parse out just email:username from a node
I don't need all the other stuff, let's just build a small dict.
- Using dict.get() here and catching attribute errors because not every node in the response has the data we need (service accounts, people who aren't using SSO)

```
def parse_node(node):
    results = {}
    results["email"] = node.get("samlIdentity",{}).get("nameId","Unknown")
    try:
        results["github_user"] = node.get("user",{}).get("login","Unknown")
    except AttributeError:
        results["github_user"] = "Unknown"

    return results
```

### Parse the entire response and return a list
Simple Helper
```
def parse_response(response):
    results = []
    for entry in response:
        results.append(parse_node(entry.get('node',{})))
    return results
```

### Putting it all together
```
response = get_users(org, github_pass)
results = parse_response(response)
print(json.dumps(results))
```
