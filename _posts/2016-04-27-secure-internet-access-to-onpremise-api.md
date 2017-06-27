---
layout: post
title: Secure Internet Access to an On-Premise API
subtitle: Connect an ASP.NET identity to an on-premise API login identity, then relay all requests through the Azure Service Bus
category: dev
tags: [howto, cloud, development, api]
author: Robert Fitch
author_email: robert.fitch@haufe-lexware.com
header-img: "images/new/Exportiert_37.jpg"
---

This article shows you how to use the Microsoft Azure Service Bus to relay requests to an on-premise API through the internet in a secure manner.

# Preparation

You will need a Microsoft Azure account. Create a new "Service Bus Namespace" (in this example it is "HaufeMessageBroker"). Under the "Configure" tab, add a new shared access policy, e.g. "OnPremiseRelay":

{:.center}
![]( /images/secure-internet-access/pic43.jpg){:style="margin:auto"}



Use the namespace, the policy name, and the primary key in the code samples below.

# The On-Premise API

We make some assumptions about the on-premise API. These are not prerequisites in the sense that otherwise no access would be possible, but they should apply to many standard situations. It should also be fairly clear which aspects of the solution would have to be adapted to other situations.

- The on-premise API is an HTTP-REST-API.
- There is a Login-method, taking user name and password as parameters.
- The Login-method returns a Session-Id, which must be included in a header in all subsequent calls to the API to identify the user.
- The password is necessary in the on-premise API to identify the user, but it does not otherwise have an internal meaning.
    - Counterexample: If the password is also necessary, for example, as credentials for a database login, then we have a problem.
    - Reason: The solution binds an external identity (ASP.NET, Facebook, etc.) with the on-premise User-Id and allows the user to login with that identity, so the on-premise password is superfluous.
    - Solution: If the on-premise password is actually necessary (e.g. for the database login), then it would have to be entered as part of or after the external login, which is of course possible but not really what we are hoping for in an SSO solution.
- The same API may be running on on-premise servers in different locations. For example a Lexware-API accessing the Lexware-Pro database would be running on every customer's server.

One easy way to create an on-premise API is using the self-host capabilities of ASP.NET with Owin. There are many how-tos available for doing this. However, this solution does not dictate how the on-premise API is to be implemented, and any one will do.

# Microsoft Azure Service Bus

The Azure Service Bus provides an easy way to access an on-premise WCF (Windows Communications Foundation) interface from any cloud server. Of course, we do not want to rewrite our entire business API to become a WCF Interface, so part of the solution is to develop a small and generic WCF Interface, which resides in a new on-premise service and simply relays HTTP request/response information to and from the actual on-premise API. This is the "On-Premise Relay Service" below.

We also need two ASP.NET applications running in the cloud:



1. An ASP.NET web site ("Identity Portal") where a user can create a web identity (possibly using another identity like Facebook), then connect that identity to the on-premise login of the API running on his/her company's server. For this one-time action, the user needs to:
    - enter a Host Id, which is the identification of the on-premise relay service running at his/her company location. This is necessary to tell the Azure Service Bus which of the many existing on-premise relay services this user wants to connect to.
    - enter his on-premise user name and password. These get relayed to the on-premise API to confirm that the user is known there.
    -  From this time on, the web identity is connected to a specific on-premise relay service and to a specific on-premise identity, allowing SSO-access to the on-premise API.


2. An ASP.NET WebApi ("Cloud Relay Service") allowing generic access via the Service Bus to the on-premise API. This means, for example, that an application which consumes the on-premise API only need change the base address of the API to become functional through the Internet.
    - Example: A browser app, which previously ran locally and called the API at, say:
     `http://192.168.10.10/contacts/v1/contacts`
can now run anywhere and call:
     `https://lexwareprorelay.azurewebsites.net/relay/contacts/v1/contacts`
with the same results.
    - The only difference is that the user must first login using his web credentials instead of his on-premise credentials. The application then gets a token which identifies the user for all subsequent calls. The token contains appropriate information (in the form of custom claims) to relay each call to the appropriate on-premise relay service.


