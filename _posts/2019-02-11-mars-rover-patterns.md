---
layout: post
name: 2019-02-11-mars-rover-patterns
title: Mars Rover Kata - Refactoring to Patterns
author: Simion Iulian Belea
tags:
- Kata
- Java
- Design Patterns
---
This article is an account of how I learned to apply patterns.

A kata is an exercise where you're given a specific set of rules and it can get as specific as having an isolated domain problem. This can be used to learn the useful concepts needed solving problems within that domain. Doing it repeatedly and attempting a different solution each time leads to a better understanding of how to solve that set of problems.

In this article I&#39;m going to go through the Mars Rover kata and how I used it kata to learn both classic test-driven development together with how to refactor things and also how to apply the Command and State design patterns. Applying patterns to such a simple problem is over-engineering. However, this provides a guide for learning about refactoring and to train a sense of where they can be applied it's a very good exercise.

I provide the commits following the red-green-refactor pattern as it&#39;s like the &quot;making of&quot; part of a movie. The metaphor of film editing has a good resemblance with the one of editing code. It can be useful to know about the different steps of the creative process than to just watch the end result if one&#39;s purpose is to learn about development process.

In part, it is inspired by two books, TDD By Example by Kent Beck and 4 Rules of Simple Design by Corey Haines.

In TDD by Example, Kent Beck walks the reader through a detailed description of the benefits and decision-making test by test, along with some design principles. He suggests making a to-do list of the test cases as a pointer towards what one wants to achieve. This illustrates the point of always having a plan and avoiding programming by coincidence. This book also teaches what tests to pick and which way to go depending on what the limits of the design are along the way. It also introduces the Value Object design pattern, as well as the red-green-refactor technique.

In 4 Rules of Simple Design, Corey Haines makes the distinction between testing for state and testing for behavior, as well as how tests drive design and the code design feeds back into how we further write the tests.

# Business rules and the first tests

One way to look at business rules is to split them in two categories: indicative, and optative. Indicative rules are specifications that don&#39;t change or are easy to change, like the dead and alive state for a cell in the Conway&#39;s Game of Life, or the world has a size in the case of Mars Rover.

Optative rules are the ones that change, and often contain &quot;if&quot; and &quot;should&quot; in the content of their formulation. These are the rules that we need to code for and that influence our design. The order in which one gets implemented also influences how we would design things. Depending on the kata it&#39;s often best to pick the simplest rule and start from there, especially when other rules depend on other rules to be implemented first. In other cases picking a different rule will lead to a different, and often original implementation of the exercise.

In the case of the this kata the indicative rules are the ones about the world size, as well as the number of commands. The optative rules are around the commands themselves.

You can click on the lines with the triangle to expand the code example.
<details>
  <summary>After a bit of debate we chose to test that the rover stays in the same position given an empty command. This sets the stage for the next test, as we decided to design changing the coordinate before designing the turning algorithm.
</summary>

```diff
+public class MarsRover {
+  public MarsRover(int x, int y, String cardinal) {}
+  public String execute(String commands) {
+    return null;
+  }
+}
```
```diff

+public class MarsRoverShould {
+  @Test
+  void return_initial_position_of_rover_without_any_command() {
+    final String emptyCommand = "";
+
+    assertThat(new MarsRover(1,2,"N").execute(emptyCommand)
+    is("1 2 N"));
+  }
+}
```
</details>

<details>
 <summary>Following TPP we return a literal as the simplest step to make the test pass.</summary>

```diff
  public String execute(String commands) {
-    return null;
+    return "1 2 N";
  }
}
```
</details>

<details>
<summary>We changed to a parameterized test as we&#39;re going to have very similar test cases and our intent would be more explicit.</summary>

```diff

- @Test
-  void return_initial_position_of_rover_without_any_command() {
+  @ParameterizedTest
+  @CsvSource({"1, 2, N, '1 2 N'"})
+  void return_initial_position_of_rover_without_any_command(int initialX, int initialY, String initialCardinal, String expectedCoordinate) {
    final String emptyCommand = "";
-    assertThat(new MarsRover(1,2,"N").execute(emptyCommand), CoreMatchers.is("1 2 N"));
+    assertThat(new MarsRover(initialX, initialY, initialCardinal).execute(emptyCommand), CoreMatchers.is(expectedCoordinate));
  }
```

</details>

<details> <summary>Decided that the simplest thing, and one that would take a bigger leap would be to return a variable. After that we also extracted the formatting of the String being displayed and kept it consistent with the business rules. We also decided the initial position would be injected in the constructor. </summary>

