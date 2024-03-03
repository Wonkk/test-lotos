$(document).ready(function(){

    $('.frame-reso').on('click', function(){
        if ($(this).find('.frame-reso-description').css('display') === 'none'){
            $(this).find('.frame-reso-description').slideDown(1000);
        } else {
            $(this).find('.frame-reso-description').slideUp(1000);
        }
    })

    var img_page = 1;

    if ($(window).width() > 959){
    var max_page = Math.ceil($('.img-block').length / 2)
    } else {
        var max_page = $('.img-block').length;
    }



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

        setTimeout(function() {
            $('header').css({maxWidth:'none'})
        }, 1500);
    });

    
    $('.img-next').on('click', function(){

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


       setTimeout(function() {
        $('header').css({maxWidth:'none'})
    }, 1500);
    });


    function n_img(n){
        let img
        if ($(window).width() > 959){
            img =  $('.img-block').slice(n*2-2, n*2);
        } else {
            img =  $('.img-block').slice(n-1, n);
        }
        return img
    }

    n_img(img_page).hide().css({display:'flex'});

    $('.title-help').on('click', function(){
        if ($(this).parent().find('.text-help').css('display') === 'none'){
            $('.text-help').each(function() {$(this).slideUp(1000);});
            $(this).parent().find('.text-help').slideUp(1000);
        $(this).parent().find('.text-help').slideDown(1000);
        } else {
            $(this).parent().find('.text-help').slideUp(1000);
        }
    });

})