So there are actually two relays at work, neither of which has any business intelligence, but simply route the http requests and responses:



1. The ASP.NET WebApi "Cloud Relay Service", hosted in the cloud, which:
    - receives an incoming HTTP request from the client, e.g. browser or smartphone app.
    - converts it to a WCF request object, then relays this via the Azure Service Bus to the proper on-premise relay service.
    - receives a WCF response object back from the on-premise relay service.
    - converts this to a true HTTP response, and sends it back to the caller.



2. The "On-Premise Relay Service", which:
    - receives an incoming WCF request object.
    - converts it to a true HTTP request, then relays this to the endpoint of the on-premise API.
    - receives the HTTP response from the on-premise API.
    - converts it to a WCF response object and returns it via the Azure Service Bus to the ASP.NET WebApi "Cloud Relay Service".


In addition, there is the Azure Service Bus itself, through which the "Cloud Relay Service" and the "On-Premise Relay Service" communicate with each other.

# Sequence Diagrams

## On-Premise Solution

Here we see a local client logging in to the on-premise API, thereby receiving a session-id, and using this session-id in a subsequent call to the API to get a list of the user's contacts.

{:.center}
![]( /images/secure-internet-access/pic36.jpg){:style="margin:auto"}

 

## One-Time Registration

This shows registration with the Identity Portal in two steps:


1. Create a new web identity.
2. Link that web identity to a certain on-premise API and a certain on-premise user id.

*(Please right-click on image, "open in new tab" to see better resolution)*
{:.center}
![]( /images/secure-internet-access/pic37.jpg){:style="margin:auto"}


After this process, the identity database contains additional information linking the web identity to a specific on-premise API (the "OnPremiseHostId") and to a specific on-premise identity (the "OnPremiseUserId"). From now on, whenever a client logs in to the ASP.NET Cloud Relay with his/her web credentials, this information will be added to the bearer token in the form of claims.

## Client now uses the Cloud Relay Service

Now the client activity shown in the first sequence diagram looks like this:

*(Please right-click on image, "open in new tab" to see better resolution)*
{:.center}
![]( /images/secure-internet-access/pic38.jpg){:style="margin:auto"}
 

What has changed for the client?

- The client first logs in to the ASP.NET Cloud Relay:
    `https://lexwareprorelay.azurewebsites.net/api/account/externallogin` using its web identity credentials
- The client then logs in to the on-premise API:
    `https://lexwareprorelay.azurewebsites.net/relay/account/v1/external_login` instead of `http://192.168.10.10/account/v1/login` 
    and does not include any explicit credentials at all, since these are carried by the bearer token.
- The client then makes "normal" API calls, with two differences:
    - The base URL is now `https://lexwareprorelay.azurewebsites.net/relay/` instead of http://192.168.10.10/ 
    - The client must include the authorization token (as a header) in all API calls.


What has changed for the on-premise API?

- The API provides a new method `accounts/v1/user_id` (used only once during registration!),  which checks the provided credentials and returns the internal user id for that user. This is the value which will later be added as a claim to the bearer token.
- The API provides a new method `accounts/v1/external_login`, which calls back to the ASP.NET WebApi to confirm the user id, then does whatever it used to do in the original `accounts/v1/login` method. In this sample, that means starting a session linked to this user id and returning the new session-id to the caller.
- The other API methods do not change at all, though it should be noted that an authorization header is now always included, so that if, for example, the session-id should be deemed not secure enough, the on-premise API could always check the bearer token within every method.

# Code

The following sections show the actual code necessary to implement the above processes. Skip all of this if it's not interesting for you, but it is documented here to make the job easier for anyone actually wanting to implement such a relay. 

## New Methods in the On-Premise API

Here are the new methods in the accounts controller of the on-premise API which are necessary to work with the external relay.

