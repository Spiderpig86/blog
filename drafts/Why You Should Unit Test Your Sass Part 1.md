# Why I Unit Test My Sass and So Should You Part 1

> Did you know you could unit test your Sass? No? Me neither.

If you were to ask me years ago if there was such thing as unit testing Sass let alone stylesheets, I would tell you that it would probably be manual or automated with some framework like Selenium. Testing would be slow, arduous, and not very lightweight. 

This was the past and luckily, we now live during a time where we have choices. 

Today, there exists a nifty little testing framework called [True](https://github.com/oddbird/true) that allows you to quickly write Sass unit tests without too much pain. It features a syntax that makes most front-end developers feel at home. If you have ever written unit tests using [Jest](https://jestjs.io/), then using **True** won’t actually be that much different.

### Why Unit Test Sass?

Before we dive into the tooling, let’s discuss why we should do it in the first place.

As a basic example, let’s say you’re building a simple application that takes employees' orders for Pizza Friday. It’s a simple form that people in your team can select some radio box for which pizzas they want. You manually test, ship, and it becomes a big hit within the company.

Now the people demand more features. Next, they ask you for dropdowns to allow for customization. You rinse and repeat the process above and you ship it. Now suddenly, people aren't too fond of radio boxes because it doesn’t allow them to select multiple types of pizzas. You go back and make some changes and test. Fearing that you may have broken other parts of the app, you manually test as well. Each successive update becomes more and more of a drag until you decide to give up maintaining it all together.

The point is, unit testing solves the repetitive and arduous task of manually testing features over and over again. It is essentially:

1. A built-in sanity check for any new feature/integration into your existing application.
2. A record/collection of all possible cases that may break your app. It is essentially free documentation for app behaviors given some input.
3. Ensures that the code is maintainable even if someone else works in your codebase and makes a breaking change. Unit tests, if written properly, will catch those.
4. Fewer fires in prod. *No one likes putting out fires on a Friday night.*

These principles apply to so many parts of software development, so maybe it wouldn’t be too farfetched to also unit test your Sass. If you have a large project with lots of generated styles, debugging issues won’t always be that straightforward. Unit testing Sass should help with:

* Asserting that the inputs to your functions and mixins output what you expect.
  * This is especially important if you use any third-party libraries. You don’t want your stylesheets breaking because of some breaking change upstream.
* Reduce the amount of manual testing required for checking styles.
* Checking Sass compilation errors that generate some of your stylesheets properly.

### Is this for me?

I usually advocate for more testing regardless of the size of your project, but it might not be appropriate for what you are building.  You should be testing if:

* You use functions and mixins in your project, especially if they are on the more complicated side.
* Your Sass files are used in many other files.
* Your customer experience highly depends on how reliable the UI is rendered correctly. For example with an e-commerce site, you wouldn’t want your styles to accidentally hide the “Buy” button with some adjacent element.
* You’re building a library, like [Cirrus](https://github.com/Spiderpig86/Cirrus).

### Caveats

Although unit testing Sass sounds like it will solve all your design problems, it doesn’t. Using a framework like Sass True would help to make sure that the CSS generated is what you expect, however it is only limited to testing functions and mixins.

The final CSS output is really up to you to double-check and verify by hand. The same applies to whether the Sass would compile properly or not.

### So how do I get started?

The tutorial below walks you through setting up unit testing for a random Sass project. If you have another project you would like to add this to, then it may require some modification to the steps to fit your needs. We will be using [Dart Sass](https://github.com/sass/dart-sass) as our transpiler of choice and the [Sass True](https://github.com/oddbird/true) framework backed by Jest to write and perform our tests.

In your project, first install the necessary dependencies:

```sh
yarn add dart-sass sass-true glob jest
```

Initialize your node project.

```
npm init
```

In your `package.json`, define a test script to trigger Jest.

```json
"scripts": {
    "test": "jest"
}
```

To test, the first thing we need to have is source code. If you don’t have any, you can copy this `string-split` function to use an example and add it to `src/functions.scss`.

```scss
/* functions.scss */
@function string-split($string, $delimiter) {
    $result: ();

    $index: string.index($string, $delimiter);
    @while $index != null {
        $substring: string.slice($string, 1, $index - 1);
        $result: append($result, $substring);
        $string: string.slice($string, $index + string.length($delimiter));
        $index: string.index($string, $delimiter);
    }

    $result: append($result, $string);
    @return $result;
}
```

For this tutorial, we want to write unit tests to ensure that our string split function works as expected.

### Bind Sass True with Jest

With that part done, let’s integrate Jest to work with Sass True. In essence, Sass True acts as the *glue* or [Shim](https://en.wikipedia.org/wiki/Shim_(computing)) that binds your unit tests written in Sass into something that Jest can interpret.

For our tests, let’s create a `test` directory. Here we can throw whatever unit tests we want along with our shim file. Copy the shim file contents below and paste it into `test/scss.spec.js`.

```js
// scss.spec.js
const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

const testPath = `tests/**/*.spec.scss`;

describe('Sass', () => {
    const testFiles = glob.sync(path.resolve(process.cwd(), testPath));

    // Run on each file with describe() and it() functions
    testFiles.forEach((file) => sassTrue.runSass({ file: file }, { describe, it }));
});
```

What this shim file does is search for all files ending with the `.spec.scss` extension to be unit tested. We use `glob` to resolve all paths given the `testPath` regex.

For each test file, we will use Sass True to run the tests defined. In the second parameter of `runSass`, we pass in the functions that we would want to use such as `describe` and `it` within our Sass unit tests. If you are not sure what these functions do, luckily you can refer to the [Jest Documentation](https://jestjs.io/docs/api#describename-fn) because they behave exactly the same as their JavaScript counterparts.

### Writing Unit Tests

Now comes the fun/boring part. Now we have to write the actual tests for our `string-split()` function. Let’s create our first test file under the path `test/functions.spec.scss`.

The first thing we need to do is import the Sass True library and the file we want to test itself.

```scss
/* functions.spec.scss */
@import 'true';
@import '../src/functions.scss';
```

What comes after will look very familiar if you are used to unit testing with Jest. The syntax is almost identical to writing JS, except = with a few minor syntactical differences. Instead of function calls, each of Jests’s global functions is defined as a mixin. First, let’s **[describe](https://jestjs.io/docs/api#describename-fn)** the item we are testing. This helps to group multiple test cases that test the same thing together.

```scss
@include describe('string-split()') {
    
}
```

Next, we will define the test cases themselves. We use the **[it](https://jestjs.io/docs/api#testname-fn-timeout)** aka the `test` keyword to specify each input we want to test our function with.

```scss
@include describe('string-split()') {
	@include it('should return input string split using delimiter ","') {
        
    }
}
```

To wrap this test case, we need a way to check whether the output value is what we expect, commonly known as asserting our output. The `assert-equal($assert, $expected)` mixin is perfect for checking the output of `string-split()`. The first parameter is what’s output by the function under test and the second parameter is the expected output of that value. You can read more about it [here](https://www.oddbird.net/true/docs/api-assert-values#mixin--assert-equal).

Let’s say we want to test our function with an input string of `apples,oranges,bananas` with a delimiter of `,`. Then, we should expect our output to be `(‘apples’ ‘oranges’ ‘bananas’)`. We can write our test like this:

```scss
@include describe('string-split()') {
	@include it('should return input string split using delimiter ","') {
        @include assert-equal(string-split('apples,bananas,oranges', ','), ('apples' 'oranges' 'bananas'));
    }
}
```

Now you are ready to run your first test.

### Running Your Tests

Remember that script we added in the `package.json` file earlier? We can now run `npm test` to execute Jest for us. To be honest, it’s probably faster to just type `jest` instead.

```sh
npm test
```

You should see the results of your first test similar to the output below:

```sh
 PASS  tests/scss.spec.js
  Sass
    string-split()
      √ should return input string split using delimiter "," (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.058 s, estimated 6 s
Ran all test suites.
```

### 🎉 You did it 🎉

Well, congratulations! Give yourself a big pat on the back for writing your first unit test in Sass. 

Unit testing is the most glamorous topic in any aspect of software development. It is arguably the part that developers dread the most as it is repetitive, boring, and disappointing when you find out the code you wrote is broken. However, it is the most essential mechanism that keeps code maintainable and explicit. Edge cases are explicit and all it takes is a single command execution to confirm any assumptions you had on how the system behaved given certain inputs.

I previously thought Sass unit testing would never be a thing and why would it be a thing that developers would try to figure out. Today, I cannot think of developing [Cirrus](https://github.com/Spiderpig86/Cirrus) or any large projects with hundreds of styles without unit testing.

Anyway, don’t forget to check out [True](https://www.oddbird.net/true/docs/)’s amazing documentation to learn more about what else it can do. In the next post in this series, I will go over how you can easily test your mixins.