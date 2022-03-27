# Why I Unit Test My Sass: Errors

This is my third blog post in my unit testing with Sass series. If you’re curious of what’s out there in the land of Sass unit testing, start with reading my first post [TODO INSERT LINK HERE]. Here, I will discuss how you can test that errors are thrown currently within your Sass code.

### Getting Started

One of the main rules of thumb when unit testing is to make sure you cover as many cases as possible to a reasonable extent (there is also such thing as non-useful tests too). One of type of cases that you should definitely check are error cases to make sure that bad inputs that are supposed to have an exception thrown work. If you’re coming from more conventional languages with conventional frameworks like Java with JUnit and Golang with GoTest, this would be a no brainer.

One of the caveats of Sass is that it doesn’t come with some of the features we would expect in a conventional programming language — and why would we? As a result, there aren’t really many ways you can achieve unit testing thrown errors let alone **catching errors**. Errors thrown using the `@error` annotation will at best cause the compilation process to panic and stop halfway in.

Luckily, you can emulate this using [True](https://github.com/oddbird/true), a framework designed for unit testing Sass. True provides a handy function called `error()` that sort of acts as a Swiss army knife of error throwing. In addition to supporting things such as converting the errors in to `@warn` and returning a thrown error as a value without stopping compilation, it also supports backwards compatibility with the original `@error` annotation in Sass.

Here’s a brief rundown of the function signature:

```scss
@function error($message, $source: null, $catch: $catch-errors) {
    // ...
}
```

* `$message` - a message describing the error.
* `$source` - the source of the error for additional context. _The default value is `null`._
* `$catch-errors` - controls how the error should behave when thrown. _Default value is `false`._
  * If set to `true`, then the error message is returned from the function and no error is thrown by the Sass compiler.
  * If set to `false`, it will behave like the standard Sass `@error` annotation.
  * If set to `‘warn’`, then the error will use the `@warn` Sass annotation instead.

The `$catch-errors` parameter is a powerful tool that allows you to determine how errors should be thrown for certain styles in your project. For instance, one good use case I have in mind could be setting `$catch: ‘warn’` if your Sass project is running in developer mode.

### Example

To demonstrate how we can use this function, let’s take a pretty simple example. We have a function called `add()` that takes in 2 parameters `$a` and `$b`.

Since Sass isn’t inherently type-safe, we also want to add a check to ensure that both provided variables are of type `number` and throw an error if at least one of them are the wrong type. The function should look something like this:

```scss
@use 'throw';
@use 'sass:meta';

@function add($a, $b) {
    @if (meta.type-of($a) != 'number') or (meta.type-of($b) != 'number') {
        @return throw.error(
        	$message: '$a and $b must be numbers.',
            $source: 'add()',
            $catch: true
        );
    }
    
    return $a + $b;
}
```

So how do we test this?

First we will start out with the boilerplate that every test needs in Sass.

```scss
@include describe('add()') {
    @include it('should thrown an error if either parameter is not numerical.') {
        
    }
}
```

Since we set `$catch: true`, this means that True will return our exception as a string. We can easily validate this using `assert-equal` to check if the string that is returned matches what we expect.

```scss
@include describe('add()') {
    @include it('should thrown an error if either parameter is not numerical.') {
        @include assert-equal(
         	add('test', 3),
            'ERROR [add()]: $a and $b must be numbers.'
         );
    }
}
```

And if everything was written properly, running the test should yield an output similar to this:

```sh
 PASS  tests/scss.spec.js
  Sass
    add()
      √ should thrown an error if either parameter is not numerical. (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.022 s, estimated 6 s
Ran all test suites.
```

### Mixins

True also offers a version of their `error` function as a mixin. The behavior is essentially the same as the function, but used with a mixin instead.

The only main difference is that if `$catch` is set to true, then the Sass comoiler will output the error as a comment as part of the generated CSS file.  How you would use it would look something like this:

```scss
@include throw.error(
	$message: 'This is some error',
    $source: 'mixin-name-here',
    $catch: true
);
```

### Conclusion

I hope you enjoyed learning about how to perform error testing within Sass. It is not a well-known concept, but can be immensely powerful in helping you develop your next project.
