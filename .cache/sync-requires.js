// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("C:/Users/slim1/Desktop/Github Projects/blog/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-templates-post-js": preferDefault(require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\src\\templates\\post.js")),
  "component---src-pages-404-js": preferDefault(require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\src\\pages\\404.js")),
  "component---src-pages-index-js": preferDefault(require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\src\\pages\\index.js")),
  "component---src-pages-page-2-js": preferDefault(require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\src\\pages\\page-2.js"))
}

exports.json = {
  "layout-index.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\layout-index.json"),
  "intro.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\intro.json"),
  "md-test.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\md-test.json"),
  "midnight-coding.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\midnight-coding.json"),
  "404.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\404.json"),
  "index.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\index.json"),
  "page-2.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\page-2.json"),
  "404-html.json": require("C:\\Users\\slim1\\Desktop\\Github Projects\\blog\\.cache\\json\\404-html.json")
}