~~~csharp

        #region New Methods for External Access
 
        // base url to the ASP.NET WebApi "Cloud Relay Service"
        // here local while developing
        // later hosted at e.g. https://lexwareprorelay.azurewebsites.net/
        static string secureRelayWebApiBaseAddress = "https://localhost:44321/";
 
        /// <summary>
        /// confirm that the bearer token comes from the "Cloud Relay Service"
        /// </summary>
        /// <param name="controller"></param>
        /// <returns></returns>
        /// <remarks>
        /// Call this from any API method to get the on-premise user id
        /// </remarks>
        internal static UserInfo CheckBearer(ApiController controller)
        {
            // get the Authorization header
            var authorization = controller.Request.Headers.Authorization;
            Debug.Assert(authorization.Scheme == "Bearer");
            string userId = null;
            try
            {
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(secureRelayWebApiBaseAddress + "api/account/OnPremiseUserId");
                webRequest.Headers.Add("Authorization", authorization.Scheme + " " + authorization.Parameter);
                using (var hostResponse = (HttpWebResponse)webRequest.GetResponse())
                {
                    string content = null;
                    using (StreamReader reader = new StreamReader(hostResponse.GetResponseStream()))
                    {
                        content = reader.ReadToEnd();
                    }
                    userId = content;
                    userId = JsonConvert.DeserializeObject<string>(userId);
                }
            }
            catch (Exception)
            {
                throw new UnauthorizedAccessException();
            }
            var userInfo = Users.UserInfos.Values.FirstOrDefault(u => u.UserId.Equals(userId));
            if (userInfo == null)
            {
                throw new UnauthorizedAccessException();
            }
            return userInfo;
        }
 
        /// <summary>
        /// GetUserId
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns></returns>
        /// <remarks>
        /// This method returns the internal user id for the given credentials.
        /// The method is called during the registration process so that
        ///     the user id can be added to the claims of any future bearer tokens.
        /// </remarks>
        [HttpPost]
        [Route("userid")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetUserId([FromBody] LoginCredentials credentials)
        {
            var userInfo = Users.UserInfos.Values.SingleOrDefault(u => u.UserName.Equals(credentials.UserName) && u.Password.Equals(credentials.Password));
            if (userInfo != null)
            {
                return Ok(userInfo.UserId);
            }
            else
            {
                return Unauthorized();
            }
        }
 
        /// <summary>
        /// ExternalLogin
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// This is called by the client via the relays and replaces the "normal" login.
        /// </remarks>
        [HttpGet]
        [Route("external_login")]
        [ResponseType(typeof(string))]
        public IHttpActionResult ExternalLogin()
        {
            try
            {
                // get the user info from the bearer token
                // This also confirms for us that the bearer token comes from
                //  "our" Cloud Relay Service
                var userInfo = CheckBearer(this);
                // create session id, just like the "normal" login
                string sessionId = Guid.NewGuid().ToString();
                SessionInfos.Add(sessionId, userInfo);
                return Ok(sessionId);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
 
        #endregion

~~~ 


## The On-Premise Relay Service

In `IRelay.cs`, define the WCF service (consisting of a single method "Request"). Also, define the WCF Request and Response classes.

~~~csharp

    /// <summary>
    /// IRelay
    /// </summary>
    [ServiceContract]
    public interface IRelay
    {
        /// <summary>
        /// A single method to relay a request and return a response
        /// </summary>
        /// <param name="requestDetails"></param>
        /// <returns></returns>
        [OperationContract]
        ResponseDetails Request(RequestDetails requestDetails);
    }
 
    /// <summary>
    /// The WCF class to hold all information for an HTTP request
    /// </summary>
    public class RequestDetails
    {
        public Verb Verb { get; set; }
        public string Url { get; set; }
        public List<Header> Headers = new List<Header>();
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
    }
 
    /// <summary>
    /// The WCF class to hold all information for an HTTP response
    /// </summary>
    public class ResponseDetails
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Status { get; set; }
        public string Content { get; set; }
        public string ContentType { get; set; }
    }
 
    /// <summary>
    /// an HTTP header
    /// </summary>
    public class Header
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
 
    /// <summary>
    ///  the HTTP methods
    /// </summary>
    public enum Verb
    {
        GET,
        POST,
        PUT,
        DELETE
    } 

~~~
 

And the implementation in `Relay.cs`

~~~csharp

    public class Relay : IRelay
    {
        // the local base url of the on-premise API
        string baseAddress = http://localhost:9000/;
 
        /// <summary>
        /// Copy all headers from the incoming HttpRequest to the WCF request object
        /// </summary>
        /// <param name="requestDetails"></param>
        /// <param name="webRequest"></param>
        private void CopyIncomingHeaders(RequestDetails requestDetails, HttpWebRequest webRequest)
        {
            foreach (var header in requestDetails.Headers)
            {
                string key = header.Key;
                if ((key == "Connection") || (key == "Host"))
                {
                    // do not copy
                }
                else if (key == "Accept")
                {
                    webRequest.Accept = header.Value;
                }
                else if (key == "Referer")
                {
                    webRequest.Referer = header.Value;
                }
                else if (key == "User-Agent")
                {
                    webRequest.UserAgent = header.Value;
                }
                else if (key == "Content-Type")
                {
                    webRequest.ContentType = header.Value;
                }
                else if (key == "Content-Length")
                {
                    webRequest.ContentLength = Int32.Parse(header.Value);
                }
                else
                {
                    webRequest.Headers.Add(key, header.Value);
                }
            }
        }
 
        /// <summary>
        /// Relay a WCF request object and return a WCF response object
        /// </summary>
        /// <param name="requestDetails"></param>
        /// <returns></returns>
        public ResponseDetails Request(RequestDetails requestDetails)
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(baseAddress + requestDetails.Url);
            CopyIncomingHeaders(requestDetails, webRequest);
            switch (requestDetails.Verb)
            {
                case Verb.GET:
                    webRequest.Method = "GET";
                    break;
                case Verb.POST:
                    webRequest.Method = "POST";
                    break;
                case Verb.PUT:
                    webRequest.Method = "PUT";
                    break;
                case Verb.DELETE:
                    webRequest.Method = "DELETE";
                    break;
                default:
                    webRequest.Method = "GET";
                    break;
            }
 
            var responseDetails = new ResponseDetails();
            if ((requestDetails.Verb == Verb.POST) || (requestDetails.Verb == Verb.PUT))
            {
                // serialize the body object for POST and PUT
                byte[] bytes = requestDetails.Content;
                webRequest.ContentType = requestDetails.ContentType;
                webRequest.ContentLength = bytes.Length;
                // relay the body object to the request stream
                try
                {
                    using (Stream requestStream = webRequest.GetRequestStream())
                    {
                        requestStream.Write(bytes, 0, bytes.Length);
                        requestStream.Flush();
                        requestStream.Close();
                    }
                }
                catch (WebException ex)
                {
                    responseDetails.StatusCode = HttpStatusCode.ServiceUnavailable;
                    responseDetails.Status = ex.Message;
                    return responseDetails;
                }
            }
 
            // send request and get response
            try
            {
                using (HttpWebResponse hostResponse = (HttpWebResponse)webRequest.GetResponse())
                {
                    string content = null;
                    string contentType = null;
                    using (StreamReader reader = new StreamReader(hostResponse.GetResponseStream()))
                    {
                        content = reader.ReadToEnd();
                    }
                    contentType = hostResponse.ContentType.Split(new char[] { ';' })[0];
                    // build the response object
                    responseDetails.StatusCode = hostResponse.StatusCode;
                    responseDetails.ContentType = contentType;
                    responseDetails.Content = content;
                }
            }
            catch (WebException ex)
            {
                if (ex.Response == null)
                {
                    responseDetails.StatusCode = HttpStatusCode.ServiceUnavailable;
                }
                else
                {
                    responseDetails.StatusCode = ((HttpWebResponse)ex.Response).StatusCode;
                }
                responseDetails.Status = ex.Message;
            }
            return responseDetails;
        }
    } 

~~~
 

And finally, the code while starting the service to connect to the Azure Service Bus under a unique path.

This code could be in `program.cs` of a console application (as shown) or in the start-method of a true service):

