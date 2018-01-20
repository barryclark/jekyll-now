---
layout: post
title: some usefull Azure Shell 2.0 commands 
---

```bash
az vm start --ids  $(az vm list --query "[].id" -o tsv -g MAILKATLABXYZ| grep -v horde)
```
