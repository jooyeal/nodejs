module.exports = {
    html: function (title, list, body, control) {
        const htmlCode = `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            <style>
                table {
                    border-collapse : collapse;
                }
                td {
                    border : 1px solid black;
                }
            </style>
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <a href = "/author">author</a>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
        return htmlCode;
    },
    list: function (topics) {
        var list = '<ul>';
        for (i = 0; i < topics.length; i++) {
            list += `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
        }
        list += '</ul>';
        return list;
    },
    authorSelector: function (authors, author_id) {
        var tag = "";
        for (i = 0; i < authors.length; i++) {
            var selected = '';
            if (authors[i].id === author_id) {
                selected = ' selected';
            }
            tag += `<option value = "${authors[i].id}"${selected}>${authors[i].name}</option>`;
        }
        return `<select name="author">
                ${tag};
                 </select>`;
    },
    authorTable: function (authors) {
        var tag = '<table>';
        for (i = 0; i < authors.length; i++) {
            tag += `<tr>
                        <td>${authors[i].name}</td>
                        <td>${authors[i].profile}</td>
                        <td><a href = "/author/update?id=${authors[i].id}">update<a></td>
                        <td>
                            <form action="/author/delete_process" method="post">
                                <input type="hidden" name="id" value="${authors[i].id}"/>
                                <input type="submit" value="delete"/>
                            </form>
                        </td>
                        </tr>
                        `
        }
        tag += '</table>'
        return tag;
    }
};