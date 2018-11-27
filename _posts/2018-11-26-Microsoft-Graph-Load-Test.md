While working on a project where I was making requests to MS Graph I became curious about how many requests I could make before there was any kind of denial of service. Also, what did the response look like when the request was not being serviced?

I went into [LinqPad](https://www.linqpad.net/) and created a new C# Program script. I then added the [*Active Directory Authentication Library*](https://www.nuget.org/packages/Microsoft.IdentityModel.Clients.ActiveDirectory/) and the [*Microsoft.Graph*](https://www.nuget.org/packages/Microsoft.Graph/) nuget packages. If you do not already use LinqPad for this type of prototyping work, I highly recommend it.

Here are the steps I take to test Graph's reaction to a number of asynchronous requests.

1. Authenticate as the Azure Application.
2. Create *n* tasks to perform the action I want to load test, in this case get the users from Azure AD.
3. Await all the tasks.

If any of the tasks fail to process the exception will be wrapped into an AggregateException as one of the inner exceptions. In this case I would like to know the type of exception and what the message is so I loop all the inner exceptions and dump them to the screen.

Since I am creating a new ```GraphServiceClient``` each time a request is made this simulates *n* users performing the same request at one time. Of course, this is limited to how many threads .net will spin up for you.

In my experience what happens when you set the total number of requests to a high number like 10000, is that the requests succeed for a while and then start to hang. You can witness this for yourself if you start Fiddler before running the script. After the script finishes execution you will notice that a significant amount of requests fail with a ```Microsoft.Graph.ServiceException` exception that have a ```Message``` property of: "Code: timeout Message: The request timed out." This exception makes sense after witnessing the requests first hand in fiddler.

In conclcusion, the script provides enough information to use a library like [Polly](https://www.nuget.org/packages/Polly/) to intelligently capture the error and retry the request.

Below is the LinqPad script. Substitute the placeholders with your own values.

**DISCLAIMER: this creates a large amount of http connections and may have a negative affect on other applications using http connections, like your chat client**

Another note: Ctrl+Shift+F5 stops all the threads associated to a script.

``` cs
// The total number of request to make to graph
static int totalRequests = 10000;

// The resource being contacted
static string microsoftGraphResource = "https://graph.microsoft.com/";

// The application info
static string applicationId = "<Azure Application Id>";
static string applicationSecret = "<Azure Application Secret>";

// Tenant Domain
static string domain = "<Azure Tenant Domain Name>";
static string idaAuthority = $"https://login.microsoftonline.com/{domain}";

async Task Main()
{
	AuthenticationResult authResult = await GetAuthenticationResultAsync();
	
	Task[] workArray = Enumerable.Range(1,totalRequests).Select(e => GetUsers(authResult)).ToArray();
	
	try
	{	        
		Task.WaitAll(workArray);		
	}
	catch (AggregateException ex)
	{
		foreach (Exception inner in ex.InnerExceptions)
		{
			$"Exception Type: {inner.GetType().FullName}, Exception Message: {inner.Message}".Dump();
		}
	}
}

private async Task<AuthenticationResult> GetAuthenticationResultAsync()
{
	ClientCredential clientCredential = new ClientCredential(applicationId, applicationSecret);

	AuthenticationContext authenticationContext = new AuthenticationContext(idaAuthority, false);

	AuthenticationResult authResult = await authenticationContext.AcquireTokenAsync(microsoftGraphResource, clientCredential);
	
	return authResult;
}

private GraphServiceClient GetClient(AuthenticationResult authResult)
{
	return
	new GraphServiceClient(
	new DelegateAuthenticationProvider(
	(requestMessage) =>
	{
		var authenticationResult = authResult;
		requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authenticationResult.AccessToken);
		return Task.CompletedTask;
	}));
}

private Task GetUsers(AuthenticationResult authResult)
{
	var client = GetClient(authResult);
		
	return
	client.Users.Request().GetAsync();
}

```