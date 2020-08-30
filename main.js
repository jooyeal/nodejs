var http = require("http");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var db = require("./lib/db.js");
var topic = require("./lib/topic.js");
var author = require("./lib/author.js");
const {
  authorSelector
} = require("./lib/template.js");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;

  if (pathName === "/") {
    if (queryData.id !== undefined) {
      topic.page(request, response);
    } else {
      topic.home(request, response);
    }
  } else if (pathName === "/create") {
    topic.create(request, response);
  } else if (pathName === "/create_process") {
    topic.createProcess(request, response);
  } else if (pathName === "/update") {
    topic.update(request, response);
  } else if (pathName === "/update_process") {
    topic.updateProcess(request, response);
  } else if (pathName === "/delete_process") {
    topic.deleteProcess(request, response);
  } else if (pathName === "/author") {
    author.home(request, response);
  } else if (pathName === "/author/create_process") {
    author.createAuthorProcess(request, response);
  } else if (pathName === "/author/update") {
    author.update(request, response);
  } else if (pathName === "/author/update_process") {
    author.updateAuthorProcess(request, response);
  } else if (pathName === "/author/delete_process") {
    author.deleteProcess(request, response);
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);