$(document).ready(function(){
    var prev,current;
    $(".next").click(function(){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.hide();
    
    });
    $(".prev").click(function(){
        current_fs = $(this).parent();
        prev_fs = $(this).parent().prev();
        $("#progressbar li").eq($("fieldset").index(prev_fs)).addClass("active");
        prev_fs.show();
        current_fs.hide();

    });

});