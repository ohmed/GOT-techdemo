(function () {

    var Menu = GOT.UI.Menu;

    var tree;

    function init () {

        $.get('resources/family-tree.json').then( function ( res ) {

            tree = res;

            renderFamilies();
            renderFamilyTree();

        });

    };

    function renderFamilies () {

        var html = [];

        tree.forEach(function ( item ) {

            html.push([

                '<a data-toggle="dropdown" class="dropdown" data-target="#' + item.name + '-dropdown">',
                '    <img src="img/houses/' + item.name + '-mini.png" height="20">' + item.name,
                '</a>'

            ].join(''));

        });

        $('#families').html(html.join(''));

    };

    function renderFamilyTree () {

        var html = [];

        tree.forEach(function ( item ) {

            html.push([

                '<nav id="' + item.name + '-dropdown" class="dropdown-menu">',
                '    <a style="width:40px;"><img src="img/houses/' + item.name + '-mini.png" height="20"></a>'

            ].join(''));

            item.children.forEach(function (child) {

                html.push([

                    '<a href="#">',
                    '    ' + child.name,
                    '</a>'

                ].join(''));

            });

            html.push('</nav>');

        });

        $('#main-nav').append(html.join(''));

    };

    function loadTemplate ( name ) {

        return $.get( '/html/bio/' + name + '.html' );

    };

    $(init);

}());
