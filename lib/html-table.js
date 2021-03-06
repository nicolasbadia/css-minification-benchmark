module.exports = function(options) {
  var head = options.head;
  var rows = [];

  var lineBreak = require('os').EOL;

  var tableRow = function(columns, tag) {

    var endTag = tag.replace(/^</, '</');
    var body = [];
    body.push('<tr>');
    columns.forEach(function(value) {
      if (typeof value == 'string')
        body.push(tag + value + endTag);
      else
        body.push(tag.replace('>', ' class=\'' + value.class + '\'>') + value.value + endTag);
    });
    body.push('</tr>');
    return body.join(lineBreak);
  };

  var buildPage = function() {
    var page = [];
    page.push('<!DOCTYPE html>');
    page.push('<html lang="en">');
    page.push('<head>');
    page.push('<meta charset="utf-8">');
    page.push('<title>css-minification-benchmark results</title>');
    page.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
    page.push('<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">');
    page.push('<style>th{text-align:center;vertical-align:middle!important}</style>');
    page.push('</head>');
    page.push('<body>');
    page.push('<div class="table-responsive">');
    page.push('<table class="table table-bordered table-condensed table-hover table-striped">');
    page.push('<thead>' + tableRow(head, '<th>') + '</thead>');
    page.push('<tbody>');
    rows.forEach(function(row) {
      page.push(tableRow(row, '<td>'));
    });
    page.push('</tbody>');
    page.push('</table>');
    page.push('</div>');
    page.push('</body>');
    page.push('</html>');
    return page.join(lineBreak);
  };

  return {
    push: function(row) {
      rows.push(row);
    },

    toString: function() {
      return buildPage();
    }
  };
};
