---
path: "/the-fastest-way-to-develop-and-deploy-your-next-project"
date: "2022-06-09T00:38:39.573Z"
title: "⚡ The Fastest Way to Develop and Deploy Your Next Project"
description: "Introducing Cirrus Start, the fastest way to bring your idea to life with a framework designed for rapid prototyping."
image: './blank.jpg'
tags: ['project','webdev','cirrus','javascript']
---

Do you like launching stuff? I like launching stuff! A few months ago, I released one of the largest updates to my CSS framework, [Cirrus](https://www.cirrus-ui.com/). Cirrus is a CSS framework designed for rapid prototyping and production use with a wide variety of ready-to-use components to plug into your app and utility classes to customize them. This makes building anything new with Cirrus a breeze with dead simple configuration and little overhead.

[Cirrus Start](https://github.com/Cirrus-UI/Cirrus-Start) is my next project that pushes Cirrus to the next level. The first step with any project is to read the setup section of the documentation. This involves hours or even days to get things going the way you want them. Sometimes the documentation is bad, confusing, or both. Even with good documentation, who wants to spend all that time learning a whole new framework in-depth to get the ball going?

Introducing ⚡ Cirrus Start, the fastest way to bring your idea to life with a framework designed for rapid prototyping. Out of the box, Cirrus Start comes with:
- 💎 Direct integration with __Cirrus__ using __Sass__ configuration. This allows you to customize what features you want in Cirrus and which classes to add/remove during project generation.
- ⚙️ __Webpack__ to bundle all your assets in a fast and configurable manner. This includes a few standard Webpack plugins and a live reload server for fast iteration.
- ⚗️ __PurgeCSS__ is included by default to minimize build sizes and remove all Cirrus classes that are not used for builds.
- ⚡ __Surge.sh__ to deploy and tear down your project with ease.

## How do you use it?

![Step 1 Clone the repo](https://github.com/Cirrus-UI/Cirrus-Start/raw/main/gifs/1.gif)

_First clone the repository._

![Step 2 Open in Editor](https://github.com/Cirrus-UI/Cirrus-Start/raw/main/gifs/2.gif)

_Open the cloned repository in your favorite editor._

![Step 3 Try running local server](https://github.com/Cirrus-UI/Cirrus-Start/raw/main/gifs/3.gif)

_Try running the local server._

![Step 4 Make your edits](https://github.com/Cirrus-UI/Cirrus-Start/raw/main/gifs/4.gif)

_Make any edits you want to make._

![Step 5 Deploy](https://github.com/Cirrus-UI/Cirrus-Start/raw/main/gifs/5.gif)

_Deploy your site to Surge.sh!_

## How do I customize Cirrus?

Cirrus is loaded within `src/index.scss`. The file contents is quite simple.

```scss
// Configure 
// https://www.cirrus-ui.com/getting-started/configuration
@use "cirrus-ui/src/cirrus-ext" as * with (
    $config: (
        extend: (
        )
    ),
);

// Other Styles
body {
    background: url('https://raw.githubusercontent.com/Spiderpig86/Cirrus/gh-pages/cirrus-docs-next/static/img/gradient.jpg') no-repeat 50%;
    background-attachment: fixed;
}
```

I strongly recommend reading more about how to customize Cirrus using the configuration mapping [here](https://www.cirrus-ui.com/getting-started/configuration) to configure it the way you want. However, configuration is __not necessary__ and you can use the framework as is!

If you'd like to have Cirrus specific configs placed in a separate file, you could move it to a file like `src/cirrus.config.scss`. Just remember to add `import './cirrus.config.scss'` inside `index.js`.

---

This pretty much ends my spiel on Cirrus Start. I can't wait to see what all of you will build with this! And of course, feedback will be appreciated. 😊
