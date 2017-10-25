$(document).on('click','a#forgot',function(e){
    e.preventDefault();
    $('form#forgot').css('bottom','5px');
    $(this).fadeOut('fast',function(){
      $('a#back').fadeIn('fast');
    });
    
  });
  $('div#link_container').on('click','a#back',function(e){
    e.preventDefault();
    $('form#forgot').css('bottom','-195px');
    $(this).fadeOut('fast',function(){
      $('a#forgot').fadeIn('fast');
    });
    
  });
  function myFunction(){
      if(document.getElementById("name").value=="" ||document.getElementById("rollnumber").value=="")
        alert("Empty filed!!")
      else
      alert("Password sent to your email");
  }
  $('#btn').click(function() {
    $('#modelWindow').modal('show');
});
$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});