# Pitfalls of the Singleton Bean

A Spring bean. Sounds relatively harmless, doesn't it? What if I told you that this could be the source of many headaches in web servers, especially if you are new to Spring development. However, if you're a more seasoned Java developer, then you would be aware of the restless nights debugging your code for hours only to discover that the dreaded bug was a **race condition**.

## What is a Race Condition?

In short, a race condition is when we have simultaneous access from multiple threads/processes on the same resource without some mechanism to process the requests synchronously. This access is fine when all of the requests are only **reads**, but it quickly becomes hell when you throw **writes** into the mix.

This can be illustrated with a simple example of multiple developers working on the same project. As a software engineer, you would typically work in a team with at least several other people. Sometimes you may all be working on the same file -- adding new features, bugs, and whatnot.

Like any good team, you all agreed to use some version control system like Git rather than passing around zip files like a bunch of heathens to manage your codebase and avoid any conflicts. The three developers, Alice, Bob, and Eve, work on the same file modifying different functions. Alice finds that the implementation of her new feature needs to modify some existing method named `foo()`. Eve also runs into the same requirement and does the same. Bob, on the other hand, is busy on a side quest to fix his build issues.

Eve finishes modifying the file and sends out a pull request with the modified `foo()` method. Bob frustrated with the lack of progress in fixing his issue reviews the code and gives it a thumbs up. Code gets shipped. Alice had lost track time and is in a rush to ship the feature before midnight. Without any pull request, she pushes straight to production. Luckily given how smart Git is, Git will detect a conflict on push and refuses to add her change in. Alice sees this, rebases, and makes a good decision to call Bob at midnight to review her code before pushing.

Now, imagine that this version control system is gone. The world descends to chaos as Alice's very important change overwrites Eve's work producing unexpected behavior as the latest `push` is always treated as the source of truth.

In this situation, Git acts as the **synchronization** mechanism that prevents concurrent writes by keeping track of events and having them be processed in some sort of fashion -- in this case chronological order. In principle, locks and semaphores serve the same purpose in blocking access to all but a single thread if these threads are designed to manipulate data.

## Spring Beans and You

Taken straight from their website,

> The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.

