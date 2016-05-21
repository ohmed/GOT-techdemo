(function() {

    function toggle () {

        var target = $(this).data('target');

        if ( $(this).hasClass('open') ) {

            $(this).removeClass('open');

            $(target).velocity('slideUp', 100);

        } else {

            $(this).addClass('open');

            $(target).velocity('slideDown', 100);

        }

    };

    $(document).on('click', '[data-toggle="dropdown"]', toggle);

}());
