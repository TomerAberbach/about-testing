---
style: |
  .columns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .columns code {
    font-size: 80%;
  }
  .columns > * {
    width: 50%;
  }
  .columns > * + * {
    margin-left: 30px;
  }
---

# About Testing

## Tomer Aberbach

Software Engineer @ Google

---

# But First, About Me

- Tomer Aberbach
- Software Engineer on Google Docs, Sheets, and Slides
- Office Location: NYC (but working from home)
- TCNJ Alum (CS Major & Math Minor)
- Hobbies and Interests
  - Coding side projects
  - Playing piano
  - Composing music
  - Crocheting!

![bg right 75%](https://avatars.githubusercontent.com/u/23299544)

---

# What is Software Testing?

Software testing is the process of evaluating and verifying that a software product or application does what it is supposed to do.

\- _IBM_

---

# Story Time

A software engineer has been tasked with writing some code that converts a `Color` enum to its RGB hex string.

```java
enum Color { 
  RED, GREEN, BLUE;

  public String getHex() {
    // TODO: do some coding mumbo jumbo
  }
}
```

---

# They Code and They "Test"

It works! ... But does it?

::: columns

```java
// Color.java
enum Color {
  RED, GREEN, BLUE;

  public String getHex() {
    String rgb = "";

    switch (this) {
      case RED:
        rgb = "#ff0000";
      case GREEN:
        rgb = "#00ff00";
      case BLUE:
        rgb = "#0000ff";
    }

    return rgb;
  }
}
```

```java
// ColorPrinter.java
public class ColorPrinter { 
  public static void main(String[] args) {
    System.out.println(Color.BLUE.getHex());
    //=> #0000ff
  }
}
```

:::

---

# Oops...

Feeling a little blue?

```java
public class ColorPrinter { 
  public static void main(String[] args) {
    System.out.println(Color.BLUE.getHex());
    //=> #0000ff

    System.out.println(Color.RED.getHex());
    //=> #0000ff

    System.out.println(Color.GREEN.getHex());
    //=> #0000ff
  }
}
```

---

# The Fix

```diff
enum Color {
  RED, GREEN, BLUE;

  public String getHex() {
    String rgb = "";

    switch (this) {
      case RED:
        rgb = "#ff0000";
+       break;
      case GREEN:
        rgb = "#00ff00";
+       break;
      case BLUE:
        rgb = "#0000ff";
+       break;
    }

    return rgb;
  }
}
```

---

# Testing to the Rescue!

Why do we test?

- To catch bugs _before_ delivering code to the user 
- Bugs can:
  - Be mildly inconvenient - _This link is broken!_
  - Cost money - _Ugh, I'll just download a different app!!_
  - Cause data loss or corruption - _My file didn't save!!!_
  - Result in privacy violations - _My private messages were leaked online!!!!_
  - Paint everything blue - _My eyes!!!!!_
  - etc.

---

# But How?

Use a testing framework! They vary, but they all have:

- _Test suites_, which consist of one or more...
- _Tests_, which consist of one or more...
- _Assertions_: code that _asserts_ some boolean expression is true

---

# JUnit

```java
// Just importing our testing framework
import static org.junit.Assert.assertEquals;
import org.junit.Test;

// Your first test suite: it's just a class!
public class ColorTest {
  // Your first test: it's just a method!
  @Test
  public void testGetHex_red() {
    Color color = Color.RED;

    String hex = color.getHex();

    // Your first assertion: it's just a method call!  
    assertEquals("#ff0000", hex);
    // What we expect ^      ^ What we actually computed
  }
}
```

---

# With Our Buggy Code

::: columns

```java
// Just importing our testing framework
import static org.junit.Assert.assertEquals;
import org.junit.Test;

// Your first test suite: it's just a class!
public class ColorTest {
  // Your first test: it's just a method!
  @Test
  public void testGetHex_red() {
    Color color = Color.RED;

    String hex = color.getHex();

    // Your first assertion: it's just a method call!  
    assertEquals("#ff0000", hex);
    // What we expect ^      ^ What we actually computed
  }
}
```

```java
1) testGetHex_red(ColorTest)
java.lang.AssertionError: expected:<"#ff0000"> but was:<"#0000ff">
  at org.junit.Assert.fail(Assert.java:88)
  ...

FAILURES!!!
Tests run: 1,  Failures: 1
```

:::

---

# With Our Fixed Code

::: columns

```java
// Just importing our testing framework
import static org.junit.Assert.assertEquals;
import org.junit.Test;

// Your first test suite: it's just a class!
public class ColorTest {
  // Your first test: it's just a method!
  @Test
  public void testGetHex_red() {
    Color color = Color.RED;

    String hex = color.getHex();

    // Your first assertion: it's just a method call!  
    assertEquals("#ff0000", hex);
    // What we expect ^      ^ What we actually computed
  }
}
```

```java
OK (1 test)
```

:::

---

# More Tests

::: columns

```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class ColorTest {
  @Test
  public void testGetHex_red() {
    Color color = Color.RED;

    String hex = color.getHex();

    assertEquals("#ff0000", hex);
  }

  @Test
  public void testGetHex_green() {
    Color color = Color.GREEN;

    String hex = color.getHex();

    assertEquals("#00ff00", hex);
  }

  @Test
  public void testGetHex_blue() {
    Color color = Color.BLUE;

    String hex = color.getHex();

    assertEquals("#0000ff", hex);
  }
}
```

```java
OK (3 tests)
```

:::

---

# Somewhat Frequently Asked Questions 

- _When should we write tests?_
- _How many tests should we write?_
- _When should we run tests?_
- _What makes a good test?_

---

# Somewhat Frequently Answered Questions

- _When should we write tests?_ 
  - Whenever we add new behavior to or change the existing behavior of the code! 
- _How many tests should we write?_
  - As many as it takes to give us confidence that the code works!
- _When should we run tests?_
  - On every code addition or change! (e.g. on every Git commit or pull request) Especially if it's a fix for a bug that the tests didn't catch!
- _What makes a good test?_
  - A good test is small, simple, and deterministic
  - Common pitfall: tests so complex that they practically need their own tests!

---

# Test Structure

::: columns

- _Arrange_ all necessary preconditions and inputs
- _Act_ on the object of method under test
- _Assert_ that the expected results have occured

```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class ColorTest {
  @Test
  public void testGetHex_red() {
    // Arrange
    Color color = Color.RED;

    // Act
    String hex = color.getHex();

    // Assert
    assertEquals("#ff0000", hex);
  }

  // ...
}
```

:::

---

# Testing Levels

::: columns

- Unit testing:
  - Tests that verify a small unit of code (e.g. a single method call)
- Integration testing
  - Tests that verify interaction between multiple components (e.g. multiple classes that call each other's methods)
- System testing:
  - Tests the entire system as a whole (e.g. open the software)

![](test-pyramid.png) _Image by Martin Fowler_

:::

---

# Can't Only Have Unit Tests!

![w:600](unit-vs-integration.gif)

---

# Test Doubles

How do we test code that uses production systems?

```java
public class MemeFetcher {
  private final MyDatabase database = new MyDatabase();

  public List<String> getMemeIds(String searchQuery) {
    return database.query("memes", searchQuery);
  }
}
```

Are we going to set up a whole database for our tests?

---

# Dependency Injection to the Rescue!

A fancy name for taking parameters! Usually interfaces or abstract classes.

```diff
public class MemeFetcher {
- private final MyDatabase database = new MyDatabase();
+ private final Database database;
+
+ public MemeFetcher(Database database) {
+   this.database = database;
+ }

  public List<String> getMemeIds(String searchQuery) {
    return database.query("memes", searchQuery);
  }
}
```

Pass in `MyDatabase` in production and `FakeDatabase` in tests!

---

# Test Suite Quality

How do we know if we have enough tests? And if our tests are good?

- **Coverage:** the percentage of code exercised by the test suite
- **Flakiness:** how often does the test randomly fail?
  - A test is _flaky_ if it randomly fails sometimes (without changing the code)
- **Mutation Tests:** automatic random modifying of your software code
  - What does it mean if the test suite still passes?
- **Regression Tests:** tests that catch regressions in behavior, frequently rgressions that have happened before
  - Are the same bugs going undetected over and over?

---

# Types of Tests

- Regression Testing
- Parameterized Testing
- Snapshot Testing
- Fuzz Testing
- Property-Based Testing
- Mutation Testing
- Compatibility Testing
- Smoke Testing
- Latency Testing
- Stress Testing

And there are many more!

---

# Thanks for Listening!

---

# Resources

::: columns

- Articles
  - [Google Testing Blog](https://testing.googleblog.com)
  - [Testing on the Toilet](https://testing.googleblog.com/search/label/TotT)
  - [Martin Fowler's Blog](https://martinfowler.com/testing)
  - [Mutation Testing](https://www.oracle.com/corporate/features/mutation-testing.html)

<br>

- Libraries and Frameworks
  - [JUnit](https://github.com/junit-team/junit4/wiki)
  - [Mockito](https://github.com/mockito/mockito) (for mocking)
  - [TestParameterInjector](https://github.com/google/TestParameterInjector) (for parameterized testing)
  - [JUnit QuickCheck](https://github.com/pholser/junit-quickcheck) (for property-based testing)
  - [PIT](https://github.com/hcoles/pitest) (for mutation testing)
  - [Selenium](https://github.com/SeleniumHQ/selenium) (for browser automation)

:::
