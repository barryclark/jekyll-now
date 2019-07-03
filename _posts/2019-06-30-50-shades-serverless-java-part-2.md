---
layout: post
title: 50 Shades Of Serverless In Java! (Part 2)
excerpt: |
  In this second part, we will adapt the application to make it runnable in AWS as a serverless application. For that purpose, we will use the SAM framework, adapt our web application for AWS Lambda and finally use DynamoDB as a storage mechanism.
---

<div style="float: right;padding:5px">
  <a title="Amazon.com Inc. [Apache License 2.0 (http://www.apache.org/licenses/LICENSE-2.0)], via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_Logo.svg"><img width="128" alt="Amazon Web Services Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"></a>
</div>

In the [first part]({% post_url 2019-06-25-50-shades-serverless-java-part-1 %}) of this series, we described the small CRUD API that we wanted to build. It ended up by creating a simple web application that can run in every servlet container and stores its data in Memory.

In this second part, we will adapt the application to make it runnable in AWS as a serverless application. For that purpose, we will use the SAM framework, adapt our web application for AWS Lambda and finally use DynamoDB as a storage mechanism.


## The SAM Framework

<img src="/images/2019-06-30-meet-sam.png" style="float: left"/>
One of the most difficult thing when developing a serverless application is to keep our application organized. Applications have several functions, permissions, tables or topics to manage. If we do not automate the deployment, we end up very soon with dozen of builds, deployment descriptors, etc...

