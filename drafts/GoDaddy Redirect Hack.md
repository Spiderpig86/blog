# GoDaddy Redirect Hack

## Introduction

Over the last few days, website owners specifically hosting GoDaddy have been experiencing strange redirects to various websites. These redirects don't happen all the time, but they seem to happen when a user first visits a page or refreshes the page enough times to trigger it. I first stumbled upon this issue when visiting a website of a favorite restaurant mine. Instead of seeing a page with pictures of food, menus, etc., I was presented with a [fake AV page](https://arstechnica.com/information-technology/2014/02/what-a-fake-antivirus-attack).

## How it works

Like with other security issues I discover, I end up jumping down the rabbit hole to investigate what this is, how it works, and whether there is a way to avoid it. Unfortunately for this incident, the best perspective I can give is as an outsider. Having a compromised GoDaddy website would make this investigation easier, but it isn't impossible without it.

At a high level, the sequence of events is as follows based on testing and other observations:

### 1. The user visits a compromised website hosted on GoDaddy.

Like me, users could be visiting the website of a local business they are familiar with.

### 2. Initial redirect occurs

Through some black box logic (usually for first-time visitors or by chance), GoDaddy servers send a `302` to the user to redirect them to the attacker's website. Every compromised website I've found redirects to `46.4.68.136`.

As of now, there is speculation that GoDaddy's load balancers are compromised. Certain requests will redirect you to the attacker's page, but this occurs less often than expected. The cached versions of these compromised sites show a redirect in the HTTP response's header. This will cause the browser to redirect to the website specified in the `path` variable. Below are some examples.

```
HTTP/1.1 302 Found
Date: Fri, 16 Dec 2022 22:23:24 GMT
Server: Apache
P3P: CP="NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM"
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: b64618f79bd8f79428b7f1f80c1abceb=qtjmovs3948hi5t1m2shhambr4; path=/
Location: http://46.4.68.136/[REDACTED]?DOM=www.vocationalvisions.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=utf-8
```

```
HTTP/1.1 302 Found
Date: Sat, 17 Dec 2022 17:21:14 GMT
Server: Apache
X-Pingback: http://www.bookkeepingservicesclt.com/xmlrpc.php
Location: http://46.4.68.136/[REDACTED]?DOM=www.bookkeepingservicesclt.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Fri, 16 Dec 2022 14:43:04 GMT
Server: Apache
Location: http://46.4.68.136/[REDACTED]?DOM=www.daria-snadowsky.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Tue, 13 Dec 2022 14:00:31 GMT
Server: Apache
X-Powered-By: PHP/5.6.40
Link: <http://saslist.com/wp-json/>; rel="https://api.w.org/"
Location: http://46.4.68.136/[REDACTED]?DOM=saslist.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Wed, 14 Dec 2022 00:20:15 GMT
Server: Apache
X-Powered-By: PHP/5.6.40
X-Pingback: http://paypointeinc.com/xmlrpc.php
Location: http://46.4.68.136/[REDACTED]?DOM=paypointeinc.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

The thing that all of them have in common is that the host to redirect to is the same thing and it is coming from an Apache web server. Whether they use WordPress or not doesn't play a factor.

Every user that ends up being redirected to the attacker's host is then tagged with a cookie set from the response header. Every subsequent request on that host will also include that cookie to identify the victim.

```
Set-Cookie: a8163=<JWT looking token>
```

### 3. The second redirect occurs

Redirect takes the user to a specific page on the attacker's website. This then runs some JavaScript to redirect them to some phishing or pornographic content. The basic structure of the page we see is:

```html
<html>
        <head>
            <script type="application/javascript">
                function process() {
                   if (window.location !== window.parent.location ) {
                      top.location = "http://bad.website";
                   } else {
                      window.location = "http://bad.website";
                   }
                }
                window.onerror = process;
                process();</script>
        </head>
        <body>
            The Document has moved <a href="http://bad.website">here</a>
        </body>
        </html>