~~~csharp

        static void Main(string[] args)
        {
            // instantiate the Relay class
            using (var host = new ServiceHost(typeof(Relay)))
            {
                // the unique id for this location, hard-coded for this sample
                // (could be e.g. a database id, or a customer contract id)
                string hostId = "bf1e3a54-91bb-496b-bda6-fdfd5faf4480";
 
                // tell the Azure Service Bus that our IRelay service is available
                //  via a path consisting of the host id plus "\relay"
                host.AddServiceEndpoint(
                    typeof(IRelay),
                    new NetTcpRelayBinding(),
                    ServiceBusEnvironment.CreateServiceUri("sb", "haufemessagebroker", hostId + "/relay"))
                    .Behaviors.Add(
                        new TransportClientEndpointBehavior(
                            TokenProvider.CreateSharedAccessSignatureTokenProvider("OnPremiseRelay", "7Mw+Njy52M95axVlCzHdk4QxxxYUPxPORCKRbGk9bdM=")));
                host.Open();
 
                Console.WriteLine("On-Premise Relay Service running...");
                Console.ReadLine();
            }
        } 

~~~
 

Notes:

- The hostId must be unique for each on-premise location. 
- The service bus credentials (here, the name "haufemessagebroker" and the "OnPremiseRelay" must all be prepared via the Azure Portal by adding a new service bus namespace, as described in the introduction. In a live environment, you might want some kind of Service Bus Management API, so that each on-premise relay service could get valid credentials after, say, its company signed up for the relay service, and not have them hard-coded.

Once the on-premise relay service is running, you will see it listed with its host id in the Azure Management Portal under the "Relays" tab:

{:.center}
![]( /images/secure-internet-access/pic44.jpg){:style="margin:auto"}


## ASP.NET Identity Portal 

Create a new ASP.NET Project (named e.g. "IdentityPortal") and select "MVC". Before compiling and running the first time, change the class ApplicationUser (in `IdentityModels.cs`) as follows:

~~~csharp

    public class ApplicationUser : IdentityUser
    {
        public string OnPremiseHostId { get; set; }
        public string OnPremiseUserId { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            // Add custom user claims here
            userIdentity.AddClaim(new Claim("OnPremiseHostId", OnPremiseHostId ?? String.Empty));
            userIdentity.AddClaim(new Claim("OnPremiseUserId", OnPremiseUserId ?? String.Empty));

            return userIdentity;
        }
    } 

~~~ 

This adds two fields to the user identity, which we will need later to link each user to a specific on-premise API and specific on-premise user id. And, importantly, it adds the content of the two new fields as custom claims to the ApplicationUser instance.

By adding this code **before** running for the first time, the fields will automatically be added to the database table. Otherwise, we would need to add them as code-first migration step. So this just saves a bit of trouble.

Now compile and run, and you should immediately be able to register a new web identity and log in with that identity.

*Prepare to register with the on-premise API*

Use `NuGet` to add "WindowsAzure.ServiceBus" to the project.

Also, add a reference to the OnPremiseRelay DLL, so that the IRelay WCF Interface, as well as the Request and Response classes, are known.

In `AccountViewModels.cs`, add these classes:

~~~csharp

    public class RegisterWithOnPremiseHostViewModel
    {
        [Required]
        [Display(Name = "On-Premise Host Id")]
        public string HostId { get; set; }
        [Required]
        [Display(Name = "On-Premise User Name")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "On-Premise Password")]
        public string Password { get; set; }
    }
 
    public class LoginCredentials
    {
        [JsonProperty(PropertyName = "user_name")]
        public string UserName { get; set; }
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    } 

