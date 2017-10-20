$(document).ready(function(){
    var prev_fs,current_fs,next_fs;
    $(".next").click(function(){
         if($(this).hasClass('first')){ //Personal Detais checking form empty or Not
             if(($(this).parent().children("#name").val().length===0)||($(this).parent().children("#surname").val().length===0)){
                 alert("Fields are empty"); //if condition by checking length 
                 console.log("inside if");
                return false;
             
         }else{ //if not empty
             console.log("inside else");
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#signup").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.hide();
        }
     } 
    if($(this).hasClass('second')){//Academic checking form empty or Not
             console.log("inside second");
            
         if(($(this).parent().children("#branch").val().length===0)||($(this).parent().children("#roll").val().length===0)){
            alert("Fields are empty");
             console.log("inside if");
            return false;
             
         }else{
            console.log("inside else");
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            $("#signup").eq($("fieldset").index(next_fs)).addClass("active");
            next_fs.show();
            current_fs.hide();
        }
    }
    else
        {
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            $("#signup").eq($("fieldset").index(next_fs)).addClass("active");
            next_fs.show();
            current_fs.hide();
        }
   

    console.log("outside if");
    });
    $(".prev").click(function(){
        current_fs = $(this).parent();
        prev_fs = $(this).parent().prev();
       
        $("#signup").eq($("fieldset").index(prev_fs)).addClass("active");
        prev_fs.show();
        current_fs.hide();

    });
    $(".submit").click(function(){
        if($(this).hasClass('third')){
        if(($(this).parent().children("#username").val().length===0)||($(this).parent().children("#pass1").val().length===0)){
            alert("Fields are empty");
            console.log("Inside empty");
            return false;
             
         }else if(($(this).parent().children("#pass1").val())!=($(this).parent().children("#pass2").val()))
            {
                    console.log("Inside pass");
                        alert("Password misMatch");
                        return false;
            }
            else{
                console.log("Inside exit");
                window.location.href="/";
            }
        }
        else{
            var check=  $("input:radio[name=radio-group1]:checked").val();
            console.log(check);
            check=  $("input:radio[name=radio-group2]:checked").val();
            console.log(check);
            check=  $("input:radio[name=radio-group3]:checked").val();
            console.log(check);
            check=  $("input:radio[name=radio-group4]:checked").val();
            console.log(check);
        }

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

   $(".logout").click(function(){
    window.location.href="/";
   });
});