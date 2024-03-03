if ($(window).width() > 900){
$(window).scroll(function() {
   if ($(window).scrollTop()>50){
    $('header .logo').slideUp(); 
   } else{
    $('header .logo').slideDown(); 
   }
})
}

 $(document).ready(function(){
    $('#reso-phone').inputmask({"mask": "+7 (999) 999-99-99"});
  });

 $(document).ready(function(){
    $('#submit-reso').on('click', function(){
         let phone = $('#reso-phone').val().replace(/\D/g,'')
         let name = $('#reso-name').val()
         let er = 0;
         if (name.length<3){
            $('#reso-name').css({'border-color': 'red'});
            setTimeout(function(){$('#reso-name').removeAttr('style');}, 2000);
            er += 1;
           }
         if (phone.length<11){
            $('#reso-phone').css({'border-color': 'red'});
            setTimeout(function(){$('#reso-phone').removeAttr('style');}, 2000);
            er += 1;
         }
         if (er == 0){
            let csrfToken = $('input[name="csrfmiddlewaretoken"]').val(); 
            jQuery.ajax({
               url: '/ajax/',
               method: "POST",
               data: {
                  csrfmiddlewaretoken: csrfToken,
                   type: 'reso',
                   name: name,
                   phone:phone
               },
               success: function (data, textStatus){
                  if (data['status'] == 'error'){
                     if (data['eror']=='name'){
                        $('#reso-name').css({'border-color': 'red'});
                        setTimeout(function(){$('#reso-name').removeAttr('style');}, 2000);
                     } else {
                        $('#reso-phone').css({'border-color': 'red'});
                        setTimeout(function(){$('#reso-phone').removeAttr('style');}, 2000);
                     }
                  } 
                  if (data['status'] == 'ok'){
                     $('#resomodal').modal('hide');
                     $('#resosuccess').modal('show');
                  }
              }
           })
         }
         })

      
         $('.btn-nav').on('click', function(){
            $('.nav-page-container').slideDown(1000).css({'display': 'flex'});
         })

         $('.nav-exit').on('click', function(){
            $('.nav-page-container').slideUp(1000);
         })

         $('.nav-select-page').on('click', function(){
            if ($('.nav-select-page-block').css('display') === 'none'){
            $('.nav-select-page-block').slideDown(1000).css({'display': 'flex'});
            } else{
               $('.nav-select-page-block').slideUp(1000);
            }
         })
         let urlParams = new URLSearchParams(window.location.search);
         let bValue = urlParams.get('back');
         if (bValue){$('.back-button-nav').show()}
   });