~~~ 

In `_Layout.cshtml`, add this line to the navbar:

~~~html

    <li>@Html.ActionLink("Register With Host", "RegisterWithOnPremiseHost", "Account")</li> 

~~~ 

Add the following methods to the AccountController class:

~~~csharp

        // this must point to the Cloud Relay WebApi
        static string cloudRelayWebApiBaseAddress = "https://localhost:44321/";
 
        //
        // GET: /Account/RegisterWithOnPremiseHost
        public ActionResult RegisterWithOnPremiseHost()
        {
            ViewBag.ReturnUrl = String.Empty;
            return View();
        } 
 
        //
        // POST: /Account/RegisterWithOnPremiseHost
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RegisterWithOnPremiseHost(RegisterWithOnPremiseHostViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
 
            string userId = null;

            try
            {
                // open the Azure Service Bus 
                using (var cf = new ChannelFactory<IRelay>(                  
                    new NetTcpRelayBinding(),
                    new EndpointAddress(ServiceBusEnvironment.CreateServiceUri("sb", "haufemessagebroker", model.HostId + "/relay"))))
                {
                    cf.Endpoint.Behaviors.Add(new TransportClientEndpointBehavior
                    {
                        TokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider("OnPremiseRelay", "7Mw+Njy52M95axVlCzHdxxxxxhYUPxPORCKRbGk9bdM=")
                    });

                    IRelay relay = null;
                    try
                    {
                        // get the IRelay Interface of the on-premise relay service 
                        relay = cf.CreateChannel();
                        var credentials = new LoginCredentials
                         {
                            UserName = model.UserName,
                            Password = model.Password
                        };
                        var requestDetails = new RequestDetails
                        {
                            Verb = Verb.POST,
                            Url = "accounts/v1/userid",
                            Content = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(credentials)),
                            ContentType = "application/json"
                         };
 
                        // call the on-premise relay service 
                        var response = await Task.Run(() =>
                        {
                            try
                            {
                                return relay.Request(requestDetails);
                            }
                            catch (EndpointNotFoundException)
                            {
                                return null;
                            }
                        });

                        if ((response == null) || (response.StatusCode == HttpStatusCode.ServiceUnavailable))
                        {
                            ModelState.AddModelError("", "Login zur Zeit nicht möglich, weil der lokale Dienst nicht erreichbar ist.");
                            return View(model);
                        }
                        else if (response.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            ModelState.AddModelError("", "Login fehlgeschlagen.");
                            return View(model);
                        }
                        else if (response.StatusCode != HttpStatusCode.OK)
                        {
                            ModelState.AddModelError("", "Login zur Zeit nicht möglich.\nDetails: " + response.Status);
                            return View(model);
                        }

                        // alles ok
                        userId = response.Content;
                        userId = JsonConvert.DeserializeObject<string>(userId);
                    }
                    catch (Exception)
                    {
                        ModelState.AddModelError("", "Login zur Zeit nicht möglich, weil der lokale Dienst nicht erreichbar ist.");
                        return View(model);
                    }
                }
            }
            catch (CommunicationException)
            {
                return View(model);
            }
            ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            user.OnPremiseUserId = userId;
            user.OnPremiseHostId = model.HostId;
            UserManager.Update(user);
            return RedirectToAction("RegisterWithOnPremiseHostSuccess");
        }
 
        // GET: Account/RegisterWithOnPremiseHostSuccess
        public ActionResult RegisterWithOnPremiseHostSuccess()
        {
            ViewBag.ReturnUrl = String.Empty;
            return View();
        } 

