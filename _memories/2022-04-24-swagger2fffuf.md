---
layout: memory
title: Swagger to FFuF (Pipeline)
---

## pasw - Parse Swagger

pasw is a simple tool that parses swagger json structure and outputs ready to use curl/ffuf commands.

#### Install

For Go 1.17+

```bash
go install -v git.sr.ht/~ohdude/pasw/cmd/pasw@latest
```

Alternatively:

```bash
git clone https://git.sr.ht/~ohdude/pasw
cd pasw
make
```

#### Auxiliary tools

pasw works better with flattened swagger structure. In order to do so install swagger tool from goswagger.io and execute:

```bash
swagger flatten --with-expand -o swagger_flat.json swagger.json
```

#### Usage

```bash
$ cat test.json | pasw
curl -X GET https://test.com/v1/company/profiles/{id}
curl -X DELETE https://test.com/v1/company/profiles/{id}
curl -X POST -d "email=''&password=''" https://test.com/v1/company/
```

**ffuf output**:

```bash
$ cat test.json | pasw -o ffuf
ffuf -X GET -u https://test.com/v1/company/profiles/{id}
ffuf -X DELETE -u https://test.com/v1/company/profiles/{id}
ffuf -X POST -d "email=''&password=''" -u https://test.com/v1/company/auth
```

**method matching**:

```bash
$ cat test.json | pasw -mm post
curl -X POST -d "email=''&password=''" -u https://test.com/v1/company/auth
```

pasw tries to give you hints about type of parameters by emiting empty values like '', [], false.

**flag forwarding**:

```bash
$ cat test.json | pasw -ff "-x http://127.0.0.1:8080"
curl -X POST -x http://127.0.0.1:8080 -d "email=''&password=''" -u https://test.com/v1/company/auth
```

Note: multiple -ff flags are accepted.

Based on this flow a Pipeline can be constructed as GitHub Action, CodePipeline, ... (TODO)
