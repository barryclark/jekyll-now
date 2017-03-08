---
layout: post
title: Angular2 Windows Authentication
date: 2017-3-8 16:02:33
---

Windows Authentication is required for intranet web sites, I have been working for a manufacturing company for 4 years, we have domain account/ Active Directory for security checkup in each sites. So if we need to develop a Angular2 application which can be used all over the domain, then we need to think about the security very seriously, this is just a small demo with very limit functions.

## ASP.NET Web Api
Create a ASP.NET WebApi project with **Windows Authentication** checked, this will normally include the basic settings which are required for Windows Authentication. Just double check following two files

##### launchSetting.json

```
"iisSettings": {
    "windowsAuthentication": true,
    "anonymousAuthentication": false,
    "iisExpress": {
      "applicationUrl": "http://localhost:61112/",
      "sslPort": 0
    }
  }

```
##### web.config

    <aspNetCore processPath="%LAUNCHER_PATH%" 
                arguments="%LAUNCHER_ARGS%" 
                stdoutLogEnabled="false" 
                stdoutLogFile=".\logs\stdout" 
                forwardWindowsAuthToken="true" />
                

### Enabling Cross-Origin Request(CORS)

>Browser security provents a web page from making AJAX requests to another momain. This restriction is called the same-origin policy, and provents a malicious site from reading sensitive data from another site. 

>Cross Origin Resource Sharing(CORS) is a W3C standard that allows a server to relax the same-origin policy. Using CORS, a serve can explicitly allow some cross-origin requests while rejecting others. 

[Read more](https://docs.microsoft.com/en-us/aspnet/core/security/cors)

###### Add CORS package to your project

> you can use NuGet Manger to install it or run npm install

> reference it in your startup.cs file
>> using Microsoft.AspNetCore.Cors;

Add the orgins which will access your WEB API, for example: http://localhost
```
        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://apps-test", "http://localhost:4200", "http://localhost")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            services.AddMvc();

        }
```
- option 1:　you can enable it globally by adding it in following method

```
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseCors("AllowSpecificOrigin");

            app.UseMvc();
        }
```     
- Option 2:　Or you can enable it in the controller class or action method

```
    [Authorize]
    [Route("api/values")]
    [EnableCors("AllowSpecificOrigin")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet("username")]
        public string GetUserName()
        {
            return User.Identity.Name;
        }

        [HttpGet("strings")]
        public string getstring() {
            return "Hello World";
        }

    }
   ``` 
### Deploy WebApi to IIS 7

> The deployment procedure should be very simple, I will not list the procedures here.

**Notice:** Make sure "Windows Authentication" is enabled and "Anonymous Authentication" is disabled. This is to ensure all requests are using windows authentication. 

### Angular2 Application

By default, the browser will not send user authentication details to the server. We must configure out Angular2 application requests to send this information. 
```
this.http.get(this.testUrl, { withCredentials: true})
    .subscribe((data:any) => console.log(data));

this.http.get(this.authUrl, {withCredentials: true})
    .subscribe((data:any) => console.log(data));
```
## Summary

Above processes should be implemented without any failure, you can add more functionalites into it. I hope this artical will save couple of your valuable hours.

## Errors you may encounter

- No 'Access-Control-Allow-Origin' header is present on the requested resource 
- HTTP Error 401.2 - Unauthorized 
- The response had HTTP status code 401
- XMLHttpRequest cannot load 
