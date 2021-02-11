# Github1s - Instantly Browse Projects on VSCode in Your Browser

Like $GME, [Github1s](https://github.com/conwnet/github1s) is a project that seemingly blew up overnight ([literally](https://seladb.github.io/StarTrack-js/#/)). Developed by [@conwnet](https://github.com/conwnet), this project aims to be an extremely fast way to load up any Github project in "one second" with the same feel as if you opened it up locally on VSCode.

Now, you might be wondering why would anyone need this when you can just browse the repository on Github website or clone the project yourself? 

## The Good

#### Speed

If you're like me, the Github website just doesn't beat the snappiness of opening any codebase in an editor, like VSCode. The need to go back and forth to browse files within the website adds enough of a delay to make it annoying over time, especially when you're looking through tons of files.

Along with your StackOverflow tabs, soon it'll be quite difficult to make out which tab corresponds to what. With Github1s, you can browse the code without crowding out your other browser tabs.

This project uses the file tree also found in VSCode to help you switch and search for files without needing to go to a different page. Clicking on a file in the sidebar brings it up immediately.

![Too Many Tabs](https://dev-to-uploads.s3.amazonaws.com/i/15kt58y4uvoyvxlivsel.PNG)

#### Convenience

Using it is incredibly simple. Go to a repository you are browsing, let's say [https://github.com/Spiderpig86/Cirrus](https://github.com/Spiderpig86/Cirrus). Then, go to your address bar and change `github.com` to `github1s.com` and press enter. You should now see the repository loaded up in a VSCode-like window.

#### Open Source

The source is public and you can follow directions to host an instance of this on your own machine. But at that point, is there really any benefit? You might as well just clone the repositories yourself.

## The Bad

#### VSCode Appearance Minus Most of the Functionality

This is not the tool to use if you were expecting a full-on VSCode experience in your browser. There is no terminal, no debugging support, and no extensions. Do not expect the *Source Control* panel in the sidebar to work either.

#### Github API Limits

Since the app uses the Github API to load the repositories and fetch all the files, you are also subjected to API rate limiting. As mentioned on the sidebar, unauthenticated requests are limited to just 60 per hour. With your own OAuth token, you can make up to 5,000 requests per hour. This limitation can become quite annoying if you end up surpassing the limits.

![API Limits](https://dev-to-uploads.s3.amazonaws.com/i/z5qtuq7d6zkpiqrhx06s.PNG)

## Overall

Github1s, in the end, is a great tool to browse repositories quickly. It's extremely easy to use and quick to load. However, the API request limitation can end up becoming a pain point as requests can be consumed rather quickly. In 5 minutes, I was able to surpass the 60 request quota by perusing the VSCode repository. 

If staying secure is your concern, I recommend cloning the repository and setting it up yourself.

## Thanks for reading!
:gem: Thank you for taking the time to check out this post. For more content like this, head over to my actual [blog](https://blog.stanleylim.me/). Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/serbis/) and follow me on [Github](https://github.com/Spiderpig86).