var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = {
    html: function (title, list, body, control) {
        const htmlCode = `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
        return htmlCode;
    },
    list: function (files) {
        var list = '<ul>';
        for (i = 0; i < files.length; i++) {
            list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
        }
        list += '</ul>';
        return list;
    }
};




var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    if (pathName === '/') {
        if (queryData.id !== undefined) {
            fs.readdir('./data', function (err, files) {
                var list = template.list(files);
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
                    var title = queryData.id;
                    var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
                        `<a href ="/create">create</a>
                         <a href ="/update?id=${title}">update</a> 
                         <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                         </form>
                    `);
                    response.writeHead(200);
                    response.end(html);
                });
            });

        } else {
            fs.readdir('./data', function (err, files) {
                var title = 'WEB';
                var description = 'good';
                var list = template.list(files);

                var html = template.html(title, list, `<h2>${title}</h2>
                    <p>${description}</p>`, `<a href ="/create">create</a>`);
                response.writeHead(200);
                response.end(html);

            });

        }
    } else if (pathName === '/create') {
        fs.readdir('./data', function (err, files) {
            var title = 'WEB - CREATE';
            var list = template.list(files);
            var html = template.html(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);

        });
    } else if (pathName === '/create_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                if (err) throw err;
                response.writeHead(302, {
                    location: `/?id=${title}`
                });
                response.end();
            });
        });

    } else if (pathName === '/update') {
        fs.readdir('./data', function (err, files) {
            var list = template.list(files);
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
                var title = queryData.id;
                var html = template.html(title, list,
                    `
                <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `,
                    `<a href ="/create">create</a> <a href ="/update?id=${title}">update</a>
                `);
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathName === '/update_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var id = post.id;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function (err) {
                if (err) throw err;
                fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                    if (err) throw err;
                    response.writeHead(302, {
                        location: `/?id=${title}`
                    });
                    response.end();
                });
            })

        });
    } else if (pathName === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, (err) => {
                if (err) throw err;
                response.writeHead(302, {
                    Location: `/`
                });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }




});
app.listen(3000);