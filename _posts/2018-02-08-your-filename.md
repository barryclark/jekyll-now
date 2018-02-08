---
published: false
---
# Building the full Data Pipeline - I 
> This is fourth article in the series discussing the elements required to make a locally developed data science model to production-ready machine

Design of a robust data pipeline has the potential to unlock the vault of your business values as it is the **thread** which binds the choices you made for storage, models etc.  
It is based on the ancient philosophical idea of the whole being greater than the sum of its parts.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_B2DC7116346CC15C461037A70D872546A7E2A15FEE170EE5EC24BD38C20C2064_1511223237679_design-gestalt.gif)

Historically, large-scale ETL software(Datastage, SSIS) were used to be employed in this paradigm of sharing data. But with the advent of cloud-based services since the late 2000s and cheap data transfer over the internet, companies can migrate with fewer constraints and in more continuous manner. Companies do not have to allocate massive custom on-premise data resource maintained by a huge team to maintain scheduled data migration. which could turn into several month-long projects.
 
Speed is the key to the [deployment](http://houseofbots.com/news-detail/1531-4-the-biggeest-risk-with-ai-is-not-moving-fast-enough-to-deploy-it-microsoft) plans. It is in fact the key differentiation which would allow you to have the competitive advantage in the market over other and thus can be managed by applying the concepts of [continuous integration and continuous deployment.](https://blog.assembla.com/assemblablog/tabid/12618/bid/92411/continuous-delivery-vs-continuous-deployment-vs-continuous-integration-wait-huh.aspx)

----------
## Tyco data pipeline - Case Study

In continuation from the previous [post](https://github.com/anuragsoni9/ProductionScale/blob/master/03-%20Models.md) about choosing elements to a make production-ready pipeline for the security-cam services.
 Our objective with any choice is critical as thesuccess of early decisions have tremendous implications for future success. For example, choosing to validate images early-on in the workflow will save downstream resources to process invaluable “garbage-data”
Design choices should also seek to segregate the process in a way that helps to easily pinpoint problem areas and apply fixes quickly. Jumbling activities in one stage makes harder to do root-cause analysis especially when it is to be done through a web-log file. Activities like these can create bottlenecks in the process where too much efforts get applied with too little gain  and other resources sitting idle waiting for issue-fix. 


## 30,000 feet View of Pipeline

With these points in our attention, let's look at the required high-level stages:-


  **Input** - Frames of images that can come from a) multiple cams b) multiple surveillance sites


  **Output** - Alerts to Customers, Logs of result
  
  **Process In the middle(in no particular order)** - 
  - *Trigger* 
    - presence of any unsafe stimulus in the detection area
      e.g. triggered by a human-like object exceeding 95% threshold 
  - *Processing + Logging repositories*
    - Core Object Detection algorithm
      e.g. TensorFlow
    - Data manipulation process
      e.g.  Validation
    - Conventional Rules/Algorithms(contract between data science team and infrastructure services like [NEST cam APIs](https://developers.nest.com/))
  - *Alert service* 
    - Email alerts ([Sendgrid](https://sendgrid.com/), [Nagios](https://www.nagios.org/), [Pagerduty](https://www.pagerduty.com/))
    - Phone alerts
    - Automated Call
  - *Portal/Dashboard*
    - User-Level Graphs/Reports and notifications
    - Server-Side Monitoring Reports and Usage Analytics
      e.g. Daily Threat Report, Bar Plot(Count of threat vs. users)


## Pipeline - In Details


![](https://d2mxuefqeaa7sj.cloudfront.net/s_B2DC7116346CC15C461037A70D872546A7E2A15FEE170EE5EC24BD38C20C2064_1511233795366_Production+Data+Pipeline+-+Tyco.png)


**INPUT**

**Webcam Infrastructure Services:**
This is the entry point for our data pipeline where a different team is responsible to ensure the streaming of images from customer premises. Data Scientist team have to agree to API standards of collecting information. For instance, every camera feed must have a user-device identification. 

**Images Collector:**
This is the dumping ground of the incoming feed.  It needs to be large enough to efficiently handle traffic during peak hours(night hours in customer office) and ability to scale-up when the business scenario changes. Additionally, it is expected that this is going to store the images in a some soft-standardized way. For instance, resizing frames to make it consistent or removing extraneous information from different camera harware which are not required by our model.

**PROCESS**

**Validation Checking:** 
There could be restrictions based on format/size resolutions.  Any non-conformed images can be discarded into an invalid image repository. Alternatively, models can be employed to enhance a slightly grainy image or create alert services to notify users of the equipment failure in case of void images. This aspect is not covered in this series further.
We should have good tags to identify customers that can actually help in identifying images downstream even when it is operated upon in aggregation by models e.g. concatenating like <*userid-device-id- timestamp - timezones*>. This tags can be used as a filename. 

> Do we need to have common validation applied to them? - Answer: Yes
> It will standardize validation of properties of images(not in ML sense) and give a common input to the Deep Learning algorithm. Any user-specific requirement can be tackled in downstream easily.

Possible restriction that can be defined here:
  1. Format
  2. Resolution
  3. Size
  4. Contrast
  5. Tags identifying user/devices/time
   
The output of this stage is going to be *validated/standardized* images which will be an input to Object Detection(TensorFlow) algorithm. 

**Object Detection:** 
This is the most resource-heavy stage here. It is going to take longer than any stages. 
More on this can be found in the previous [post](https://github.com/anuragsoni9/ProductionScale/blob/master/03-%20Models.md) in the series.

Output can be configured to give images or a structured text file(JSON) of classified objects with the assigned probabilities in easy communication format. Text representation would be easy to automate as it will be easily readable by any downstream system which doesn't have any native reading capability.

![source: security.panasonic.com/](https://d2mxuefqeaa7sj.cloudfront.net/s_B2DC7116346CC15C461037A70D872546A7E2A15FEE170EE5EC24BD38C20C2064_1511213071246_534__aW50cnVkZXI..png)


**OUTPUT**

Sample way in which files will be moved to output from Object Detection. These are grouped by user-device id which helps downstream system to identify the context of images.

    /user-deviceid1
      time1.json
      time2.json
    /user-deviceid2
      time3.json
      time4.json

**Threat Detector with configurable Rules/Policies:**
Users across the board may have different needs to include/exclude specific objects e.g alerts to include humans in a restricted area vs. exclude in a public place. For this pipeline, we should have a defined list of dangerous classes which can be matched in threat detector 
e.g. If output JSON represent  a dog(98%) & Person(85%) then I  could define a rule for a user to detect exclusively dog as “Unsafe”  and for another user to exclusively detect persons. as “Unsafe”.

These rules can be clubbed together to make global rules that can be identified uniquely and be made reusable. This will help in scaling with onboarding of multiple users at a time. 

    RuleID: 100| Unsafe Class: Dog, Cat, Racoon| ALL with probability>80%

Note: It is not required to create a separate group of Safe as everything  not covered here is automatically considered as Safe 

**Alerts:**
API call is to be made in case of positive match guided by the user rules. These APIs call would need proper userid defined  and validated in the upstream to make the correct connection

**Records Repo:**
It is going to be a data-warehouse that captures any information that could be of any value internally to company or externally to customers. This includes successful matched events,  aggregated unsuccessful matches(*Do we need granular details on unmatched cases?*), API calls made to customer as well their responses  etc. 
These outputs can be further aggregated to give all the required dashboard for control and monitoring for both Tyco and individuals. For compliance, this can store all the historical records as opposed to incremental repo just after the processing. 

Pachyderm introduced in the previous  [post](https://github.com/anuragsoni9/ProductionScale/blob/master/02-%20Storage.md) will also help to version the data itself.  It will help with the provenance and offer no penalty in duping operations on data because Pachyderm will store the data on a single location under the hood - will just move the pointer.


----------
**CONCLUSION**

Any update in the service can be added after setting up of this basic pipeline. For example, facial detection of customers can be run after object detection if identified as a person by TensorFlow. Separation of pieces in this pipeline will help make any incremental update, basically an independent venture.
It is to be also noted that sequence of steps placed in the pipeline is very crucial to scaling up in the production environment. For example, validation for 'user id' done post-detection is a value-destroying option and will affect the output performance in different business condition(10 users to 1 million customers)



