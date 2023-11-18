# Notes

## Backup from RFC

### Platform Cost

Costs are interesting indicator to track to obtain trend of spending.

| Measurement | Measurement method | Comments |
| --- | --- | --- |
| Total approximate platform cost | Probably AWS | Will depict platform cost trend, but potentially will be incomplete because of current tool limitations |

Considering potential decommission of Kubecost, we need a spike to find out
proper way of collecting and representing AWS costs in Grafana.

### Average Utilization

Average Platform Utilization can represent how fully allocated resources are used.

| Measurement | Measurement method | Comments |
| --- | --- | --- |
| Total Average cpu, memory, filesystem utilization across all nodes | Prometheus metrics | Will depict platform utilization degree|
| Pods restarts by termination reason (oom / error) | Prometheus metrics | Could be an indicator how healthy apps are tuned |
| Node pod average density | Prometheus metrics | Will depict the state of average load distribution (how balanced pod distribution is) |
| Average application deployment frequency | Prometheus metrics | Will represent how active applications are developed |

Prometheus metrics are the best way to collect and represent data.
Probably some new recording rules should introduced to limit tool load especially
for long ranges like 6 months or a year.

### Platform Incident Analysis

Considering growing adoption of Incidentio based approach, to the incidents management it could be interesting to get insights about platform incidents statistics.

|Measurement | Measurement method | Comments |
| --- | --- | --- |
|Platform incident frequency|Incidentio| How intense there are incident generation in platform dimension|
|Platform incident resolution time|Incidentio| How fast context incidents are closed |
|Mean time to understanding (MTTU)|Incidentio| Or any other statistics, provided by incidentio |

How to Measure and Represent

As we are heavily using Prometheus and Grafana, it is reasonable to use them as
first level tools for data collection and representation.

As we are using Incidentio, it is reasonable to use it as a data source,
but there is no available integration between Inidentio and Prometheus/Grafana,
so we need a spike to verify adapter idea.