```diff

  @ParameterizedTest
-  @CsvSource({"1, 2, N, '1 2 N'"})
-  void return_initial_position_of_rover_without_any_command(int initialX, int initialY, String initialCardinal, String expectedCoordinate) {
+  @CsvSource({
    "1, 2, N, '1 2 N'",
    "1, 3, N, '1 3 N'"
  })
+  void return_initial_position_of_rover_without_any_command(
    int initialX, int initialY, String initialCardinal,
    String expectedCoordinate) {

    final String emptyCommand = "";
    final MarsRover rover = new MarsRover(initialX, initialY, initialCardinal);

    final String actualCoordinate = rover.execute(emptyCommand);

    assertThat(new MarsRover(initialX, initialY, initialCardinal).execute(emptyCommand), CoreMatchers.is(expectedCoordinate));
    assertThat(actualCoordinate, CoreMatchers.is(expectedCoordinate));
  }

```


```diff
public class MarsRover {
+  private final int x;
+  private final int y;
+  private final String cardinal;
  public MarsRover(int x, int y, String cardinal) {
+    this.x = x;
+    this.y = y;
+    this.cardinal = cardinal;
  }

  public String execute(String commands) {
-    return "1 2 N";
+    return formatCoordinate();
  }

+  private String formatCoordinate() {
+    return String.format("%d %d %s", x, y, cardinal);
  }
}

```
</details>

# Coding towards the first abstraction

At this point one can go either to start building the turning algorithm or the moving algorithm. We decided to go with the moving. Once we got that going the next dilemma was to either start wrapping around the world, the &quot;rainy&quot; path where we would need to start designing for an edge case or the &quot;happy&quot; path, to move in other directions.

We decided for the happy path. It introduces some duplication. That points to us that we could use an abstraction for moving the rover. In a larger context this is relevant for the user story one implements. Do we implement for something that is more &quot;deliverable&quot; and works straight away. This is something of immediate use to a product owner or the business. Going for the edge case would be making things more robust. So one important thing to take into account in the real-world is what the business needs at the moment and prioritize which feature gets implemented first.
<details> <summary>We come back to our initial decision to start testing for changing the coordinate given a direction. Initially the test fails and introducing a conditional in order to increment the Y variable, as well as refactored the command to a field.</summary>

```diff
public String execute(String commands) {
+    if(commands.equals(MOVE_COMMAND))
+         y++;
  return formatCoordinate();
}
```
```diff
+@ParameterizedTest
+  @CsvSource({
+    "1, 2, N, M, '1 3 N'",
+    "1, 3, N, M, '1 4 N'"
+  })
+  public void
+  move(
+    int initialX, int initialY, String initialCardinal,
+    String commands,
+    String expectedCoordinate
+  ) {
+    final MarsRover rover = new MarsRover(initialX, initialY,+ initialCardinal);
+
+    String actualCoordinate = rover.execute(commands);
+
+    assertThat(actualCoordinate, is(expectedCoordinate));
+  }
```
</details>

<details><summary>Test fails with multiple move commands so we decide to split the input and parse multiple commands.</summary>

```diff
@ParameterizedTest
  @CsvSource({
    "1, 2, N, M, '1 3 N'",
+    "1, 3, N, MM, '1 5 N'"
  })
```

```diff
public String execute(String commands) {
-    if(commands.equals(MOVE_COMMAND))
-      y++;
+    String[] individualCommands = commands.split("");

+    for (String command:individualCommands) {
+      if(command.equals(MOVE_COMMAND))
+        y++;
+    }
    return formatCoordinate();
  }
```

</details>

<details> <summary>We decide to duplicate the if condition so we can move towards the Southern direction.</summary>

```diff
@ParameterizedTest
  @CsvSource({
    "1, 2, N, M, '1 3 N'",
    "1, 3, N, MM, '1 5 N'"
+    "1, 3, N, MMMMM, '1 8 N'",
+    "1, 8, S, M, '1 7 S'",
  })
```

```diff
 for (String command:individualCommands) {
      if(command.equals(MOVE_COMMAND))
-        y++;
+        if(cardinal.equals("N"))
+          y++;
+        if(cardinal.equals("S"))
+          y--;
    }
```
</details>

<details>
<summary>Cleaning code
we refactor the North and South literals to fields</summary>

