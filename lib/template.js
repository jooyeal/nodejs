module.exports = {
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