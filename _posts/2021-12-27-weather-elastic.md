---
title: "Bringing Weather Data to Elasticsearch"
date: 2021-12-29T19+01:00
---

The following Logstash configuration polls the [Weather Underground API](https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit) and stores the document into Elasticsearch.

    input {
        http_poller {
            urls => {
            wunderground => "https://api.weather.com/v2/pws/observations/current?stationId=IDULLI1&format=json&units=m&apiKey=$API_KEY"
            }
            request_timeout => 60
            schedule => { cron => "0,15,30,45 * * * * UTC"}
            codec => "json"
            # A hash of request metadata info (timing, response headers, etc.) will be sent here
            metadata_target => "http_poller_metadata"
        }
    }

    output {
        elasticsearch {
            hosts => ["localhost:9200"]
            user => "elastic"
            password => "changeme"
            index => "weather-%{+YYYY.MM.dd}"
        }
    }