```diff
 for (String command:individualCommands) {
      if(command.equals(MOVE_COMMAND))
-        if(cardinal.equals("N"))
+        if(cardinal.equals(NORTH))
          y++;
-        if(cardinal.equals("S"))
+        if(cardinal.equals(SOUTH))
          y--;
    }
```
</details>

<details><summary>Clarifying intent for how we check direction by applying <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle">SRP</a></summary>

```diff
for(String command:individualCommands) {
      if(command.equals(MOVE_COMMAND))
-        if(cardinal.equals(NORTH))
+        if(facing(NORTH))
          y++;
-        if(cardinal.equals(SOUTH))
+        if(facing(SOUTH))
          y--;
 }
+ private boolean facing(String direction) {
+    return this.cardinal.equals(direction);
+  }
```
</details>

<details><summary>
Clarifying concepts around what is input and what is a command by renaming variables
</summary>

```diff
- public String execute(String commands) {
+ public String execute(String input) {

-    String[] individualCommands = commands.split("");
+    String[] commands = input.split("");

-    for (String command:individualCommands) {
+    for (String command:commands) {
```

</details>

<details><summary>Clarifying intent by extracting method that handles moving by applying <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle">SRP</a>
</summary>

```diff   
  if(isMove(command))
-        if(facing(NORTH))
-          y++;
-        if(facing(SOUTH))
-          y--;
+        move();
```

```diff
+private void move() {
+    if(facing(NORTH))
+      y++;
+    if(facing(SOUTH))
+      y--;
+  }
```
</details>

<details>
<summary>Cleaning code inside MarsRover - extracted coordinate formatting to field. Removing duplication and clarifying intent of moving vertically.</summary>

```diff
public class MarsRover {
+  private final int UP = 1;
+  private final int DOWN = -1;
+  private final String COORDINATE_FORMAT = "%d %d %s";
+  private String MOVE_COMMAND = "M";

public String execute(String input) {
  private void move() {
    if(facing(NORTH))
-      y++;
+      moveVertically(UP);
    if(facing(SOUTH))
-      y--;
+      moveVertically(DOWN);
  }
+  private void moveVertically(int stepSize) {
+    y += stepSize;
+  }
  private String formatCoordinate() {
-    return String.format("%d %d %s", x, y, cardinal);
+    return String.format(COORDINATE_FORMAT, x, y, cardinal);
  }
```
</details>
<details>
<summary>Implemented moving horizontally and extracted method that expresses intent for horizontal movements.</summary>

```diff
...
+  private final String EAST = "E";
+  private final int RIGHT = 1;
...
+ if(facing(EAST))
+      moveHorizontally(RIGHT);
...
+  private void moveHorizontally(int stepSize) {
+    x += stepSize;
+  }
```
</details>

<details>
<summary>Cleaning code - clarified how the String is split into individual characters.</summary>

```diff
+private final String INTO_CHARACTERS = "";
...
- for (String command:commands) {
+ for (String command : commandsFrom(input)) {

+  private String[] commandsFrom(String input) {
+    return input.split(INTO_CHARACTERS);
+  }  
```
</details>  
  
At this point we have a larger class that needs refactoring. So the decision at this point is whether one has enough for an abstraction for the moving logic or to continue in order to discover another pattern in the code. We decided to continue with implementing the turning logic as we could always come back at abstracting the moving into class that would know by itself which way to move.
<details>
<summary>Continuing by wrapping the coordinate logic into a class. We're using "Extract parameter object" from IntelliJ in order to automatically refactor the constructor to also use Coordinate in the test.</summary>

```diff
+class Coordinate {
+  private final int x;
+  private final int y;
+  private final String cardinal;
+
+  Coordinate(int x, int y, String cardinal) {
+    this.x = x;
+    this.y = y;
+    this.cardinal = cardinal;
+  }
+
+  public int X() {
+    return x;
+  }
+
+  public int Y() {
+    return y;
+  }
+
+  public String cardinal() {
+    return cardinal;
+  }
+}
```
```diff
-  public MarsRover(int x, int y, String cardinal) {
-    this.x = x;
-    this.y = y;
-    this.cardinal = cardinal;
+  public MarsRover(Coordinate coordinate) {
+    this.x = coordinate.X();
+    this.y = coordinate.Y();
+    this.cardinal = coordinate.cardinal();
+    this.coordinate = coordinate;
+  }
```
```diff
-    final MarsRover rover = new MarsRover(initialX, initialY, initialCardinal);
+    final MarsRover rover = new MarsRover(new Coordinate(initialX, initialY, initialCardinal));
```
</details>

