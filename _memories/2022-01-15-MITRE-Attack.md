---
layout: memory
title: MITRE ATT&CK Bash Oneliner  
---

MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. The ATT&CK knowledge base is used as a foundation for the development of specific threat models and methodologies in the private sector, in government, and in the cybersecurity product and service community.

=> https://attack.mitre.org

The Oneliner below require curl and jq installed 

```bash
# Requires: curl, jq

# Download MITRE ATT&CK data from GitHub repository
curl -o enterprise-attack.json https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json

# List all ATT&CK object types
jq -r '[ .objects[].type ] | unique | .[]' enterprise-attack.json

# List all ATT&CK technique identifiers
jq -r '[ .objects[] | select(.type == "attack-pattern") | .external_references[] | select(.source_name == "mitre-attack") | .external_id ] | sort | .[]' enterprise-attack.json

# List all software identifiers
jq -r '[ .objects[] | select(.type == "tool" or .type == "malware") | .external_references[] | select(.source_name == "mitre-attack") | .external_id ] | sort | .[]' enterprise-attack.json

# List all attacker group identifiers
jq -r '[ .objects[] | select(.type == "intrusion-set") | .external_references[] | select(.source_name == "mitre-attack") | .external_id ] | sort | .[]' enterprise-attack.json
```

Next Steps: https://d3fend.mitre.org/about/