Now a popular variant of the Spring Framework is Spring Boot, a framework that enables developers to create production-grade backend web applications. One of the [main tenets](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/overview.html) of Spring is its use of dependency injection at its core. Classes are typically created as *beans*, which serve as the [backbone](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html#:~:text=In%20Spring%2C%20the%20objects%20that,many%20objects%20in%20your%20application.) of your Spring application. Following its main tenet of dependency injection, beans are created with the *singleton* scope by default -- meaning that only one copy of a class is instantiated for the lifecycle of the application. Of course, there are many other types of scopes, but we will focus on the singleton scope today.

![Bean Lifecycle](https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/htmlsingle/images/singleton.png)

*Depiction of Spring Bean life cycle taken from [documentation](https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/htmlsingle/#beans-factory-scopes-singleton).*

So why does it matter if it is a singleton?

This property matters when you have to handle multiple sources that may be accessing it, especially if web requests are made to modify the state of the singleton bean. *Side note: Please do not make your Spring beans stateful, it will save you a lot of headaches along the way*. For this scenario, however, **let's say you must maintain some state in your Spring bean.**

The question is, how would a singleton bean handle requests from multiple users? To accomplish this like most web servers, another handler, in this case, a thread, is spawned to serve a request made by a single user. In other words, if two users are making a call to your API, one to the `/register` endpoint and the other to the `/login` endpoint, Spring will spawn two separate threads to handle these calls. If we have a singleton bean acting as our controller, then both requests will be handled by that bean. This becomes a pain point when we have multiple simultaneous calls to the same endpoint that updates the same variable in a non-thread-safe manner.

With the possibility of simultaneous calls with mutable state, Spring Beans are **not thread-safe** inherently.

## An Example

As mentioned before, let's use a very basic stateful bean as our example (basically a Java bean that as instance variables). I went ahead and created a [sample project](https://github.com/Spiderpig86/Spring-Bean-Singleton) to demonstrate a couple of concepts that I will be discussing in the coming sections. The project itself is a simple Spring Boot project with a few endpoints that manipulate data inside our `DataFacade.java` class.

For our first API, I will focus on the `/increment` API which returns a strictly increasing number to each user. We *guarantee* that no two persons calling the endpoint will have the same number:

```java
// DataController.java snippet
@RestController
public class DataController {
    @RequestMapping("/increment")
    private int incrementEndpoint() {
        return dataFacade.increment();
    }
}

// DataFacade.java snippet
@Component
@Scope("singleton")
public class DataFacade {
    private int counter;
    public int increment() {
        return ++this.counter;
    }
}

```

In short, our `DataController` bean stores `counter` as an instance variable and is modified by the `increment()` method. By itself, the class doesn't seem to do much and not much can go wrong with it. You fire up the Spring application, hit the `localhost:8080/increment` endpoint, and you see `1` gets returned. You call it again and receive a `2` and so on.

What's the big deal here?

![	 ](https://i.redd.it/5tbj9d5q0z431.jpg)

Let's say we launch this amazing API that guarantees no two persons get the same number generated, gets featured on Product Hunt, and then gets 12,000 daily active users making on average 500 calls per day each, meaning 6,000,000 total calls per day to this endpoint. If we do the math, the API will on average serve (6,000,000 calls per day / 86,400 seconds per day) = 69.44... transactions per second. The users eventually find out that some have received the same number and get pissed off. *What the hell happened?*

What happened was a classic race condition. With a load of ~69 TPS, there is a high chance that multiple users could be calling `/increment` at the same time with the chance of reading stale data and incrementing with the wrong number. If the counter was at 5 and Alice and Bob call `/increment` at the same time, then there is a good chance that both will receive 6 when they should be different. 

![Race condition](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Pitfalls%20of%20the%20Singleton%20Bean/Race%20Condition%20Order.png)

The value of `counter` is also dependent on the last call that updated its value. In the diagram above, if we had 3 threads incrementing the value in `counter` around the same time, then there is a chance that all these threads read `counter` as 5, and all end up setting the value at 6 -- which is incorrect. What we should expect is some decision made (usually based on chronological order) for thread A and B to execute it. Thread C will have to wait until both threads A and B are done with updating the variable before it can execute. The expected value for `counter` is supposed to be 8.

Since we only have a single copy of our `DataFacade`, every single thread accessing the `counter` variable is concurrently modifying its value. Recall that Spring spawns a separate thread for each user accessing the endpoint. Spring offers 0 safeguards to ensure thread safety.

Let's test this using our [sample project](https://github.com/Spiderpig86/Spring-Bean-Singleton).

First, clone the project to some directory on your machine. Open the directory in your terminal and run `git checkout race-conditions` the view error-prone code.

Then, open the project in an IDE of your choice (IntelliJ is preferred) and run the project. Once started, you should be able to access `localhost:8080/increment`.

Next, open up your terminal and navigate to our test script called `spammer.py` and run the following command. 

```sh
python spammer.py
```

The script will spawn 4 threads and make 50 calls each to the `/increment` endpoint. You can change these if you'd like.

Once the script finishes, the expected value for `counter` is 200 if 4 threads each make 50 calls without any repeating numbers. However, notice that the counter fell short of 200 (176 in our case). The concurrent modification of `counter` is evinced by the appearance of repeating numbers in our log (for example below, 174).

```
...
Thread 0 - 162
Thread 1 - 163
Thread 3 - 164
Thread 1 - 165
Thread 0 - 166
Thread 3 - 168
Thread 2 - 167
Thread 1 - 169
Thread 3 - 171
Thread 0 - 170
Thread 2 - 172
Thread 0 - 173
Thread 1 - 174
Thread 2 - 174
Thread 3 - 175
Thread 1 - 177
Thread 2 - 176
```

The next section discusses solutions to this issue and changes we can make to the existing code in the project.

## Making the Bean Thread-Safe

Going back to our previous point, singleton beans are **not inherently thread safe**. This is because these beans run for the entire lifetime of the application and many HTTP(S) requests are made from different users at the same time.

So how can we fix that?

#### Request Scoping

The **request scope** is a web-aware ApplicationContext in Spring that creates a new bean instance for every single HTTP request. This scope can be extremely helpful for maintaining some sort of state for that request if that bean will be passed on to many different handlers down the chain. For instance, if your state is stored in some bean, you can add the `@RequestScope` annotation such that the bean will get created on each HTTP request.

```java
@Bean
@RequestScope
public DataFacade getDataFacade() {
    // ...
}
```

On the surface, making every single bean you use request scoped sounds like a great idea. However, is creating a new bean for every single request really that efficient? Do you need all of your beans to be thread-safe?

In general, having to create a new bean will add overhead that will slow down your application's performance. Whether if you want all your beans to be thread-safe is also up to you, but most of the time you also wouldn't need every bean to be thread-safe.

#### Thread-Safe Variables

Let's say you have no other option but to keep your bean stateful. Although Spring will not handle synchronization and concurrent modification issues, you can handle it yourself. There are a couple of options on how to do it in Java:

* **Synchronized blocks** - the `synchronized` keyword is a handy way to restrict access to shared resources to only a single thread at a time. You can apply this keyword on either a **method** or an object. Either way, the JVM knows that once a thread acquires a lock to execute code within a synchronized block, all other threads must be suspended. When the lock is released, then the next thread in line can access. Note that the variables accessed by multiple threads must be declared with the `volatile` keyword to ensure changes to one thread are immediately reflected to the other threads.

  With regards to our example project, we can add the `synchronized` keyword to the calling method and the `volatile` keyword to our integer. Both keywords will not work correctly without the other.

  ```java
  private volatile int counter;
  // ...
  public synchronized int increment() {
      return ++this.counter;
  }
  ```

  With the `synchronize` and `volatile` keywords in place, we should see this output. Although the output may not be in order (which is still fine), we reach 200 with our counter without any repeated values.

  ```
  ...
  Thread 1 - 185
  Thread 2 - 184
  Thread 0 - 186
  Thread 3 - 187
  Thread 1 - 188
  Thread 2 - 189
  Thread 3 - 191
  Thread 0 - 190
  Thread 2 - 192
  Thread 1 - 193
  Thread 3 - 194
  Thread 0 - 195
  Thread 1 - 197
  Thread 2 - 196
  Thread 3 - 199
  Thread 0 - 198
  Thread 1 - 200
  ```

  The one point of concern with synchronization, however, is its performance impact. Synchronization does take time to process and having all the requests be queued up and processed one at a time rather than concurrently will slow down response times.

* **Synchronized Collections** - using the `synchronized` keyword in the encapsulating block is not enough to prevent race conditions for Java collections. To ensure synchronous access to your collection, the Java collections framework ships with different wrapper methods that transform your collection into its thread-safe version. You can read a great synopsis by [Baeldung](https://www.baeldung.com/java-synchronized-collections) for all the different wrapper classes you can use.

  ```java
  public Set<String> toSynchronizedSet(final Set<Integer> numbers) {
      return Collections.synchronizedSet(numbers);
  }
  ```

  In our sample project, the other endpoint that needs fixing is the `/addstring` endpoint. I'll leave that as an exercise for you to fix... or just copy the code from `master`.

* **Atomic Variables** - according to [Oracle's documentation](https://docs.oracle.com/javase/8/docs/api/?java/util/concurrent/atomic/package-summary.html), the `java.util.concurrent.atomic` package is a *small toolkit of classes that support lock-free thread-safe programming on single variables*. Atomic variables have a lot of utility methods that perform comparisons, increment/decrement, accumulation, etc. without needing to specify `synchronized` and `volatile` blocks and variables respectively.

  In our `/increment` endpoint, the `counter` can be replaced with an `AtomicInteger`.

  ```Java
  private AtomicInteger counter;
  
  public DataFacade() {
      this.counter = new AtomicInteger(0);
  }
  
  public int increment() {
      return this.counter.incrementAndGet();
  }
  ```

#### Completely Stateless

This may be a cop-out answer, but a fool-proof solution to this problem is to never maintain state inside the bean to begin with. This means that your mean would contain any fields, but it is uncommon for developers to build classes like this. However, you can still achieve statelessness in your bean if the execution of its methods does not alter its instance variables. There would be no need to worry about the synchronization of variables, access patterns, and cleaner code. Local variables within methods, however, are not affected by this as these local variables are allocated in the stack and only accessed within the scope of that method.

As a side note, `final` variables can also be included while still maintaining statelessness, but with a catch. A final `String`, `int`, or `boolean` may work fine, but a final `List`, `Set`, or `Collection` will not. Elements of these collection classes can still be changed during code execution which adds state. JDK 9 introduced [immutable versions](https://docs.oracle.com/javase/9/core/creating-immutable-lists-sets-and-maps.htm#JSCOR-GUID-DD066F67-9C9B-444E-A3CB-820503735951) of these collections, but they must be used with a bit of caution. Objects are not automatically immutable when stored in these collections, only the collection itself is.

## Conclusion

The takeaway from all this is that working with singleton beans in a multi-threaded environment without the right mechanisms to ensure thread safety can be an absolute nightmare to debug. Even if it is possible to add thread-safety to your instance variables in the singleton bean itself, the cleaner option may be to only keep constant instance variables and move all changing variables into local methods or other classes that are created on a per-request basis. I hope this post brought greater insight on some of the dangers in maintaining state in your singleton Spring beans.