---
layout: post
title: You're up and running!
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.

```objc
- (void)requestActivityLog
{
    // API call: background, async
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSError *error;
    ActivityLogResponse *response = [ProjectAPI
                                    getProjectWithLimit:@30
                                    withError:&error];
                
    if (error == nil && response && response.result == 0) {
        [self completeScheduleAPISuccess:YES response:response msg:nil];
    } else {
        NSString *message = (response.message ? response.message: error.localizedDescription);
        [self completeScheduleAPISuccess:NO response:response msg:message];
        }
    });
}
```