<details>
<summary>Renamed Coordinate to Position</summary>

```diff
-class Coordinate {
+class Position {
```
</details>

<details>
<summary>Deleting the old implementation and delegating all coordinate responsibilities to the Position object</summary>

```diff

- private int x;
- private int y;
- private String cardinal;
  private Position position;


  private void moveVertically(int stepSize) {
-    position = new Position(x(), position.y()+stepSize, cardinal);
+    position = new Position(x(), position.y()+stepSize, position.cardinal());
  }
  private void moveHorizontally(int stepSize) {
-    position = new Position(position.x()+stepSize, position.y(), cardinal);
+    position = new Position(position.x()+stepSize, position.y(), position.cardinal());
  }
```
</details>

<details>
<summary>Adding failing test for turning right</summary>

```diff
+ @ParameterizedTest
+ @CsvSource({
+   "N, R, E",
+ })
+ void turn(
+   String initialCardinal,
+   String commands,
+   String expectedCardinal) {
+
+  final Position initialPosition = new Position(1, 1, initialCardinal);
+    final MarsRover rover = new MarsRover(initialPosition);

+  final String actualPosition = rover.execute(commands);

+  final String expectedPosition = "1 1 " + expectedCardinal;

+  assertThat(actualPosition, is(expectedPosition));
+}
```
</details>
<details>
<summary>Simplest thing to make the test pass</summary>

```diff
    for (String command : commandsFrom(input)) {
      if(isMove(command))
        move();
+      if(command.equals("R"))
+        position = new Position(position.x(), position.y(), "E");
    }
```
</details>

<details>
<summary>Refactored responsibility to Position</summary>


```diff
class MarsRover{
...
  if(command.equals("R"))
-        position = new Position(position.x(), position.y(), "E");
+        position = position.turn();
```

```diff
class Position{
...
+ public Position turn() {
+    return new Position(x, y, "E");
+ }

```

</details>
<details>
<summary>Implemented turning right twice. Repeating for all turning possibilities until both turning right and left are implemented.</summary>

```diff
Adding to the test

 @CsvSource({
    "N, R, E",
+    "N, RR, S",
  })
```

```diff
  public Position turn() {
-    return new Position(x, y, "E");
+    if(cardinal.equals("N"))
+        return new Position(x, y, "E");
+    return new Position(x,y,"S");
  }
```
</details>

<details>
<summary>Added test for both directions passing.</summary>

```diff
+  @ParameterizedTest
+  @CsvSource({
+    "1, 2, N, LMLMLMLMM, '1 3 N'",
+  })
+  public void
+  move_and_turn(
+    int initialX, int initialY, String initialCardinal,
+    String commands,
+    String expectedCoordinate
+  ) {
+    final Position initialPosition = new Position(initialX, initialY, initialCardinal);
+    final MarsRover rover = new MarsRover(initialPosition);
+
+    String actualCoordinate = rover.execute(commands);
+
+    assertThat(actualCoordinate, is(expectedCoordinate));
+  }
```

</details>

<details>
<summary>At this point there seems to be a good deal of feature envy between the Position object and the Mars Rover, so we rename Position to Rover and MarsRover to MarsRoverController.
</summary>

```diff
-public class MarsRover {
+public class MarsRoverController {
...
-class Position {
+class Rover {
```
</details>

<details><summary>Refactored to using immutability and renamed the Coordinate to Rover as it has behavior and Position would point to being just a wrapper.</summary>

```diff

class Rover {
-  private int x;
-  private int y;
-  private String cardinal;
+  private final int x;
+  private final int y;
+  private final String cardinal;
...

Rover move() {
    if(facing(SOUTH))
      return moveVertically(DOWN);
    if(facing(EAST))
-      moveHorizontally(RIGHT);
+      return moveHorizontally(RIGHT);
    if(facing(WEST))
-      moveHorizontally(LEFT);
+      return moveHorizontally(LEFT);
    return this;
}
...

  private Rover moveVertically(int stepSize) {
-    return new Rover(x, y+=stepSize, cardinal);
+    return new Rover(x, y + stepSize, cardinal);
  }

-  private void moveHorizontally(int stepSize) {
-    x+=stepSize;
+  private Rover moveHorizontally(int stepSize) {
+    return new Rover(x + stepSize, y, cardinal);
  }

```
</details>

