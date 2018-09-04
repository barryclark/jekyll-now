---
layout: post
title: Introducing Pipette
cover_url: /images/2018-10-10-Introducing-Pipette/cover.jpg
---

SuitePad is a company based in Berlin, Germany. We're bringing Tablets into hotel rooms and replacing the old paper based guest directories with a digital solution. In order to improve the guest experience event further, we integrate with many hotel systems. Based on that information, we offer custom notifications and processes.

Our goal with Pipette is, to minimises the time to production for custom implementations, make them reusable, and still keeps the implementation clean and tested. By looking into possible solutions, the idea behind IFTTT and Node-RED looked interesting. Even though the projects didn't quite fit our needs, the paradigm of flow-based programming did.

From the very beginning, we worked with Lukas Rieder as a contractor, supporting us in designing and implementing Pipette. First, we looked at Flowex, then decided to go with GenStage as the underlaying framework. On top of it, we build an information packet (IP), a routing system, a convenient DSL and an easy way to test flow based implementations.

## Using Pipette

Pipette is based on recipes, describing the data flow by stages and subscriptions. A recipe has to start with a GenStage *producer* stage and needs to have one or many *consumer* stages. In between, it can have multiple *consumer_producer* stages, defining the behaviour of the recipe.

A *producer* stage generates data. The data that can be pushed into it from the outside or generated on demand. A *consumer* creates demand on the network, by requesting an answer from all it's subscriptions. As soon as data is available in the *producer*, the network is processing the it and passing the result to the consumer. A *consumer_producer* stage is an inner node, not generating demand on it's own, but forwarding incoming demand up it's subscriptions. Incoming data is processed and passed down the network.

![](/images/2018-10-10-Introducing-Pipette/demand-example.png)

A recipe always has the default nodes IN and OUT. The IN node is a push producer by default, the OUT node a push-back consumer. The push-back consumer is permanently generating demand on the network and sends the received IP to the process, referenced in its `reply_to` field. A push producer generates new values, as soon as a new IP is casted to it's process.

Within one recipe, it's possible to have more than one consumer. This way, a recipe could report something back to it's caller and then still keep processing something in the background before sending the data somewhere else.

![](/images/2018-10-10-Introducing-Pipette/example-recipe.png)

## Let's code

In order to use Pipette, add it as a dependency to your `mix.exs` file and install the dependencies.

```elixir
# mix.exs
defp deps do
  [
    {:pipette, "~> 0.1.0"}
  ]
end
```

```
mix deps.get
```

To create a new Recipe, we need to define a new Elixir module and have it use `Pipette.Recipe`. The simplest recipe would be, to create a passthrough, by subscribing OUT to IN.

![](/images/2018-10-10-Introducing-Pipette/passthrough-example.png)

For giving it a try in the Elixir REPL, we need to define the recipe, start it, and use the `Pipette.Client` to push data into the push producer and wait for the response from the consumer.

```elixir
defmodule DoorBellRecipe do
  use Pipette.Recipe

  @subscribe OUT: :IN
end

{:ok, controller} = DoorBellRecipe.start_link
controller |> Pipette.Client.start() |> Pipette.Client.call("Hello world!")
# => {:ok, "Hello world!"}
```

Considered, we want to have a more generic greeting service, we add some super simple data transformation.

```elixir
defmodule DoorBellRecipe do
  use Pipette.Recipe

  @stage generate_greeting: %Pipette.Stage{handler: {__MODULE__, :greeting}}

  @subscribe generate_greeting: :IN
  @subscribe OUT: :generate_greeting

  def greeting(name), do: "Hello #{name}!"
end

{:ok, controller} = DoorBellRecipe.start_link
controller |> Pipette.Client.start() |> Pipette.Client.call("John")
# => {:ok, "Hello John!"}
```

Now, let's make it a bit more useful, by telling Jane that John is waiting downstairs, while still greeting him. Telling Jane will take some time, due to the latency of the fictional communication channel we're using. In case John is ringing the bell at night, we let him know, that Jane is sleeping.

![](/images/2018-10-10-Introducing-Pipette/jane-john-example.png)

```elixir
defmodule TextHandler do
  def call(value, template: template) do
    String.replace(template, "___", value)
  end
end

defmodule NotifyHandler do
  def call(value) do
    Process.sleep(1000)
    IO.puts(value)
  end
end

defmodule DoorBellRecipe do
  use Pipette.Recipe

  # Stages
  @stage day_or_night: %Pipette.Stage{
    handler: {__MODULE__, :day_or_night}}

  @stage go_away: %Pipette.Stage{
    handler: {TextHandler, template: "It's night time ___, go away!"}}

  @stage generate_greeting: %Pipette.Stage{
    handler: {TextHandler, template: "Hello ___!"}}

  @stage generate_notification: %Pipette.Stage{
    handler: {TextHandler, template: "Hey Jane, ___ is waiting downstairs"}}

  @stage notify: %Pipette.Stage.Consumer{
    handler: NotifyHandler}

  # Subscriptions
  @subscribe day_or_night: :IN

  # - day
  @subscribe generate_greeting: {:day_or_night, :day}
  @subscribe OUT: :generate_greeting
  @subscribe generate_notification: {:day_or_night, :day}
  @subscribe notify: :generate_notification

  # - night
  @subscribe go_away: {:day_or_night, :night}
  @subscribe OUT: :go_away

  def day_or_night(name) do
    route = Enum.random([:day, :night])
    {route, name}
  end
end

{:ok, controller} = DoorBellRecipe.start_link
controller |> Pipette.Client.start() |> Pipette.Client.call("John")
# => {:ok, "Hello John!"}
# 1 second later: Hey Jane, John is waiting downstairs
# OR
# => {:ok, "It's night time John, go away!"}
```

These are just some simple examples. In more complex scenarios, the flow based
approach keeps the logic lean and clean. And with the Pipette test helpers, it's
easy to keep your code tested.

#### Credits

* Cover image: Photo from [cocoparisienne](https://pixabay.com/en/users/cocoparisienne-127419/) via [Pixabay](https://pixabay.com/en/drop-of-water-drip-raindrop-597109/)
* Charts: Generated by [yuml.me](https://yuml.me/diagram/scruffy/class/draw)
