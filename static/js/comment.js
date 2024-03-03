$(document).ready(function(){
    $('.star-block').each(function(){
       let star_val = $(this).find('input').val();
       $(this).find('.star-choice').slice(star_val).addClass('star-nochoice');
    })
 })



$(document).ready(function(){
    $('.comment-write-button').on('click', function(){
       if ($('.comment-write-button').data('open')){
          let er = 0;
          if ($("#username-comment").val().length<2){
             $("#username-comment").css({'border-color': 'red'});
             setTimeout(function(){$("#username-comment").removeAttr('style');}, 2000);
             er += 1;
          }
          if ($('#star-block-post input').val()<1){
             $("#star-block-post div").css({'border-bottom': '1px solid red'});
             setTimeout(function(){$("#star-block-post div").removeAttr('style');}, 2000);
             er += 1;
          }
          if ($('.input-description-block textarea').val()<3){
             $(".input-description-block textarea").css({'border-color': 'red'});
             setTimeout(function(){$(".input-description-block textarea").removeAttr('style');}, 2000);
             er += 1;
          }
          if (er==0){         
             let csrfToken = $('input[name="csrfmiddlewaretoken"]').val(); 
             jQuery.ajax({
                url: '/ajax/',
                method: "POST",
                data: {
                   csrfmiddlewaretoken: csrfToken,
                   type: 'comment',
                   name: $("#username-comment").val(),
                   star:$('#star-block-post input').val(),
                   description:$('.input-description-block textarea').val()
                },
                success: function (data, textStatus){
                   if (data['status'] == 'error'){
                      if (data['eror']=='name'){
                         $("#username-comment").css({'border-color': 'red'});
                         setTimeout(function(){$("#username-comment").removeAttr('style');}, 2000);
                      } 
                      if (data['eror']=='description'){
                         $(".input-description-block textarea").css({'border-color': 'red'});
                         setTimeout(function(){$(".input-description-block textarea").removeAttr('style');}, 2000);
                      }
                      if (data['eror']=='star'){
                         $("#star-block-post div").css({'border-bottom': '1px solid red'});
                         setTimeout(function(){$("#star-block-post div").removeAttr('style');}, 2000);
                      }
                   } 
                   if (data['status'] == 'ok'){
                      $('#commentsuccess').modal('show');
                      $('.comment-form').slideUp(1000);
                      $('.comment-write-button').data('open', false);
                      $("#username-comment").val('');
                      $('#star-block-post input').val(0);
                      $('.input-description-block textarea').val('');
                   }
             }
          })
          }
       }else{
          $('.comment-form').slideDown(1000);
          $('.comment-write-button').data('open', true)
       }
    });
 
    $('#star-block-post div').on('click', function(){
       let star = $(this).data('star');
       $('#star-block-post input').val(star)
       $('#star-block-post div').removeClass('star-nochoice');
       $('#star-block-post div').slice(star).addClass('star-nochoice');
    });
 
    
    $('.comment').each(function(){
       let sing = $(this).find('.comment-text-full').text();
       if (sing.length>200){
          sing = sing.slice(0, 200) + "...  ";
          $(this).find('.comment-text').text(sing);
          $(this).find('.comment-text').append("<div class='read-block'> Читать дальше</div>");
       } else{
       $(this).find('.comment-text').text(sing);
       }
    });
 
    $('.read-block').on('click', function(){
       $('#read').modal('show');
       $('.modal-comment').find('.comment-profil').text($(this).parent().parent().find('.comment-profil').text())
       $('.modal-comment').find('.comment-date').text($(this).parent().parent().find('.comment-date').text())
       $('.modal-comment').find('.comment-text').text($(this).parent().parent().find('.comment-text-full').text())
       $('#modal-comment-star div').removeClass('star-nochoice');
       let modelstar = $(this).parent().parent().find('.star-block input').val();
       $('#modal-comment-star div').slice(modelstar).addClass('star-nochoice');
    })



})