# Refactoring to State and Command patterns
We decided to abstract the Cardinal switching details in a self contained class. Delegating a call to its own right() and left() methods would make use of the State pattern and lets the cardinal manage the switching. In a way looks like a water molecule that has one big atom in the middle and two neighboring ones to its left and right. Naming the Cardinal State subtype methods to left() and right() distances the implementation from turning and makes it more reusable in another context. It makes the switch go away, and also puts the responsibility of switching state to the cardinal and not to the rover. The cognitive load of the class is lesser because before the refactoring the Rover class had to know about all the mappings and now the mappings are self-contained.

<details><summary>The Cardinal interface with implementations and tests for its behavior. Each cardinal point is self containing, knowing only of it's right and left coordinate.</summary>

```diff
+public interface Cardinal {
+  public Cardinal left();
+  public Cardinal right();
+  public String name();
+}
```
```diff
+public class North implements Cardinal{
+  private String name = "N";
+  public Cardinal left() { return new West();}
+  public Cardinal right() { return new East();}
+}
+public class South implements Cardinal{
+  private String name = "S";
+  public Cardinal left() { return new East();}
+  public Cardinal right() { return new West();}
+}
+public class East implements Cardinal{
+  private String name = "E";
+  public Cardinal left() { return new North();}
+  public Cardinal right() { return new South();}
+}
+public class West implements Cardinal{
+  private String name = "W";
+  public Cardinal left() { return new South();}
+  public Cardinal right() { return new North();}
+}
```

```diff
+public class EastCardinalShould {
+  @Test
+  void be_facing_south_when_turned_right() {
+    final Cardinal actual = new East().right();
+    assertThat(actual, is(new South()));
+  }
+  @Test
+  void be_facing_north_when_turned_left() {
+    final Cardinal actual = new East().left();
+    assertThat(actual, is(new North()));
+  }
+  @Test
+  void give_cardinal_name() {
+    final String actual = new East().name();
+    assertThat(actual, is("E"));
+  }
+}
+public class NorthCardinalShould {
+  @Test
+  void be_facing_east_when_turned_right() {
+    final Cardinal actual = new North().right();
+    final Cardinal expected = new East();
+    assertThat(actual, is(expected));
+  }
+  @Test
+  void be_facing_west_when_turned_left() {
+    final Cardinal actual = new North().left();
+    final Cardinal expected = new West();
+    assertThat(actual, is(expected));
+  }
+  @Test
+  void give_cardinal_name() {
+    final String actual = new North().name();
+    assertThat(actual, is("N"));
+  }
+}
+public class SouthCardinalShould {
+  @Test
+  void be_facing_east_when_turned_right() {
+    final Cardinal actual = new South().right();
+    assertThat(actual, is(new West()));
+  }
+  @Test
+  void be_facing_west_when_turned_left() {
+    final Cardinal actual = new South().left();
+    assertThat(actual, is(new East()));
+  }
+  @Test
+  void give_cardinal_name() {
+    final String actual = new South().name();
+    assertThat(actual, is("S"));
+  }
+}
+public class WestCardinalShould {
+  @Test
+  void be_facing_north_when_turned_right() {
+    final Cardinal actual = new West().right();
+    assertThat(actual, is(new North()));
+  }
+  @Test
+  void be_facing_south_when_turned_left() {
+    final Cardinal actual = new West().left();
+    assertThat(actual, is(new South()));
+  }
+  @Test
+  void give_cardinal_name() {
+    final String actual = new West().name();
+    assertThat(actual, is("W"));
+  }
+}
```
</details>

<details><summary>Refactoring to use the Cardinal in the constructor and to initialize using a factory method in the test. Replacing string with Cardinal class in the Rover</summary>

```diff
-  Rover(int x, int y, String cardinal) {
+  Rover(int x, int y, Cardinal cardinal) {
```

```diff
MarsRoverShould
...
-    final Rover initialRover = new Rover(initialX, initialY, initialCardinal);
+    final Rover initialRover = new Rover(initialX, initialY, cardinalFor(initialCardinal));
...

+  Cardinal cardinalFor(String cardinal) {
+    if (cardinal.equals("N"))
+      return new North();
+    if (cardinal.equals("E"))
+      return new East();
+    if (cardinal.equals("S"))
+      return new South();
+    return new West();
+  }

```

</details>

<details><summary>Delegating moving logic to be self-contained in the Cardinal. Shadowing the implementation along the old one in each of the conditions until we can have a unique call and all the tests are passing with the refactored call.</summary>

