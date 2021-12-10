# Why I Unit Test My Sass: Mixins

In my previous post [TODO INSERT LINK HERE DO NOT IGNORE THIS STAN], I discussed why Sass unit testing is a thing and why you may want to incorporate it into your project. If you were shocked to find out that this is something that is done, please let me explain in my first post.

Unit testing Sass functions wasn’t too complicated. But what about mixins? Testing-wise, it is quite similar. The only differences here is the syntax.

### Getting Started

> Note that the steps outlined here assumes you have setup your test project similar to how it is described in the first post. If you have an existing project, you can follow along and delete the test artifacts later.

For this tutorial, let’s create a simple viewport mixin similar to the `screen-above()` mixin defined in [Cirrus](https://github.com/Spiderpig86/Cirrus). The mixin below will apply any styles passed into it if it is larger than the specified breakpoints. Copy the contents below into a new file within `/src/mixins.scss`.

```scss
// mixins.scss

$breakpoints: (
    $xs: 640px,
    $sm: 768px,
    $md: 1024px,
    $lg: 1280px,
    $xl: 1536px,
);

// Applies styles for viewports greater than a certain breakpoint. An error is thrown if the breakpoint does not exist.
@mixin screen-above($breakpoint) {
    @if not map-has-key($map: $breakpoints, $key: $breakpoint) {
        @error 'The given breakpoint #{$breakpoint} for @screen-above does not exist.';
    }

    @media screen and (min-width: map-get($breakpoints, $breakpoint)) {
        @content;
    }
}
```

### Testing

Before you write the test, make sure you have already done the prerequisites required to run Sass unit tests in the first place. You can read all about it in my first post here [TODO INSERT LINK HERE DO NOT IGNORE THIS STAN].

Let’s start by creating our test file for mixins in `test/mixins.spec.scss`.

```scss
@import 'true';
@import '../src/mixins.scss';
```

Let’s add our test block with the `@describe` annotation.

```scss
@include describe('screen-above()') {
    
}
```

 Next, we will add our test case.

```scss
@include describe('screen-above()') {
    @include it('should return screen-above 640px given $xs') {
        
    }
}
```

Then, we will use the `assert()` mixin to take the actual `output` and the value we `expect`. Below we place the `.test` class in the output that includes the `screen-above` mixin. The `expect` would contain the CSS output we expect.

```scss
@include it('should return screen-above 640px given $xs') {
    @include assert {
        @include output {
            .test {
                @include screen-above($xs) {
                    color: #fff;
                }
            }
        }
        @include expect {
            @media screen and (min-width: 640px) {
                .test {
                    color: #fff;
                }
            }
        }
    }
}
```

To summarize this better:

* `expect` - describes the expected results.
* `output` - the actual output from the mixin you are testing.
* `assert` - a clause that binds the `output` and `expect` mixins together for the test.

### Running Your Tests

Like in the previous blog post, you can now run `npm test` to execute Jest for us. To be honest, it’s probably faster to just type `jest` instead.

```sh
npm test
```

You should see the results of your first test similar to the output below:

```
 PASS  tests/scss.spec.js
  Sass
    screen-above()
      √ should return screen-above 640px given $xs (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.143 s, estimated 4 s
Ran all test suites.
```

### Conclusion

Well that wraps up the tutorial on how to unit test mixins in Sass. In the next post, I will discuss how we can add error handling within our Sass that can be caught and tested using True.