```

Notably, you can find very similar snippets on [Github](https://github.com/search?q=%22window.onerror%20%3D%20process%3B%22&type=code). This isn't exactly a new tactic used to redirect users. After this redirect, the user is now at the attacker's chosen final destination.

## About the attacker's site

I've played around with the attacking site. Fun fact: the redirect page changes depending on your IP/location. If I was in North America, I would be redirected to the fake AV. If I were in Europe, Asia, South America, etc. each would be redirected to different pages in step 3. I wonder if this is done intentionally to specialize attack payloads based on some level of effectiveness according to location or if it is just done at random.

## Why this is serious

In general, the attack appears to be very widespread where many compromised websites can be found with a simple Google search of the attacking website's IP address. You can find plenty of website owners affected in this [Cloudflare](https://community.cloudflare.com/t/redirecting-to-unwanted-sites/445551) support question. Notably, even this [issue](https://github.com/sveltejs/kit/issues/8187) found its way to one of the links included in the SvelteKit docs.

It is not apparent that the attack impacts WordPress plugins as [@ColinQuarello](https://twitter.com/ColinQuarello) demonstrated. Newly provisioned accounts are also impacted even with no content uploaded to the website. From this, we can assume that this could be a system-wide issue for the hosting provider.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/GoDaddyHelp?ref_src=twsrc%5Etfw">@GoDaddyHelp</a> <a href="https://twitter.com/GoDaddy?ref_src=twsrc%5Etfw">@GoDaddy</a> 302 redirects are happening from your load balancers to spam/porn sites on the shared hosting infrastructure. I provisioned a new account and immediately got a 302 redirect when there was *no content on the site*. Headers looked forged too. This is serious.</p>&mdash; Colin Quarello (@ColinQuarello) <a href="https://twitter.com/ColinQuarello/status/1604956452451504130?ref_src=twsrc%5Etfw">December 19, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Once a user is in the hands of the attacker by being on the attacker's website, they can succumb to social engineering, phishing, etc. [Phishing scams](https://www.inky.com/en/blog/phishing-scams-cost-companies-billions) alone cost companies and the general public billions of dollars per year.

On the human side of things, this incident can lead to a loss in user trust not only for GoDaddy but also for small to medium-sized businesses that rely on the platform to host their company's website, e-commerce store, etc. These days, user trust is more important than ever to foster user growth and business expansion. According to a study done by [DigiCert](https://www.digicert.com/campaigns/digital-trust-survey), "84% of consumers would switch to a competitor if they lost trust in the enterprise". A single incident, let alone repeated occurrences, will degrade user trust faster than a business can regain it in a short period.

## Latest Developments

As of 2022-12-20, GoDaddy is currently working on this incident (INC-5492776). I am unsure if this is an internal incident tracking number or something GoDaddy customers can access.# GoDaddy Redirect Hack

## Introduction

Over the last few days, website owners, specifically those hosting on GoDaddy, have been experiencing strange redirects to various websites. These redirects don’t happen all the time, but they seem to happen when a user first visits a page or refreshes it enough times to trigger it. I first stumbled upon this issue when visiting a website of a favourite restaurant of mine. Instead of seeing a page with pictures of food, menus, etc., I was presented with a [fake AV page](https://arstechnica.com/information-technology/2014/02/what-a-fake-antivirus-attack).

## How it works

Like with other security issues I discover, I end up jumping down the rabbit hole to investigate what this is, how it works, and whether there is a way to avoid it. Unfortunately, for this incident, the best perspective I can give is as an outsider. A compromised GoDaddy website would make this investigation easier, but it isn’t impossible without it.

At a high level, the sequence of events is as follows based on testing and other observations:

### 1. The user visits a compromised website hosted on GoDaddy.

Like me, users could visit a local business’s website they are familiar with.

### 2. Initial redirect occurs

Through some black box logic (usually for first-time visitors or by chance), GoDaddy servers send a `302` to the user to redirect them to the attacker’s website. Every compromised website I’ve found redirects to `46.4.68.136`.

Currently, there is speculation that GoDaddy’s load balancers are compromised. Specific requests will redirect you to the attacker’s page, but this occurs less often than expected. The cached versions of these compromised sites show a redirect in the HTTP response’s header. This header will cause the browser to redirect to the website specified in the `path` variable. Below are some examples.

```
HTTP/1.1 302 Found
Date: Fri, 16 Dec 2022 22:23:24 GMT
Server: Apache
P3P: CP="NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM"
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: b64618f79bd8f79428b7f1f80c1abceb=qtjmovs3948hi5t1m2shhambr4; path=/
Location: http://46.4.68.136/[REDACTED]?DOM=www.vocationalvisions.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/HTML; charset=utf-8
```

```
HTTP/1.1 302 Found
Date: Sat, 17 Dec 2022 17:21:14 GMT
Server: Apache
X-Pingback: http://www.bookkeepingservicesclt.com/xmlrpc.php
Location: http://46.4.68.136/[REDACTED]?DOM=www.bookkeepingservicesclt.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Fri, 16 Dec 2022 14:43:04 GMT
Server: Apache
Location: http://46.4.68.136/[REDACTED]?DOM=www.daria-snadowsky.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Tue, 13 Dec 2022 14:00:31 GMT
Server: Apache
X-Powered-By: PHP/5.6.40
Link: <http://saslist.com/wp-json/>; rel="https://api.w.org/"
Location: http://46.4.68.136/[REDACTED]?DOM=saslist.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

```
HTTP/1.1 302 Found
Date: Wed, 14 Dec 2022 00:20:15 GMT
Server: Apache
X-Powered-By: PHP/5.6.40
X-Pingback: http://paypointeinc.com/xmlrpc.php
Location: http://46.4.68.136/[REDACTED]?DOM=paypointeinc.com&URI=%2findex.php
Connection: close
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
```