```diff
public interface Cardinal {
  Cardinal left();
  Cardinal right();
+  Rover move(int x, int y);
  String name();
}
```
```diff
public class North implements Cardinal {
  private final int stepSize = 1;
  private String name = "N";
...
+  @Override
+  public Rover move(int x, int y) {
+    return new Rover(x, y + stepSize, this);
+  }
```

```diff
public class Rover {
  ...
  if(facing(NORTH))
-      return moveVertically(UP);
+      return cardinal.move(x,y);
```
</details>

It also 

<details><summary>Full refactor of Rover into polymorphic call for cardinal with state pattern. Renaming MarsRover to MarsRoverController and Cardinal to Rover The code is easier to follow and read.</summary>

```diff
-public MarsRover(Cardinal cardinal) {
+public MarsRoverController(Rover rover) {

-public Cardinal
+public Rover

-public class East extends Cardinal {
+public class RoverFacingEast extends Rover {

-public class North extends Cardinal {
+public class RoverFacingNorth extends Rover {

-public class West extends Cardinal {
+public class RoverFacingWest extends Rover {

-public class South extends Cardinal {
+public class RoverFacingSouth extends Rover {

```

</details>

<details><summary>Cleaning up code, moving things locally for readability and to keep things close to where the behavior is implemented</summary>

```diff
public class MarsRoverController {
-  private final String MOVE_COMMAND = "M";
-  private final String RIGHT_COMMAND = "R";
-  private final String LEFT_COMMAND = "L";
-  private final String INTO_CHARACTERS = "";
...
  private boolean isTurnLeft(String command) {
+    String LEFT_COMMAND = "L";
    return command.equals(LEFT_COMMAND);
  }
  private boolean isTurnRight(String command) {
+    String RIGHT_COMMAND = "R";
    return command.equals(RIGHT_COMMAND);
  }
  private boolean isMove(String command) {
+    String MOVE_COMMAND = "M";
    return command.equals(MOVE_COMMAND);
  }
  private String[] commandsFrom(String input) {
+    String INTO_CHARACTERS = "";
    return input.split(INTO_CHARACTERS);
  }
```

</details>

<details><summary>The last step is to show the use of the Command pattern by abstracting away the calls of command execution into command objects. We use a Command interface and a CommandFactory. Started refactoring invocation to commands instead of the controller. Shadowing to check for tests are still passing with the new refactor.</summary>

```diff
interface Command {
  Rover execute();
}
```

```diff
public class CommandFactory {
  private Rover rover;
  public CommandFactory(Rover rover) {
    this.rover = rover;
  }
  public Command commandFrom(String command) {
    if(command.equals("M")) {
      return new MoveCommand(rover);
    }
    if(command.equals("R")) {
      return new TurnRightCommand(rover);
    }
    throw new UnsupportedOperationException();
  }
}
```

```diff
public class MarsRoverController {
  private Rover rover;
  public MarsRoverController(Rover rover) {
    this.rover = rover;
  }
  public String execute(String input) {
    for (String command : commandsFrom(input)) {
-      if(isMove(command))      rover = rover.move();
+      if(isTurnRight(command)) rover = rover.right();
      if(isMove(command))
      {
//        rover = rover.move();
+        rover = new CommandFactory(rover).commandFrom(command).execute();
      }
+      if(isTurnRight(command)) {
+        rover = new CommandFactory(rover).commandFrom(command).execute();
+      }
      if(isTurnLeft(command))  rover = rover.left();
    }
    return rover.formatPosition();
```

</details>

<details><summary>Final touch: moving commands into their own folder, changing the conditional to use a HashMap to store the commands and naming the command Strings accordingly.</summary>

```diff
public class CommandFactory {
+  private static final String MOVE = "M";
+  private static final String LEFT = "L";
+  private static final String RIGHT = "R";
+  private static final String EMPTY = "";
+  private Map<String, Command> commands;

  public CommandFactory(Rover rover) {
+   initializeCommands(rover);
  }
  public Command commandFrom(String command) {
-    if(command.equals("M")) {
-      return new MoveCommand(rover);
-    }
-    if(command.equals("R")) {
-      return new TurnRightCommand(rover);
-    }
-    throw new UnsupportedOperationException();
+   return commands.get(command);
  }
```

```diff
+  private void initializeCommands(Rover rover) {
+    commands = new HashMap<String,Command>(){{
+      put(MOVE, new MoveCommand(rover));
+      put(LEFT, new TurnLeftCommand(rover));
+      put(RIGHT, new TurnRightCommand(rover));
+      put(EMPTY, new EmptyCommand(rover));
+    }};
  }
```
</details>