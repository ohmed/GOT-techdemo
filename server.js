var express = require('express');
var app = express();

app.use( express.static( '/Users/ohmed/git/got-techdemo/web/public') );

app.use( '/about', express.static( '/Users/ohmed/git/got-techdemo/web/public/index.html') );
app.use( '/blog', express.static( '/Users/ohmed/git/got-techdemo/web/public/index.html') );

app.listen(10099);
