# Why Medium Needs Markdown

​	After making a substantial amount of edits for my last post which totaled 3 months of on and off work, I thought that it would be the perfect time to finally post it on Medium. Medium has always been the one place where many go to read posts about various topics from self-improvement to economics and, the most important of all, software. The platform has manifested itself into a great source of knowledge filled with tutorials, discussions and opinions from various developers in the industry. If I needed a tutorial on how to set up a microservice architecture deployed to docker and orchestrated with Kubernetes, Medium was bound to have a comprehensive guide on that.

​	With such a large and growing community of developers, I thought that importing posts that contained links, images, and code snippets should be a synch given the widespread availability of Markdown. It is the primary markup language on most developer platforms and adoption seems to only be growing overtime. Feeling confident that I am now finally done with editing, I simply created a **gist** with the contents of my post and clicked the **import** button. To my surprise, everything  came out **wrong**.

​	Looking through the post, it seemed that the importer worked correctly at the very beginning of the post. The title, table of contents, and first paragraph looked to be in order. Once it runs into some content written in HTML, things started to get a lot worse.  Links, images, and code snippets ended up disappearing all together at some parts of the post. What's worse was that the importer was not able to pick up some bullets and numbered list correctly, where it either deleted some of the lines and renumbered them. A sinking feeling hit me as I realize that I had to go through editing the entire post again. This is especially gruesome on really long posts. Medium's editor has its own conventions of how things should be formatted which provides some complications.

### The Issues



[Drawbacks include no nested lists, no markdown]