These websites receive a response from an Apache-powered server and will redirect the user to the same malicious IP address -- whether they use WordPress or not doesn't play a factor.

Every user that ends up being redirected to the attacker's host is then tagged with a cookie set from the response header. Every subsequent request on that host will also include that cookie to identify the victim.

```
Set-Cookie: a8163=<JWT looking token>
```

### 3. The second redirect occurs

Redirect takes the user to a specific page on the attacker's website. This page then runs JavaScript to redirect them to phishing or pornographic content. The basic structure of the page we see is as follows:

```html
<html>
        <head>
            <script type="application/javascript">
                function process() {
                   if (window.location !== window.parent.location ) {
                      top.location = "http://bad.website";
                   } else {
                      window.location = "http://bad.website";
                   }
                }
                window.onerror = process;
                process();</script>
        </head>
        <body>
            The Document has moved <a href="http://bad.website">here</a>
        </body>
        </html>
```

Notably, you can find very similar snippets on Github. The redirect above isn't a new tactic used to redirect users. After this redirect, the user is at the attacker's final destination.

## About the attacker's site

I've played around with the attacking site. Fun fact: the redirect page changes depending on your IP/location. The page would redirect me to the fake AV scanner if I were in North America. If I were in Europe, Asia, South America, etc., each would redirect me to different pages showing less-than-desirable content. Is this done intentionally to specialize attack payloads based on some level of effectiveness according to location, or is it just done randomly?

## Why this is serious

In general, the attack is widespread, where we can find many compromised websites with a simple Google search of the attacking website's IP address. Many website owners are affected by this, as evinced by this [Cloudflare](https://community.cloudflare.com/t/redirecting-to-unwanted-sites/445551) support question. Notably, even this [issue](https://github.com/sveltejs/kit/issues/8187) found its way to one of the links in the SvelteKit docs.

![Google search results showing impact](https://pbs.twimg.com/media/FkX09HcWAAA7R39?format=jpg&name=large)

It is not apparent that the attack impacts WordPress plugins, as [@ColinQuarello](https://twitter.com/ColinQuarello) demonstrated. Newly provisioned accounts are also affected even with no content uploaded to the website. From this, we can assume that this could be a system-wide issue for the hosting provider.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/GoDaddyHelp?ref_src=twsrc%5Etfw">@GoDaddyHelp</a> <a href="https://twitter.com/GoDaddy?ref_src=twsrc%5Etfw">@GoDaddy</a> 302 redirects are happening from your load balancers to spam/porn sites on the shared hosting infrastructure. I provisioned a new account and immediately got a 302 redirect when there was *no content on the site*. Headers looked forged too. This is serious.</p>&mdash; Colin Quarello (@ColinQuarello) <a href="https://twitter.com/ColinQuarello/status/1604956452451504130?ref_src=twsrc%5Etfw">December 19, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Once a user is in the hands of the attacker by being on the attacker's website, they can succumb to social engineering, phishing, etc. [Phishing scams](https://www.inky.com/en/blog/phishing-scams-cost-companies-billions) alone cost companies and the general public billions per year.

On the human side, this incident can lead to a loss in user trust not only for GoDaddy but also for small to medium-sized businesses that rely on the platform to host their company's website, e-commerce store, etc. These days, user trust is more important than ever to foster user growth and business expansion. According to a study done by [DigiCert](https://www.digicert.com/campaigns/digital-trust-survey), "84% of consumers would switch to a competitor if they lost trust in the enterprise". A single incident, let alone repeated occurrences, will degrade user trust faster than a business can regain it quickly.

## Latest Developments

As of 2022-12-20, GoDaddy is currently working on this incident (INC-5492776). I am unsure if this is an internal incident tracking number or something GoDaddy customers can access.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re aware of the issue and working to correct it now. I can assure you that our teams are diligently working to restore service as soon as possible. ^CG</p>&mdash; GoDaddy Help (@GoDaddyHelp) <a href="https://twitter.com/GoDaddyHelp/status/1605268691951689756?ref_src=twsrc%5Etfw">December 20, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Previously, it was suspected to be a firewall-related issue, but this has since been disproven. GoDaddy engineers and users have found this issue occurring regardless of firewall configurations.


<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re aware of the issue and working to correct it now. I can assure you that our teams are diligently working to restore service as soon as possible. ^CG</p>&mdash; GoDaddy Help (@GoDaddyHelp) <a href="https://twitter.com/GoDaddyHelp/status/1605268691951689756?ref_src=twsrc%5Etfw">December 20, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Previously, it was suspected to be a firewall-related issue but this has since been disproven since this issue occurs regardless of the firewall changes being made.
