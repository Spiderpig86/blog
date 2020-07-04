# Clickjacking Using Iframes: A Case Study
## What is it?

Having been around since 2002, Clickjacking or "UI redressing" is technique that utilizes multiple opaque or transparent layers, usually iframes, to trick users into clicking buttons or entering information without any malicious intent. In turn, the content rendered in these frames could lead to malicious content on another page (masking as a legitimate download site, banking site, etc.)  Typically, these attacks are carried out by those who own the domain and setup a website for malicious purposes. The other ways that this type of attack can work is if an attacker takes over an expired domain or the hacker somehow accesses your webhosting account, CMS, etc. (if this happens, you may want to consider changing your credentials for every account you own).

## An Example

Sounds a bit confusing? Let's use a simple example. You want to download unreleased version of *The Room 2*, the sequel to Tommy Wiseau's masterpiece from 2003. You know of a way to get the movie  from a *safe* and *legitimate* website in a *totally legal 100%* way on `http://totallylegitsafemoviedownload.com`. Now you must be thinking, there shouldn't be any issues given that the word "safe" is in the name. It probably uses ad revenue to plant trees around the world ravaged by illegal deforestation and totally does not track and store your information to later resell it for profit. Given these assumptions, you reassure yourself it'll all be ok to click the big green flashing DOWNLOAD NOW button because nothing screams free movie plus a side of adware more than this.

Little did you know there was a transparent overlaid iframe on top of that button that takes you to a **fake page**.

![Ruse](https://i.kym-cdn.com/photos/images/original/000/692/118/2db.jpg)

A new tab opens and at this point, the only thing separating you and quality entertainment is a single spinner in the middle of the page with a message at the top saying, "Preparing your super fast 1000 TB/s download from our 100% uptime hosts..."

![Yes Spongebob GIF - Yes Spongebob Plankton GIFs](https://media1.tenor.com/images/2676bbb3b2f48a87d7f90aaf8390a8f9/tenor.gif?itemid=10466614)

But wait! A modal pops up. It reads, "Puppies around the world are in dire need of treats. Your donation can help feed millions of treat deprived puppies year round."

Being the benevolent netizen you are, you enter your name, address, phone number, credit card number, an amount of $10, social security number, biggest fear, and your SAT math score because who else will think of the puppies. You think to yourself: I did a good today.

The modal exits and spinner disappears. A blank screen of mockery lies before you. You think maybe it will reappear after a few seconds. It doesn't. Ok, maybe a few minutes. It still doesn't. Shit.

Even though this is a very extreme case of falling for a clickjacking attack, the overall idea of how it works remains the same in pretty much all cases. However this technique has morphed into other subcategories that include **likejacking** (for you social media addicts), **nested** (Google+ targeted), **cursorjacking**, **mousejacking**, **browserless**, **cookiejacking**, **filejacking**, and **password manager attacks** (takes advantage of the fact that your password manager autofills forms for you).

## Real Life Encounter
While browsing Google Maps for restaurants, I stumbled across a dim sum place I've never tried before. On the left panel, Google Maps listed the usual information -- name, address, website, etc. Since I usually check every website for a menu, I opened the link.
I thought to myself, this had to be the strangest website I've ever seen. Rather than being greeted with maybe a slightly outdated design with a carousel of food pictures, instead I was assaulted with a plethora of flashing banners, promises of riches and poor color choices. This was not a dim sum website -- this was an online Chinese casino.

For cases like these, it is very easy to tell since the content you see is drastically different than what you were expecting. Most people would be able to pick up this difference and safely navigate away from the page. However, clickjacking comes in much more nefarious flavors where iframes are carefully placed across pages to make you believe that the action you are performing is for the site you are on and not some shady page.

## The Code
Despite the URL bar not changing, you can clearly tell that the page loaded is completely different. This tactic can be quite effective for phishing the average internet user when done correctly -- given that the phishing page is made convincing enough.
[Check if this works for HTTPS pages]
Why Connections to Direct IP Addresses are Harmful
**Plug Polarity Browser for not succumbing to this attack**

## References
