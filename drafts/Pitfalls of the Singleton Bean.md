# Pitfalls of the Singleton Bean

A Spring bean. Sounds relatively harmless doesn't it? What if I told you that this could be the source of many headaches in web servers, especially if you are new to Spring development. However if you're a more seasoned Java developer, then you would be aware of the restless nights debugging your code for hours only to discover that the dreaded bug was a **race condition**.

## What is a Race Condition?

In short, a race condition is when we have simultaneous access from multiple threads/processes on the same resource without some mechanism to process the requests synchronously. This access is fine when all of the requests are only **reads**, but it quickly becomes hell when you throw **writes** into the mix.

This can be illustrated with a simple example of multiple developers working on the same project. As a software engineer, you would typically work in a team with at least several other people. Sometimes you may all be working on the same exact file -- adding new features, bugs, and what not.

Like any good team, you all agreed to use some version control system like Git rather than passing around zip files like a bunch of heathens to manage your code base and avoid any conflicts. The three developers, Alice, Bob, and Eve, work on the same file modifying different functions. Alice decides that the implementation of her new feature needs to modify some existing method named `foo()`. Eve also runs into the same issue and does the same. Bob, on the other hand, is busy on a side quest to fix his build issues.

Eve finishes modifying the file and sends out a pull request with the modified `foot()` method. Bob frustrated with the lack of progress in fixing his issue reviews the code and gives it a thumbs up. Code gets shipped. Alice had lost track time and is in a rush to ship the feature before midnight. Without any pull request, she pushes straight to production. Luckily given how smart Git is, Git will detect a conflict on push and refuses to add her change in. Alice sees this, rebases, and makes a good decision to call Bob at midnight to review her code before pushing.

Now, imagine that this version control system is gone. The world descends to chaos as Alice's very important change overwrites Eve's work producing unexpected behavior.

In this situation, Git acts as the **synchronization** mechanism that prevents concurrent writes by keeping track of events and having them be processed in some sort of fashion -- in this case chronological order. In principal, locks and semaphores serve the same purpose in blocking access to all but a single thread if these threads are designed to manipulate data.

## Spring Beans and You

Taken straight from their website,

> The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.

Now a popular variant of the Spring Framework is Spring Boot, a framework that enables developers to create production-grade backend web applications. One of the [main tenets](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/overview.html) of Spring is its use of dependency injection at its core. Classes are typically created as *beans*, which serve as the [backbone](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html#:~:text=In%20Spring%2C%20the%20objects%20that,many%20objects%20in%20your%20application.) of your Spring application. Following its main tenet of dependency injection, beans are created with the *singleton* scope by default -- meaning that only one copy of a class is instantiated for the lifecycle of the application. Of course there are many other types of scopes, but we will focus on the singleton scope today.

![Bean Lifecycle](https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/htmlsingle/images/singleton.png)

*Depiction of Spring Bean life cycle taken from [documentation](https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/htmlsingle/#beans-factory-scopes-singleton).*

So why does it matter if it is a singleton?

This property matters when you have to handle multiple sources that may be accessing it, especially if web requests are made to modify the state of the singleton bean. *Side note: Please do not make your Spring beans stateful, it will save you a lot of headaches along the way*. For this scenario, however, **let's say you must maintain some state in your Spring bean.**

The question is, how would a singleton bean handle requests from multiple users? To accomplish this like most web servers, another handler, in this case a thread, is spawned to serve a request made by a single user. In other words, if there are two users making a call to your API, one to the `/register` endpoint and the other to the `/login` endpoint, Spring will spawn two separate threads to handle these calls. Because a Spring bean is an object, it resides in the heap which makes it accessible to threads.

## An Example

As mentioned before, let's use very basic stateful bean as our example (basically a Java bean that as instance variables). This API is designed to return an always incrementing number to the user and we *guarantee* that no one will have the same integer returned to them:

```java
@RestController
public class Controller {
    private int counter = 0;
    // ...
    
    @PostMapping("/increment")
    private int increment() {
        return ++counter;
    }
}
```

In short, this bean stores `counter` as an instance variable and is modified by the `increment()` method. By itself, the class doesn't seem to do much and not much can go wrong with it. You fire up the Spring application, hit the `localhost:8080/increment` endpoint, and you see `1` gets returned. You call it again and receive a `2` and so on.

What's the big deal here?

![	 ](https://i.redd.it/5tbj9d5q0z431.jpg)

Now let's say that this API does get launched, gets featured on Product Hunt, and gets 12,000 daily active users making on average 500 calls per day each, meaning 6,000,000 total calls per day to this endpoint. If we do the math, the API will on average serve (6,000,000 calls per day / 86,400 seconds per day) = 69.44... transactions per second. Not everyone ends up getting a unique number and everyone is pissed off that the API failed on its promise. *What the hell happened?*

What happened was a classic race condition. With a load of ~69 TPS, there is a high chance that multiple users could be calling `/increment` at the same time with the chance of reading stale data and incrementing with the wrong number.

[DrawIO Race condition diagram with API]

If the counter was at 5 and Alice and Bob call `/increment` at the same time, 