~~~ 

Note:

- The note about the service bus credentials (in the on-premise relay service) applies here, too, of course.

To Views\Account, add `RegisterWithOnPremiseHost.cshtml`:

~~~html

    @model IdentityPortal.Models.RegisterWithOnPremiseHostViewModel
    @{
        ViewBag.Title = "Register With On-Premise Host";
    }
    <h2>Register With On-Premise Host</h2>
    @using (Html.BeginForm())
    {
        @Html.AntiForgeryToken()
           <div class="form-horizontal">
             <hr />
             @Html.ValidationSummary(true, "", new { @class = "text-danger" })
            <div class="form-group">
                 @Html.LabelFor(model => model.HostId, htmlAttributes: new { @class = "control-label col-md-2" })
                <div class="col-md-10">
                    @Html.EditorFor(model => model.HostId, new { htmlAttributes = new { @class = "form-control" } })
                    @Html.ValidationMessageFor(model => model.HostId, "", new { @class = "text-danger" })
                </div>
             </div>
             <div class="form-group">
                 @Html.LabelFor(model => model.UserName, htmlAttributes: new { @class = "control-label col-md-2" })
                <div class="col-md-10">
                    @Html.EditorFor(model => model.UserName, new { htmlAttributes = new { @class = "form-control" } })
                    @Html.ValidationMessageFor(model => model.UserName, "", new { @class = "text-danger" })
                </div>
             </div>
             <div class="form-group">
                 @Html.LabelFor(model => model.Password, htmlAttributes: new { @class = "control-label col-md-2" })
                <div class="col-md-10">
                    @Html.EditorFor(model => model.Password, new { htmlAttributes = new { @class = "form-control" } })
                    @Html.ValidationMessageFor(model => model.Password, "", new { @class = "text-danger" })
                </div>
             </div>
             <div class="form-group">
                 <div class="col-md-offset-2 col-md-10">
                     <input type="submit" value="Register" class="btn btn-default" />
                 </div>
             </div>
         </div>
     }
    @section Scripts {
        @Scripts.Render("~/bundles/jqueryval")
    } 

