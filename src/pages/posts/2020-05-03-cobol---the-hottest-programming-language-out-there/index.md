---
path: "/cobol---the-hottest-programming-language-out-there"
date: "2020-05-03T22:42:50.477Z"
title: "COBOL — The Hottest Programming Language Out There"
description: "COBOL is the past, present, and future."
image: './blank.jpg'
tags: ['cobol','programming','code','tutorial']
---

Hey you.

Do you wanna be a software engineer?

Do you wanna work with one of the most in-demand and bleeding-edge technologies out there?

Do you wanna create lots of **POSITIVE IMPACT** and **SOCIAL CHANGE**?

Do you wanna live life in the **fast lane**?

Well, I got the language for you if you wanna dance like it's 1959 again. Introducing COBOL, the language that makes C look like child's play.

## What is it?

COBOL, or **Co**mmon **B**usiness-**O**riented **L**anguage, is a highly-verbose compiled language designed to run on mainframes powered by operating systems like z/OS from IBM. Designed in 1959, it was heavily inspired by the FLOW-MATIC language designed by Grace Hopper which features the same imperative and verbose syntax. The sole purpose of the language is to handle massive amounts of throughput in industries including airline ticketing, insurance claims, banking, and unemployment claims.

So you might be wondering, why are we relying on such an old language to process business-critical transactions that affect millions of people? It is certainly not popular as indicated by its low ranking in the [TIOBE Index](https://www.tiobe.com/tiobe-index/) and with the advent of new/established languages such as Java, Python, and Go, new programmers have little reason to explore the world of COBOL.

The interest to upgrade and change is there, but businesses that rely on COBOL are stuck between a rock and a hard place. First, the cost of replacing all of the existing infrastructure and code base with a newer language can be very time consuming and costly. In 2012, the Commonwealth Bank of Australia took on this [herculian task to transition its systems from COBOL to SAP ABAP](https://www.reuters.com/article/us-usa-banks-cobol/banks-scramble-to-fix-old-systems-as-it-cowboys-ride-into-sunset-idUSKBN17C0D8). In total, the update took 5 whole years, 1 billion Australian dollars (USD 749 million), and the assistance of 2 other companies (Accenture and SAP). Upgrading isn't impossible, it's just extremely costly.

According to [Reuters](http://fingfx.thomsonreuters.com/gfx/rngs/USA-BANKS-COBOL/010040KH18J/index.html), it seems that COBOL won't be going anywhere anytime soon. Also with the lack of COBOL developers to help with the migration, it looks like these systems would be here to stay for years to come. With the Coronavirus outbreak, the lack is more apparent than ever as unemployment processing systems in New Jersey were failing under the spike in unemployment claims. It's not that the system was failing its job, but the changing environment has made it inadequate.

> "We have systems that are 40-plus years old. There’ll be lots of postmortems, and one of them will be *how the heck did we get here?,* when we literally needed COBOL programmers." - Gov. Murphy of New Jersey

When I first heard him say this on the news, I thought it was a joke. I initially thought that a majority of our systems would've at least been upgraded to something newer, but I guess I was just uninformed.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Unexpected <a href="https://t.co/A00tViNxJt">pic.twitter.com/A00tViNxJt</a></p>&mdash; michael_nielsen (@michael_nielsen) <a href="https://twitter.com/michael_nielsen/status/1246577382347034625?ref_src=twsrc%5Etfw">April 4, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

If COBOL is trending on Twitter, then you know it's serious.

## Hello COBOL

Now that I've got you on board, time to teach you to become a full-fledge COBOL developer. So now, we will start with the most important step to becoming a COBOL developer, writing "hello world".

But before that, we need to do a couple of things to get it up and running on your machine. For this guide, I will be using Ubuntu. This should work the same on the Windows WSL with Ubuntu.

First, we need to install a COBOL compiler. For this, we will be installing `open-cobol`.

```bash
sudo apt-get install open-cobol
```

Now, we can begin writing our program. If you were to ask me what the program structure looks like, it is a cross of MIPS Assembly and FORTRAN. 

We start with different sections of the program. The `IDENTIFICATION DIVISION` is used to store program properties and the `PROCEDURE DIVISION` stores the functionality. Inside the `PROCEDURE DIVISION`, we will use the `DISPLAY` command to directly write to the screen. To end the program, we add the `STOP RUN` command at the end, much like adding `li $v0, 10` in MIPS.

Open a new file in any editor and call it `hello.cob`. `*.cob` or `*.cbl` are file extensions for Cobol source files.

```cobol
000000*> My first COBOL program.
000100 IDENTIFICATION DIVISION.
000200*> Identifies the name of the program
000300 PROGRAM-ID. HELLO_WORLD.
      
      *> Instructions go here
      PROCEDURE DIVISION.
        DISPLAY 'Hello from COBOL :)'.
        STOP RUN.
```

You may have noticed a couple of things about the code itself. The first 6 digits are reserved for line numbers that increment `100` per line. Comments are defined with `*>`. Each program statement ends with a period, much like the English.

To compile this program, simply use `cobc`:

```bash
cobc -x hello.cob
```

The compiler should generate an executable file that you can simply execute with:

```bash
./hello
```

And there you have it, your first Cobol program!

## Aspects of the Language

This will be a quick overview of different aspects of the programming language. If you're interested, I recommend taking a look at the references I used to understand the language. Surprisingly, the documentation isn't too bad.

### Program Structure

- Each line of the source file is offset 6 spaces to the right to account for the line numbers.
- Programs have different sections labeled with the `DIVISION` keyword to separate the responsibilities of each part of the program.
- The first division is the `IDENTIFICATION DIVISION.` which stores the metadata that describes the program ([docs](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_73/rzasb/iddiv.htm)).
  - The `PROGRAM-ID` paragraph allows you to specify the name of the program ([docs](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_73/rzasb/progid.htm)).
  - There can be other paragraphs, but those are optional.
- The second division is the `ENVIRONMENT DIVISION.`, which is an optional section where you can define program configuration and inputs/outputs ([docs](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_73/rzasb/envcfg.htm)).
- The third section is the `DATA DIVISION.` that specifies the internal and external data the program will work with.
  - The variables must be specified in the `WORKING-STORAGE SECTION.`
- Last but not least, the `PROCEDURE DIVISION.` is essentially the `main()` function of our program. All of our wonderful spaghetti code goes here.

```cobol
      IDENTIFICATION DIVISION.
        PROGRAM-ID. MY-PROGRAM.
      
      DATA DIVISION.
        WORKING-STORAGE SECTION.
        *> Variables go here.
      
      PROCEDURE DIVISION.
        *> Functionality goes here.
```

### Variables

Variables are pretty unique in COBOL. Instead of defining a type, it seems you specify what the variables hold as a composite of different types:

* A - alphabetic
* X - alphanumeric
* V - decimal
* S - sign
* 9 - numeric

For example, a floating-point number with 3 digits and 2 digits of precision would look something like this:

```cobol
        01 MY-FLOAT PIC S9(3)V9(2). VALUE +987.65.
```

Note that a value does not need to be specified for the variable. The best way I can sum up variable declaration is that we use the different symbols to represent the structure of the value that will be stored, much like how regex can be used to match different words/expressions.

The numbers appearing on the left-hand side specify the level of the variable for nesting data just like how classes/struct can be used to wrap around other variables.

```cobol
      01 PERSON-ADDRESS.
        05 HOUSE-NUMBER PIC 9(4).
        05 STREET PIC X(24).
        05 CITY PIC X(24).
        05 COUNTRY PIC X(24) VALUE 'BELGIUM'.
```

This is a very brief overview of variables, but I highly recommend looking at [documentation from IBM](https://www.ibm.com/support/knowledgecenter/SSUFAU_2.0.0/com.ibm.debugtool.doc/rmdita/rcmddco.html) to learn more.

### Conditionals

Conditionals are quite self-explanatory given how it reads like plain English barring a couple of symbols.

```cobol
      PROCEDURE DIVISION.
        *> Initialize variables with numbers
        MOVE 30 TO A.
        MOVE 20 TO B.
        MOVE 30 TO C.
        
        IF A > B THEN
            DISPLAY 'A > B'
            IF A = C THEN
                DISPLAY 'A = C'
            ELSE
                DISPLAY 'A != C'
            END IF.
        ELSE
            DISPLAY 'A <= B'
        END IF.
```

For switch statements, we specify the value to `switch` on (statement in Java) to be `True`.

```cobol
      EVALUATE TRUE
        WHEN A < 20
            DISPLAY 'A IS LESS THAN 20'
        WHEN A < 30
            DISPLAY 'A IS LESS THAN 30'
        WHEN A < 40
            DISPLAY 'A IS LESS THAN 40'
      END-EVALUATE.
```

Conditionals can also be combined with `NOT`, `AND`, `OR`, and some others.

```cobol
      IF A IS LESS THAN B AND A IS LESS THAN 50 THEN
        DISPLAY 'THIS IS IN FACT TRUE'
      ELSE
        DISPLAY 'THIS SHOULD NOT SHOW'
      END-IF.
      
      *> Combined conditional without else
      IF A IS POSITIVE OR A IS NEGATIVE THEN
        DISPLAY 'A IS POSITIVE OR NEGATIVE'.
```

For further reference, there is a lot written about [how to implement conditionals](https://www.ibm.com/support/knowledgecenter/SSUFAU_1.0.0/com.ibm.debugtool.doc/rmdita/rcmdico.html).

There are a lot of other aspects of the language not shown here such as commands, strings, loops, file I/O, etc. 

### Now for the important question.

**Can COBOL be used for Leetcode?** Absolutely. Allow me to demonstrate.

For today's problem, we will be doing [Leetcode 326](https://leetcode.com/problems/power-of-three/). *Given an integer, write a function to determine if it is a power of three.* And for the follow-up, *could you do it without using any loop / recursion?*

For the solution below, we will accomplish both. The first solution that comes to keep dividing the given number, `n`, by 3 and see if the remainder is 0 at the end. However, that did not fit in with the follow-up and I got too tired to figure out how to write a loop, so we will use the change of base formula instead.

i = log<sub>b</sub>(n)/log<sub>b</sub>(3)

![code](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/cobol/code.png)

I seriously hope they never ask Leetcode questions in COBOL. Ever.

## References

* https://developer.ibm.com/technologies/cobol/
* https://devdocs.io/gnu_cobol/
* https://www.tutorialspoint.com/cobol/index.htm
* https://www.govtech.com/computing/As-Unemployment-Claims-Spike-New-Jersey-Seeks-COBOL-Coders.html
