With the CSharp version of the API to the Table Service getting access to a ```CloudTable``` is done through an instance of the ```CloudTableClient``` object by calling ```GetTableReference("your-table-name")``` . Wanting to write code that can handle if the table does not already exist is nice to attempt to prevent errors in making requests to tables that are non-existent. Luckily the ```CloudTable``` object has a nice method called ```CreateIfNotExists```.

Calling ```CreateIfNotExists``` prompts the API to first make a POST to https://[yourstorageaccount].table.core.windows.net:443/Tables()

This attempts to create the table with the requested name. Since that table already exists it returns a 409 which is a "The specified entity already exists" error.

All of the return codes can be referenced here: 
https://docs.microsoft.com/en-us/rest/api/storageservices/table-service-error-codes 

If this error code is returned then it is ignored by the API and continues on with the original table reference.

The side effect that I was seeing was that there was a dependency failure being logged in Applicatoin Insights. 

Something like this.

![](../images/2018-11-12/TableStorage409.png)

The first option to solve this is to remove the call to ```CreateIfNotExists``` if you can be sure that the table will exist.

The other option is to create a telemetry initialzer and modify that telemetry item before it is sent to Application Insights. Below is the code for a simple way to modify the telemetry item.

``` cs
public class AzureCheckTableExistsInitializer : ITelemetryInitializer
    {
        public void Initialize(ITelemetry telemetry)
        {
            if (
               telemetry is DependencyTelemetry dependencyTelemetry &&
               dependencyTelemetry.Type == "Azure table" &&
               dependencyTelemetry.Name.EndsWith("Tables") &&
               dependencyTelemetry.Success == false)
            {
                dependencyTelemetry.Success = true;
            }
        }
    }
```

This will effectively tell Application Insights that the request was not a failure and it will no longer be flagged as a failure, but it will still be logged.

Also, be sure to wire up the initializer in the ApplicationInsights.config file or in code with 
``` cs
Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.Active.TelemetryInitializers.Add(new AzureCheckTableExistsInitializer());
```