~~~
 

Also to Views\Account, add `RegisterWithOnPremiseHostSuccess.cshtml`: 

~~~html

    @{
        ViewBag.Title = "Success";
    }
    <h2>@ViewBag.Title</h2>
      <div class="row">
         <div class="col-md-8">
             <section id="loginForm">
                 @using (Html.BeginForm("HaufeLogin", "Account", new { ReturnUrl = ViewBag.ReturnUrl }, FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
                {
                    @Html.AntiForgeryToken()
                    <hr />
                     <h4>Your on-premise login credentials have been confirmed..</h4>
                }
            </section>
         </div>
    </div>
    @section Scripts {
        @Scripts.Render("~/bundles/jqueryval")
    } 
 
~~~

Now you can log in to the Identity Portal and select "Register With Host".

Assuming:

- the on-premise relay service has a host id = bf1e3a54-91bb-496b-bda6-fdfd5faf4480
- the on-premise API has a user with user name = "Ackermann"

Then fill in the form appropriately:

{:.center}
![]( /images/secure-internet-access/pic39a.jpg){:style="margin:auto"}

 

Once this registration is successful, any client can now communicate with the on-premise API using the Cloud Relay Service, defined below.

 

## Cloud Relay Service

Create a new ASP.NET Project (named e.g. "CloudRelayService") and select "Web Api".

- Before compiling and running the first time, make the same changes to the ApplicationUser class as mentioned above for the Identity Portal.
- Also, edit web.config and change the connection string for "DefaultConnection" to work with the same database as the Identity Portal by copying the connection string from that project.
- Important: if the connection string contains a `|DataDirectory|` reference in the file path, you will have to replace this with the true physical path to the other project, otherwise the two projects will not point to the same database file.

Add the following method to the AccountController (for this, you must include the System.Linq namespace):

~~~csharp

        // GET api/Account/OnPremiseUserId
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("OnPremiseUserId")]
        public IHttpActionResult GetOnPremiseUserId()
        {
            // get the on-premise user id
            var identity = (ClaimsIdentity)User.Identity;
            var onPremiseUserIdClaim = identity.Claims.SingleOrDefault(c => c.Type == "OnPremiseUserId");
            if (onPremiseUserIdClaim == null)
            {
                return Unauthorized();
            }
            return Ok(onPremiseUserIdClaim.Value);
        } 

~~~ 

Use `NuGet` to add "WindowsAzure.ServiceBus" to the project.

Also, add a reference to the OnPremiseRelay DLL, so that the IRelay WCF Interface, as well as the Request and Response classes, are known.

Then add a new controller `RelayController` with this code:

~~~csharp

    [Authorize]
    [RoutePrefix("relay")]
    public class RelayController : ApiController
    {
        private void CopyIncomingHeaders(RequestDetails request)
        {
            var headers = HttpContext.Current.Request.Headers;
            // copy all incoming headers
            foreach (string key in headers.Keys)
            {
                request.Headers.Add(new Header
                {
                    Key = key,
                    Value = headers[key]
                });
            }
        }
 
        [HttpGet]
        [Route("{*url}")]
        public async Task<IHttpActionResult> Get(string url)
        {
            return await Relay(url, Verb.GET);
        }
 
        [HttpPost]
        [Route("{*url}")]
        public async Task<IHttpActionResult> Post(string url)
        {
            return await Relay(url, Verb.POST);
        }
 
        [HttpPut]
        [Route("{*url}")]
        public async Task<IHttpActionResult> Put(string url)
        {
            return await Relay(url, Verb.PUT);
        }
 
        [HttpDelete]
        [Route("{*url}")]
        public async Task<IHttpActionResult> Delete(string url)
        {
            return await Relay(url, Verb.DELETE);
        }
 
        private async Task<IHttpActionResult> Relay(string url, Verb verb)
        {
            byte[] content = null;
            if ((verb == Verb.POST) || (verb == Verb.PUT))
            {
                // for POST and PUT, we need the body content
                content = await Request.Content.ReadAsByteArrayAsync();
            }
            // get the host id from the token claims
            var identity = (ClaimsIdentity)User.Identity;
            var onPremiseHostIdClaim = identity.Claims.SingleOrDefault(c => c.Type == "OnPremiseHostId");
            if (onPremiseHostIdClaim == null)
            {
                return Unauthorized();
            }
            try
            {
                // open the Azure Service Bus
                using (var cf = new ChannelFactory<IRelay>(
                   new NetTcpRelayBinding(),
                   new EndpointAddress(ServiceBusEnvironment.CreateServiceUri("sb", "haufemessagebroker", onPremiseHostIdClaim.Value + "/relay"))))
                {
                    cf.Endpoint.Behaviors.Add(new TransportClientEndpointBehavior
                    {
                        TokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider("OnPremiseRelay", "7Mw+Njy52M95axVlCzHdxxxxxhYUPxPORCKRbGk9bdM=")
                    });
 
                    // get the IRelay Interface of the on-premise relay service
                    IRelay relay = cf.CreateChannel();
                    var requestDetails = new RequestDetails
                     {
                        Verb = verb,
                        Url = url
                    };
                    // copy the incoming headers
                    CopyIncomingHeaders(requestDetails);
                    if ((verb == Verb.POST) || (verb == Verb.PUT))
                    {
                        requestDetails.Content = content;
                        var contentTypeHeader = requestDetails.Headers.FirstOrDefault(h => h.Key == "Content-Type");
                        if (contentTypeHeader != null)
                        {
                            requestDetails.ContentType = contentTypeHeader.Value;
                        }
                    }
 
                    // call the on-premise relay service
                    var response = await Task.Run(() =>
                    {
                        try
                        {
                            return relay.Request(requestDetails);
                        }
                        catch (EndpointNotFoundException)
                        {
                            // set response to null
                            // this will be checked after the await, see below
                            //  and result in ServiceUnavailable
                            return null;
                        }
                    });
                    if (response == null)
                    {
                        return Content(HttpStatusCode.ServiceUnavailable, String.Empty);
                    }
                    // normal return
                    return Content(response.StatusCode, response.Content);
                }
            }
            catch (CommunicationException)
            {
                return Content(HttpStatusCode.ServiceUnavailable, String.Empty);
            }
        }
    } 

~~~ 

 

Note:

- The note about the service bus credentials (in the on-premise relay service) applies here, too, of course.

The Cloud Relay WebApi should now be ready to return an authorization token for the web identity, and also relay http requests via WCF and the Azure Service Bus to the on-premise relay service.

Note that all relay methods are protected by the class's Authorize attribute.

*Examples using Chrome Postman:*

Get a token using a web identity (Note the path `/Token`, the content-type, and the content):

{:.center}
![]( /images/secure-internet-access/pic40.jpg){:style="margin:auto"}

 

 

Using the token, with prefix "Bearer", log in to the on-premise API and receive a session-id:

{:.center}
![]( /images/secure-internet-access/pic41.jpg){:style="margin:auto"}



Now use the session-id to make normal calls to the API:

{:.center}
![]( /images/secure-internet-access/pic42.jpg){:style="margin:auto"}


 
