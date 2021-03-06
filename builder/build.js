var fs = require("fs");
var argparse = require("argparse");
var uglify = require("uglify-js2");
var spawn = require('child_process').spawn;
var crypto = require('crypto');

js();
css();

function js() {

    var parser = new argparse.ArgumentParser();

    parser.addArgument(['--include'], {
        action: 'append',
        defaultValue: ['js']
    });
    parser.addArgument(['--minify'], {
        action: 'storeTrue',
        defaultValue: false
    });

    var args = parser.parseArgs();

    var output = '../public/index.js';

    console.log(' * Building ' + output);

    var sourcemap = '';
    var sourcemapping = '';

    var buffer = [];
    var sources = [];

    for (var i = 0, il = args.include.length; i < il; i++) {

        var contents = fs.readFileSync('./includes/' + args.include[i] + '.json', 'utf8');
        var files = JSON.parse(contents);

        for (var j = 0, jl = files.length; j < jl; j++) {

            var file = '../public' + files[j];

            sources.push(file);

            buffer.push(fs.readFileSync(file, 'utf8') + '\n\n');


        }

    }

    console.log(buffer.length);

    var temp = buffer.join('');

    if (!args.minify) {

        fs.writeFileSync(output, temp, 'utf8');

    } else {

        var result = uglify.minify(sources, {
            outSourceMap: sourcemap
        });

        fs.writeFileSync(output, result.code + sourcemapping, 'utf8');

        if (args.sourcemaps) {

            fs.writeFileSync(sourcemap, result.map, 'utf8');

        }

    }

    var fd = fs.createReadStream(output);
    var hash = crypto.createHash('md5');

    hash.setEncoding('hex');

    fd.on('end', function () {

        hash.end();

        var md5 = hash.read();

        var indexHtml = fs.readFileSync('../public/index.html', 'utf8');

        indexHtml = indexHtml.replace(new RegExp('<script src="/index.js(.*?)"><\/script>'), '<script src="index.js?' + md5 + '"></script>');

        fs.writeFileSync('../public/index.html', indexHtml, 'utf8');

    });

    fd.pipe(hash);

}

function css() {

    var parser = new argparse.ArgumentParser();

    parser.addArgument(['--include'], {
        action: 'append',
        defaultValue: ['css']
    });
    parser.addArgument(['--minify'], {
        action: 'storeTrue',
        defaultValue: false
    });

    var args = parser.parseArgs();

    var output = '../public/index.css';

    console.log(' * Building ' + output);

    var sourcemap = '';
    var sourcemapping = '';

    var buffer = [];
    var sources = [];

    for (var i = 0, il = args.include.length; i < il; i++) {

        var contents = fs.readFileSync('./includes/' + args.include[i] + '.json', 'utf8');
        var files = JSON.parse(contents);

        for (var j = 0, jl = files.length; j < jl; j++) {

            var file = '../public' + files[j];

            sources.push(file);

            buffer.push(fs.readFileSync(file, 'utf8') + '\n\n');


        }

    }

    console.log(buffer.length);

    var temp = buffer.join('');

    if (!args.minify) {

        fs.writeFileSync(output, temp, 'utf8');

    } else {

        var result = uglify.minify(sources, {
            outSourceMap: sourcemap
        });

        fs.writeFileSync(output, result.code + sourcemapping, 'utf8');

        if (args.sourcemaps) {

            fs.writeFileSync(sourcemap, result.map, 'utf8');

        }

    }

    var fd = fs.createReadStream(output);
    var hash = crypto.createHash('md5');

    hash.setEncoding('hex');

    fd.on('end', function () {

        hash.end();

        var md5 = hash.read();

        var indexHtml = fs.readFileSync('../public/index.html', 'utf8');

        indexHtml = indexHtml.replace(new RegExp('<link rel="stylesheet" href="/index.css(.*?)" />'), '<link rel="stylesheet" href="index.css?' + md5 + '" />');

        fs.writeFileSync('../public/index.html', indexHtml, 'utf8');

    });

    fd.pipe(hash);

}
