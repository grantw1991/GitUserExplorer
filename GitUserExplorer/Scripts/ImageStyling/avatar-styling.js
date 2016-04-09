$(function() {

    $(".thumbnail img").on("click", function() {
        $('.imagepreview').attr('src', $(this).attr('src'));
        $('#imagemodal').modal('show');
    });

})();