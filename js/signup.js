$(document).ready(function(){
    var prev_fs,current_fs,next_fs;
    $(".next").click(function(){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#signup").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.hide();
    
    });
    $(".prev").click(function(){
        current_fs = $(this).parent();
        prev_fs = $(this).parent().prev();
        $("#signup").eq($("fieldset").index(prev_fs)).addClass("active");
        prev_fs.show();
        current_fs.hide();

    });
    $(".submit").click(function(){
        window.location.href="index.html";

    });

    var quotes=["Every Great Achiever Inspired By a great Mentor",
                "A mentor is someone who allows you to see hope inside yourself",
    ];
    var i=0;
    setInterval(function() {
    $("#text_slide").html(quotes[i]);
    
     $("#text_slide").animate({left:"200px"},5000);
    $("#text_slide").animate({left:"-200px"},5000);
    if (i == quotes.length) {
        i = 0;
    }
    else {
        i++;
    }
}, 5 * 1000);

});