# Why Medium Needs Markdown

After making a substantial amount of edits for my last post which totaled 3 months of on and off work, I thought that it would be the perfect time to finally post it on Medium. Medium has always been the one place where many go to read posts about various topics from self-improvement to economics and, the most important of all, software. The platform has manifested itself into a great source of knowledge filled with tutorials, discussions and opinions from various developers in the industry. If I needed a tutorial on how to set up a microservice architecture deployed to docker and orchestrated with Kubernetes, Medium was bound to have a comprehensive guide on that.

With such a large and growing community of developers, I thought that importing posts that contained links, images, and code snippets should be a synch given the widespread availability of Markdown. It is the primary markup language on most developer platforms and adoption seems to only be growing overtime. Feeling confident that I am now finally done with editing, I simply created a **gist** with the contents of my post and clicked the **import** button. To my surprise, everything  came out **wrong**.

Looking through the post, it seemed that the importer worked correctly at the very beginning of the post. The title, table of contents, and first paragraph looked to be in order. Once it runs into some content written in HTML, things started to get a lot worse.  Links, images, and code snippets ended up disappearing all together at some parts of the post. What's worse was that the importer was not able to pick up some bullets and numbered list correctly, where it either deleted some of the lines and renumbered them. A sinking feeling hit me as I realize that I had to go through editing the entire post again. This is especially gruesome on really long posts. Additional complications arise with Medium's custom formatting which are incompatible with existing Markdown posts.

### The Issues
Although it may sound like I am just nitpicking here, there are quite a few limitations of the Medium editor that prevents it from reaching its fullest potential. The editor UX seems fine on the surface given the features that it offers, but one will quickly realize the number of *gotchas* that actually exist within the platform.

**These are the few things that I feel really set Medium back as a platform for publishing:**

##### 1: Nested Lists
When I first tried to convert my blog post, I thought most things would instantly be formatted correctly with only a few things needed to be adjusted here and there. One of the things I like to use to organize my content is to nest lists to create some sort of hierarchy in the information I'm presenting.

All I got was a big fat **nope**.

What ended up happening was that anything that contained a nested list was completely stripped out. Sure it can be most fixed by copying and pasting the information again, but there is absolutely no option in the editor to offer any means of indentation with the bullet points.

I'm not the only one who feels that this is a major drawback in the editor itself. Just ask these users:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/Medium?ref_src=twsrc%5Etfw">@Medium</a> How does one insert nested lists (OLs or ULs) in content? First level is simple. Second level?</p>&mdash; Robert Koritnik (@robertkoritnik) <a href="https://twitter.com/robertkoritnik/status/520107363408572416?ref_src=twsrc%5Etfw">October 9, 2014</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[Nested List | Feature Request | Medium](https://medium.canny.io/feature-requests/p/nested-lists)

[Create list inside of list](https://github.com/yabwe/medium-editor/issues/666)
* Note that this is a discussion on a separate project

The lack of response to writers who want these features shows you where Medium's priorities really are, which of course, is to paywall more articles.

##### 2: Code Embedding
With many notable tech blogs hosting their content on Medium such as **Treehouse**, **Basecamp**, **Slack**, **FreeCodeCamp**, **Netflix**, and other publishers and independent writers, it would make sense for Medium to have its own way of embedding and displaying code to readers.

In fact, Medium does; only if you are fine with settling for a plain un-highlighted gray-black block sitting in the middle of your page.

This may seem like a small detail, but it makes sifting through large code snippets without going somewhat blind. I think it is great that Medium does support the **triple backtick** syntax of starting a code block since 2016, but that only scratches the surface of what codeblocks can actually do.

One solution that many developers and I use is to embed code snippets from other third party services like **Gist**, **Codepen**, and **JSFiddle**. This is **much** better than the existing editor implementation and better than adding images of your code since **Medium does not support alternative text for visually impaired developers.** [1].

This seems fine, but if you have an existing blog post already written in Markdown, creating a new gist or code snippet on other services becomes a chore that doesn't need to exist in the first place. There are, however, tools like [this](https://markdowntomedium.com/) one that creates the code blocks for you, but that ultimately ends up polluting your Gist. The point is, there shouldn't be this many steps in trying to publish blog posts that contain code snippets.

##### 3: Images? What Images?
As expected, since Medium did not support Markdown, any form of embedding images was completely stripped out after I used the [import](https://medium.com/p/import) tool, all the images got stripped out. *Wonderful.*

The one thing I can do about it is to upload the images one at a time, but this shouldn't even be necessary in the first place.

This could easily be implemented in the editor if there was support for embedding images by only using the Markdown syntax.

In addition, the support for captions for images is just simply missing, making it difficult for people who have trouble seeing.

##### 4: Tables
This is very common in a lot of text editors already where we can easily organize our data in a series of rows and columns. It may require some more work for the Medium team to implement, but things such as embedding tables for data sets, spreadsheets, and calculations are quite important in the developer space.

At least even in Wordpress, you have the option to embed tables via external plugins. The lack of this feature just makes it feel very limited.

##### 5: Limitations in Post Design/Control
Now we cannot put Medium at fault for lacking these features. Medium is designed following the ethos of minimalism, but some of that is being stripped away with the addition of new modal dialogs and distractions floating around the article itself. These are a few things that are also quite limiting about the platform as a whole:

###### Lack of Interactive Content
It is hard to embed visualizations powered by JS libraries like [d3.js](https://d3js.org/). The best you can do on Medium is to just make these screenshots or link your readers to other sites to view your interactive content.

This greatly limits how much information could actually be presented in Medium itself.

###### Custom HTML
Without being able to add custom HTML, crafting a beautiful blog post without making it look generic starts to become a challenge. The flexibility of styling the page the way you like can be made possible if Markdown was supported. In addition, custom styles would be a huge plus in allowing writers to have more variety in their posts. The one thing, however, is that the HTML must be sanitized before it can be rendered on pages to prevent XSS attacks.

###### Video Embeds
The only way to show videos is to link them through YouTube or gfycat.

### Benefits of Markdown

### Solutions?
[Talk about publishers like freeCodeCamp leaving Medium]

### References
1. [How to display code blocks in Medium](https://www.freecodecamp.org/news/how-to-add-code-to-medium-and-get-syntax-highlighting-d699761a5883/)