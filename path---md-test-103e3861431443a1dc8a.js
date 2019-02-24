webpackJsonp([0x9dc07dc9d5f6],{374:function(e,n){e.exports={errors:[{message:"Cannot read property 'slug' of undefined",locations:[{line:6,column:5}],path:["markdownRemark","tableOfContents"]}],data:{markdownRemark:{html:'<h1>Markdown: Syntax</h1>\n<ul>\n<li>\n<p><a href="#overview">Overview</a></p>\n<ul>\n<li><a href="#philosophy">Philosophy</a></li>\n<li><a href="#html">Inline HTML</a></li>\n<li><a href="#autoescape">Automatic Escaping for Special Characters</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#block">Block Elements</a></p>\n<ul>\n<li><a href="#p">Paragraphs and Line Breaks</a></li>\n<li><a href="#header">Headers</a></li>\n<li><a href="#blockquote">Blockquotes</a></li>\n<li><a href="#list">Lists</a></li>\n<li><a href="#precode">Code Blocks</a></li>\n<li><a href="#hr">Horizontal Rules</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#span">Span Elements</a></p>\n<ul>\n<li><a href="#link">Links</a></li>\n<li><a href="#em">Emphasis</a></li>\n<li><a href="#code">Code</a></li>\n<li><a href="#img">Images</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#misc">Miscellaneous</a></p>\n<ul>\n<li><a href="#backslash">Backslash Escapes</a></li>\n<li><a href="#autolink">Automatic Links</a></li>\n</ul>\n</li>\n</ul>\n<p><strong>Note:</strong> This document is itself written using Markdown; you\ncan <a href="/blog/projects/markdown/syntax.text">see the source for it by adding \'.text\' to the URL</a>.</p>\n<hr>\n<h2>Overview</h2>\n<h3>Philosophy</h3>\n<p>Markdown is intended to be as easy-to-read and easy-to-write as is feasible.</p>\n<p>Readability, however, is emphasized above all else. A Markdown-formatted\ndocument should be publishable as-is, as plain text, without looking\nlike it\'s been marked up with tags or formatting instructions. While\nMarkdown\'s syntax has been influenced by several existing text-to-HTML\nfilters -- including <a href="http://docutils.sourceforge.net/mirror/setext.html">Setext</a>, <a href="http://www.aaronsw.com/2002/atx/">atx</a>, <a href="http://textism.com/tools/textile/">Textile</a>, <a href="http://docutils.sourceforge.net/rst.html">reStructuredText</a>,\n<a href="http://www.triptico.com/software/grutatxt.html">Grutatext</a>, and <a href="http://ettext.taint.org/doc/">EtText</a> -- the single biggest source of\ninspiration for Markdown\'s syntax is the format of plain text email.</p>\n<h2>Block Elements</h2>\n<h3>Paragraphs and Line Breaks</h3>\n<p>A paragraph is simply one or more consecutive lines of text, separated\nby one or more blank lines. (A blank line is any line that looks like a\nblank line -- a line containing nothing but spaces or tabs is considered\nblank.) Normal paragraphs should not be indented with spaces or tabs.</p>\n<p>The implication of the "one or more consecutive lines of text" rule is\nthat Markdown supports "hard-wrapped" text paragraphs. This differs\nsignificantly from most other text-to-HTML formatters (including Movable\nType\'s "Convert Line Breaks" option) which translate every line break\ncharacter in a paragraph into a <code>&#x3C;br /></code> tag.</p>\n<p>When you <em>do</em> want to insert a <code>&#x3C;br /></code> break tag using Markdown, you\nend a line with two or more spaces, then type return.</p>\n<h3>Headers</h3>\n<p>Markdown supports two styles of headers, <a href="">Setext</a> and <a href="">atx</a>.</p>\n<p>Optionally, you may "close" atx-style headers. This is purely\ncosmetic -- you can use this if you think it looks better. The\nclosing hashes don\'t even need to match the number of hashes\nused to open the header. (The number of opening hashes\ndetermines the header level.)</p>\n<h3>Blockquotes</h3>\n<p>Markdown uses email-style <code>></code> characters for blockquoting. If you\'re\nfamiliar with quoting passages of text in an email message, then you\nknow how to create a blockquote in Markdown. It looks best if you hard\nwrap the text and put a <code>></code> before every line:</p>\n<blockquote>\n<p>This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\nVestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p>\n<p>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\nid sem consectetuer libero luctus adipiscing.</p>\n</blockquote>\n<p>Markdown allows you to be lazy and only put the <code>></code> before the first\nline of a hard-wrapped paragraph:</p>\n<blockquote>\n<p>This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\nVestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p>\n</blockquote>\n<blockquote>\n<p>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\nid sem consectetuer libero luctus adipiscing.</p>\n</blockquote>\n<p>Blockquotes can be nested (i.e. a blockquote-in-a-blockquote) by\nadding additional levels of <code>></code>:</p>\n<blockquote>\n<p>This is the first level of quoting.</p>\n<blockquote>\n<p>This is nested blockquote.</p>\n</blockquote>\n<p>Back to the first level.</p>\n</blockquote>\n<p>Blockquotes can contain other Markdown elements, including headers, lists,\nand code blocks:</p>\n<blockquote>\n<h2>This is a header.</h2>\n<ol>\n<li>This is the first list item.</li>\n<li>This is the second list item.</li>\n</ol>\n<p>Here\'s some example code:</p>\n<pre><code>return shell_exec("echo $input | $markdown_script");\n</code></pre>\n</blockquote>\n<p>Any decent text editor should make email-style quoting easy. For\nexample, with BBEdit, you can make a selection and choose Increase\nQuote Level from the Text menu.</p>\n<h3>Lists</h3>\n<p>Markdown supports ordered (numbered) and unordered (bulleted) lists.</p>\n<p>Unordered lists use asterisks, pluses, and hyphens -- interchangably\n-- as list markers:</p>\n<ul>\n<li>Red</li>\n<li>Green</li>\n<li>Blue</li>\n</ul>\n<p>is equivalent to:</p>\n<ul>\n<li>Red</li>\n<li>Green</li>\n<li>Blue</li>\n</ul>\n<p>and:</p>\n<ul>\n<li>Red</li>\n<li>Green</li>\n<li>Blue</li>\n</ul>\n<p>Ordered lists use numbers followed by periods:</p>\n<ol>\n<li>Bird</li>\n<li>McHale</li>\n<li>Parish</li>\n</ol>\n<p>It\'s important to note that the actual numbers you use to mark the\nlist have no effect on the HTML output Markdown produces. The HTML\nMarkdown produces from the above list is:</p>\n<p>If you instead wrote the list in Markdown like this:</p>\n<ol>\n<li>Bird</li>\n<li>McHale</li>\n<li>Parish</li>\n</ol>\n<p>or even:</p>\n<ol start="3">\n<li>Bird</li>\n<li>McHale</li>\n<li>Parish</li>\n</ol>\n<p>you\'d get the exact same HTML output. The point is, if you want to,\nyou can use ordinal numbers in your ordered Markdown lists, so that\nthe numbers in your source match the numbers in your published HTML.\nBut if you want to be lazy, you don\'t have to.</p>\n<p>To make lists look nice, you can wrap items with hanging indents:</p>\n<ul>\n<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\nviverra nec, fringilla in, laoreet vitae, risus.</li>\n<li>Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\nSuspendisse id sem consectetuer libero luctus adipiscing.</li>\n</ul>\n<p>But if you want to be lazy, you don\'t have to:</p>\n<ul>\n<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\nviverra nec, fringilla in, laoreet vitae, risus.</li>\n<li>Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\nSuspendisse id sem consectetuer libero luctus adipiscing.</li>\n</ul>\n<p>List items may consist of multiple paragraphs. Each subsequent\nparagraph in a list item must be indented by either 4 spaces\nor one tab:</p>\n<ol>\n<li>\n<p>This is a list item with two paragraphs. Lorem ipsum dolor\nsit amet, consectetuer adipiscing elit. Aliquam hendrerit\nmi posuere lectus.</p>\n<p>Vestibulum enim wisi, viverra nec, fringilla in, laoreet\nvitae, risus. Donec sit amet nisl. Aliquam semper ipsum\nsit amet velit.</p>\n</li>\n<li>\n<p>Suspendisse id sem consectetuer libero luctus adipiscing.</p>\n</li>\n</ol>\n<p>It looks nice if you indent every line of the subsequent\nparagraphs, but here again, Markdown will allow you to be\nlazy:</p>\n<ul>\n<li>\n<p>This is a list item with two paragraphs.</p>\n<p>This is the second paragraph in the list item. You\'re\nonly required to indent the first line. Lorem ipsum dolor\nsit amet, consectetuer adipiscing elit.</p>\n</li>\n<li>\n<p>Another item in the same list.</p>\n</li>\n</ul>\n<p>To put a blockquote within a list item, the blockquote\'s <code>></code>\ndelimiters need to be indented:</p>\n<ul>\n<li>\n<p>A list item with a blockquote:</p>\n<blockquote>\n<p>This is a blockquote\ninside a list item.</p>\n</blockquote>\n</li>\n</ul>\n<p>To put a code block within a list item, the code block needs\nto be indented <em>twice</em> -- 8 spaces or two tabs:</p>\n<ul>\n<li>\n<p>A list item with a code block:</p>\n<pre><code>&#x3C;code goes here>\n</code></pre>\n</li>\n</ul>\n<h3>Code Blocks</h3>\n<p>Pre-formatted code blocks are used for writing about programming or\nmarkup source code. Rather than forming normal paragraphs, the lines\nof a code block are interpreted literally. Markdown wraps a code block\nin both <code>&#x3C;pre></code> and <code>&#x3C;code></code> tags.</p>\n<p>To produce a code block in Markdown, simply indent every line of the\nblock by at least 4 spaces or 1 tab.</p>\n<p>This is a normal paragraph:</p>\n<pre><code>This is a code block.\n</code></pre>\n<p>Here is an example of AppleScript:</p>\n<pre><code>tell application "Foo"\n    beep\nend tell\n</code></pre>\n<p>A code block continues until it reaches a line that is not indented\n(or the end of the article).</p>\n<p>Within a code block, ampersands (<code>&#x26;</code>) and angle brackets (<code>&#x3C;</code> and <code>></code>)\nare automatically converted into HTML entities. This makes it very\neasy to include example HTML source code using Markdown -- just paste\nit and indent it, and Markdown will handle the hassle of encoding the\nampersands and angle brackets. For example, this:</p>\n<pre><code>&#x3C;div class="footer">\n    &#x26;copy; 2004 Foo Corporation\n&#x3C;/div>\n</code></pre>\n<p>Regular Markdown syntax is not processed within code blocks. E.g.,\nasterisks are just literal asterisks within a code block. This means\nit\'s also easy to use Markdown to write about Markdown\'s own syntax.</p>\n<pre><code>tell application "Foo"\n    beep\nend tell\n</code></pre>\n<h2>Span Elements</h2>\n<h3>Links</h3>\n<p>Markdown supports two style of links: <em>inline</em> and <em>reference</em>.</p>\n<p>In both styles, the link text is delimited by [square brackets].</p>\n<p>To create an inline link, use a set of regular parentheses immediately\nafter the link text\'s closing square bracket. Inside the parentheses,\nput the URL where you want the link to point, along with an <em>optional</em>\ntitle for the link, surrounded in quotes. For example:</p>\n<p>This is <a href="http://example.com/">an example</a> inline link.</p>\n<p><a href="http://example.net/">This link</a> has no title attribute.</p>\n<h3>Emphasis</h3>\n<p>Markdown treats asterisks (<code>*</code>) and underscores (<code>_</code>) as indicators of\nemphasis. Text wrapped with one <code>*</code> or <code>_</code> will be wrapped with an\nHTML <code>&#x3C;em></code> tag; double <code>*</code>\'s or <code>_</code>\'s will be wrapped with an HTML\n<code>&#x3C;strong></code> tag. E.g., this input:</p>\n<p><em>single asterisks</em></p>\n<p><em>single underscores</em></p>\n<p><strong>double asterisks</strong></p>\n<p><strong>double underscores</strong></p>\n<h3>Code</h3>\n<p>To indicate a span of code, wrap it with backtick quotes (<code>`</code>).\nUnlike a pre-formatted code block, a code span indicates code within a\nnormal paragraph. For example:</p>\n<p>Use the <code>printf()</code> function.</p>',tableOfContents:null,timeToRead:8,frontmatter:{date:"May 31, 2018",path:"/md-test",tags:["programming","markdown"],title:"Markdown Support Test"}}},pathContext:{}}}});
//# sourceMappingURL=path---md-test-103e3861431443a1dc8a.js.map