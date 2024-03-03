$(document).ready(function(){

$('.title-help').on('click', function(){
    if ($(this).parent().find('.text-help').css('display') === 'none'){
    $(this).parent().find('.text-help').slideDown(1000);
    } else {
        $(this).parent().find('.text-help').slideUp(1000);
    }
});

if ($(window).width() < 960){

    var img_page = 1;

    var max_page = $('.img-block').length

    $('.img-back').on('click', function(){

        $('header').css({maxWidth:$('header').width()})

        var anime_element = $("<div class='anime_element'></div>");

        let old_img =  n_img(img_page)

        old_img.clone().appendTo(anime_element);
        old_img.hide();
        $('.img-container').append(anime_element);
        anime_element.animate({marginLeft: '100%',opacity:0 }, 1500, function() {$(this).remove();})

        if (img_page==1){
            img_page=max_page;
        } else{
            img_page -=1;
        }

        n_img(img_page).show().css({position: 'relative',left: '-100%',opacity:'0', display:'flex'}).animate({left: 0,opacity:1 }, 1500)

        $('.but-nav').slice(img_page-1, img_page).addClass('but-nav-active');

        setTimeout(function() {
            $('header').css({maxWidth:'none'})
        }, 1500);
    });

    
    $('.img-next').on('click', function(){

        $('.but-nav-active').removeClass('but-nav-active');

        $('header').css({maxWidth:$('header').width()})

        var anime_element = $("<div class='anime_element'></div>");

        let old_img =  n_img(img_page)

        old_img.clone().appendTo(anime_element);
        old_img.hide();
        $('.img-container').append(anime_element);
        anime_element.animate({marginLeft: '-100%',opacity:0 }, 1500, function() {$(this).remove();})
        

        if (img_page==max_page){
            img_page=1;
        } else{
            img_page +=1;
        }
       n_img(img_page).show().css({position: 'relative',left: '100%',opacity:'0', display:'flex'}).animate({left: 0,opacity:1 }, 1500)

       $('.but-nav').slice(img_page-1, img_page).addClass('but-nav-active');

       setTimeout(function() {
        $('header').css({maxWidth:'none'})
    }, 1500);
    });


    function n_img(n){
        let img
        img =  $('.img-block').slice(n-1, n);
        return img
    }

    $('.button-img-nav').append('<div class="but-nav but-nav-active"></div>');

    for (let j = 2; j < max_page+1; j++) {
        let newButton = $('<div class="but-nav"></div>');
        $('.button-img-nav').append(newButton);
    }

    

    n_img(img_page).hide().css({display:'flex'});
}

    $('.img-block').on('click', function(){
        $('#fullimg').modal('show');
        $('#fullimg').css({'display':'flex'})
        $('.modal-img-container').empty();
        $('.modal-img-container').append($(this).find('img').clone());
    });

});