The [SAM Framework](https://aws.amazon.com/serverless/sam/) is the Serverless Application Model of AWS. It is an extension of CloudFormation and it allows to package and deploy an application as a single piece.

As an extension of Cloudformation, you can deploy every AWS resource in the same template: your DynamoDB table, your topics etc... For instance here's how we can declare a Lambda function:

```yaml
MovieServiceFunction:
  Type: AWS::Serverless::Function
  Properties:
    Handler: org.dmetzler.serverless.movie.AwsServiceMovieHandler::handleRequest
    Runtime: java8
    CodeUri: target/serverless-movie-service-aws-0.0.1-SNAPSHOT-lambda-package.zip
    Layers:
      - !Ref MovieServiceFunctionLayer
    MemorySize: 1024
    Policies:
      - AWSLambdaBasicExecutionRole
      - DynamoDBCrudPolicy:
           TableName: !Sub "${AWS::StackName}-movies"
    Timeout: 30
    Environment:
      Variables:
        MOVIES_TABLE_NAME: !Sub "${AWS::StackName}-movies"
```

We can notice that we do not use the Cloudformation `AWS::Lambda::Function` resource but the `AWS::Serverless::Function` SAM one. It allows more things like defining the policies (which will create roles and permissions) or the direct reference to an artifact without having to upload it to s3. At the end of the post, we'll see how SAM helps us to package the complete application and make it easy to deploy.

## A JAX-RS Container In Lambda

Our application is basically a JAX-RS application. There's, unfortunately, no serverless "WAR As A Service" in AWS. We could use Elastic Beanstalk, but that would mean that we are not doing Serverless. The only way to do serverless in AWS is to code some Lambda functions.

Hopefully, for us, there is a project in AWS Labs that allows starting Java container in a serverless ecosystem. That project is called ServerLess Java Container and is available on [Github](https://github.com/awslabs/aws-serverless-java-container/). It provides several adapters for:

 * Spring
 * Spring Boot
 * Apache Struts
 * Jersey
 * Spark

Its usage is straightforward, and the setup of the LambdaHandler for Jersey makes use of the Stream handler of Lambda:

```java
public abstract class AbstractMovieServiceHandler implements RequestStreamHandler {

    private final JerseyLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    // List of application bindings to configure injections, this
    // allows to have different injection in tests
    protected abstract List<AbstractBinder> binders();

    public AbstractMovieServiceHandler() {
        ResourceConfig jerseyApplication = new ResourceConfig()//
                             .packages("org.dmetzler.serverless.jaxrs")
                             .register(CustomJacksonFeature.class);

        binders().forEach(jerseyApplication::register);

        handler = JerseyLambdaContainerHandler.getAwsProxyHandler(jerseyApplication);

    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
        outputStream.close();
    }
}
```

The `JerseyLambdaContainerHandler` allows creating a `Handler` for Lambda that will serve our JAX-RS application. We still use the same way to configure our Jersey application by specifying the package to scan and register some features or some injection binding. For testing reasons, this class is `abstract` and the `binders` is delegated to the implementation. For instance, the handler used once in production defines the following bindings:

```java
public class AwsServiceMovieHandler extends AbstractMovieServiceHandler {

    public static class MovieServiceBinder extends AbstractBinder {

        @Override
        protected void configure() {
            bind(MovieApiServiceImpl.class).to(MovieApiService.class);
            bind(DynamoDBMovieDao.class).to(MovieDao.class).in(Singleton.class);
            bind(AmazonDynamoDBClientBuilder.standard().build()).to(AmazonDynamoDB.class).in(Singleton.class);
        }

    }

    @Override
    protected List<AbstractBinder> binders() {
        return Arrays.asList(new MovieServiceBinder());
    }

}
```

The `MovieDao` is bound to the `DynamoDBMovieDao`] implementation. We use the standard Dynamo client as we are in Lambda: we do not need to specify any AWS access key or secret as we inherit it from the Lambda security context. We'll see later how to define that security context: i.e. how the Lambda gets access to the DynamoDB table.


## Testing our implementation

We coded a [`DynamoDBMovieDao`](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-aws/src/main/java/org/dmetzler/serverless/movie/service/impl/DynamoDBMovieDao.java), but how can we be sure it works well? As a big fan of unit tests, I cannot think of coding without writing tests. In fact, some abstract tests for the `MovieDAO` interface are already written in [AbstractMovieDaoTest.java](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service/src/test/java/org/dmetzler/serverless/service/AbstractMovieDaoTest.java), we now have to execute them against our DynamoDB implementation.

Because we don't want to depend on AWS in our tests, we will use a local AWS cloud stack that is called [LocalStack](https://github.com/localstack/localstack). It allows starting part or whole of an AWS stack to test your application. Even if it's supposed to be fully functional as they advertise, I would recommend to use it more as a mock on steroids.

So our DynamobDB test just becomes:

```java
public class DynamoDBDaoIT extends AbstractMovieDaoTest {

    @Override
    protected MovieDao getMovieDao() {
        AmazonDynamoDB dynamoClient = DockerTestUtils.getClientDynamoDb();
        createTable(dynamoClient, DynamoDBMovieDao.getMoviesTableName());

        return new DynamoDBMovieDao(dynamoClient);
    }

    public static void createTable(AmazonDynamoDB dynamoClient, String tableName) {
       ...
    }
}
```

Because the `MovieServiceHandlerHarness` uses a [different injection binding](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-aws/src/test/java/org/dmetzler/serverless/movie/MovieServiceHandlerHarness.java#L26) and uses the LocalStack endpoints for every AWS library, we are also able to test the API:

```java
public class AwsMovieServiceIT {

    ...

    @Before
    public void doBefore() {
        handler = new MovieServiceHandlerHarness();
        lambdaContext = new MockLambdaContext();
        DynamoDBDaoIT.createTable(DockerTestUtils.getClientDynamoDb(), DynamoDBMovieDao.getMoviesTableName());

    }

    @Test
    public void can_create_and_retrieve_a_movie() throws IOException {

        Movie movie = AbstractMovieDaoTest.getTestMovies().get(0);
        AwsProxyResponse response = post("movie/", movie);

        given(response)//
             .status(Response.Status.OK) //
             .headers(HttpHeaders.CONTENT_TYPE, a -> a.startsWith(MediaType.APPLICATION_JSON)) //
             .body("title", a -> a.isEqualTo("The Big Lebovski"));//

        response = get("movie/" + movie.getId().toString());
        given(response)//
             .status(Response.Status.OK) //
             .headers(HttpHeaders.CONTENT_TYPE, a -> a.startsWith(MediaType.APPLICATION_JSON)) //
             .body("title", a -> a.isEqualTo("The Big Lebovski"));//

    }
```

So, that's it: we are finished with the Java part. We can resume it to: put some pipes around JAX-RS and implement a DynamoDB MovieDao. This last part was not detailed here, but the full source is, of course, accessible on [Github](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-aws/src/main/java/org/dmetzler/serverless/movie/service/impl/DynamoDBMovieDao.java).


## Swagger And API Gateway

Now that our JAX-RS capable Lambda is ready, we have to expose it on the Web. In AWS, that's the job of API Gateway, and thanks to the fact that we defined our API with OpenAPI, it will be super easy. In our SAM definition we can define the AWS::Serverless::Api resource that will use our OpenApi definition:

```yaml
MovieApi:
  Type: AWS::Serverless::Api
  Properties:
    StageName: Prod

    DefinitionBody:
      'Fn::Transform':
        Name: 'AWS::Include'
        Parameters:
          Location: ./target/swagger.yaml
```

The `swagger.yaml` file has been extracted from the `serverless-movie-service` artifact by a [build configuration of the Maven dependency plugin](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-aws/pom.xml#L231-L254).

The last thing that we have to do is to update our Swagger definition and update each method to configure the [API Gateway integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions-integration.html).

```yaml
x-amazon-apigateway-integration:
  uri:
    Fn::Sub: "arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${MovieServiceFunction.Arn}/invocations"
  httpMethod: POST
  type: aws_proxy
  passthroughBehavior: when_no_match
```

When used with API Gateway, it defines that the method should invoke our Lambda using the proxy method. Our Lambda will then receive each call to each endpoint and then handle it with our JAX-RS implementation. The [API Gateway integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions-integration.html) defines plenty of other configurations that can be enabled on a per endpoint basis.

## Putting It All Together: Thanks SAM

We've built a lambda adapter for our JAX-RS application and exposed it thru API gateway. We now also need to create a DynamoDB table and define all the needed permissions. Of course, we also need to deploy the whole infrastructure to AWS.

As SAM can define all those resources, it will be super easy. The SAM model also add some helpers as [permission policies](https://github.com/awslabs/serverless-application-model/blob/develop/examples/2016-10-31/policy_templates/all_policy_templates.yaml) that allow for instance do add CRUD permission on a DynamoDB table: exactly what we need. For instance:

```yaml
Policies:
  - AWSLambdaBasicExecutionRole
  - DynamoDBCrudPolicy:
       TableName: !Sub "${AWS::StackName}-movies"
```

Our final SAM template can be found in the project's repository. To deploy it, we just need to run two commands:

 * `aws cloudformation package`: will take our SAM template, package the lambda as a ZIP, upload it to a S3 bucket, transform the template to make it a cloudformation template ready to deploy.
 * `aws cloudformation deploy`: will take the output of the previous command and deploy it to the cloud.

```shell
$ aws cloudformation package --template-file template.yaml \
            --output-template-file target/sam-output.yaml \
            --s3-bucket 50-shades-lambda
Uploading to d83dfc9352e44cd22d536a2a87772802  16948084 / 16948084.0  (100.00%)
Successfully packaged artifacts and wrote output template to file target/sam-output.yaml.
Execute the following command to deploy the packaged template
aws cloudformation deploy --template-file /Users/dmetzler/src/github.com/dmetzler/java-serverless/serverless-movie-service-aws/target/sam-output.yaml --stack-name <YOUR STACK NAME>
$ aws cloudformation deploy --template-file ./target/sam-output.yaml \
             --stack-name movie-service \
             --capabilities CAPABILITY_IAM
Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - movie-service
$ aws cloudformation describe-stacks --stack-name movie-service --query "Stacks[0].Outputs[0].OutputValue" --output text
https://vdsv6qii5e.execute-api.us-east-1.amazonaws.com/Prod/
$ curl https://vdsv6qii5e.execute-api.us-east-1.amazonaws.com/Prod/movie/
[ ]
```

That's it, our API is deployed and ready to run!


## Conclusion

In this post, we've been able to adapt our JAX-RS web application to the AWS ecosystem by using:

 * Lambda and serverless container to bootstrap the Jersey context
 * APIGateway to route the calls to the Lambda and reuse the OpenAPI definition
 * SAM to package all the resources we needed to be able to deploy the whole thing in two commands.

 The important thing to notice, is that there is no business rule in our AWS specific project. Even the tests of the DynamoDBDao are kept in the upstream project. It guarantees that when we will port our application to other cloud vendors, we won't forget any business logic in that specific AWS code.

When our application is not used, it costs nothing: this is true serverless! And because it costs nothing, we can deploy it as many time as we want, for instance, to get some development or pre-production instances. By using [AWS CodePipeline](https://aws.amazon.com/codepipeline/) and [AWS CodeDeploy](https://aws.amazon.com/codedeploy/), it's even possible setup a complete CI/CD workflow and deploy our Lambda using complex deployment rules to achieve blue/green or progressive deployment. This would be the subject for another blog post!


## References
 * Code for the samples: [https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-]()
 * Serverless Application Model: [https://github.com/awslabs/serverless-application-model]()
 * AWS Serverless Java Container: [https://github.com/awslabs/aws-serverless-java-container]()
