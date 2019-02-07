$(document).ready(function(){
    
    screenAutoHeight();
    $(window).on('load resize', function(){
        screenAutoHeight();
    });

});

// AutoHeight
function screenAutoHeight(){
    $('.section').css({
        'height': $(window).innerHeight()
    });
}

