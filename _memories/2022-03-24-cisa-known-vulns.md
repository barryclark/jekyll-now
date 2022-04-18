---
layout: memory
title: NSA/CISA - Known Exploited Vulns - Bash One Liner  
---

The NSA and CISA (Cybersecurity & Infrastructure Security Agency) startet an awesome new project and publish known exploited vulnerabilities as a JSON list with plenty of valuable info to bring up your shields. 

All the important links:
* [Known exploited vulnerabilities catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
* [Email Updates regarding known exploited vulnerabilities](https://public.govdelivery.com/accounts/USDHSCISA/subscriber/new?topic_id=USDHSCISA_136)
* [Cybersecurity Incident & Vulnerability Response Playbooks (pdf)](https://www.cisa.gov/sites/default/files/publications/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)

Since the CISA is also providing a JSON it's time for writing some one liners with jq:

```bash
# Download the JSON 
curl https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json

# bring the original JSON into a better data representation
jq '.vulnerabilities[] | [{product: .product, vulName: .vulnerabilityName, shortDescription: .shortDescription,  dateAdded: .dateAdded, requiredAction: .requiredAction}]' known_exploited_vulnerabilities.json

```
