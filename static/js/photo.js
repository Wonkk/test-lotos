
$(document).ready(function(){

    
let buttime;

$('.img-block').on('mousedown', function(){
    let currentTime = new Date();
    buttime = currentTime.getTime()+100;
});

$('.img-block').on('mouseup', function(){
    let currentTime = new Date();
    let mouseuptime = currentTime.getTime();
    if(buttime > mouseuptime){
        $('#fullimg').modal('show');
        $('.modal-img-container').empty();
        $('.modal-img-container').append($(this).find('img').clone());
    };
})


var isMouseDown = false;
var startX, scrollLeft;

$('.slider-photo').mousedown(function(e) {
  isMouseDown = true;
  startX = e.pageX - $(this).offset().left;
  scrollLeft = $(this).scrollLeft();
}).mousemove(function(e) {
  if (!isMouseDown) return;
  e.preventDefault();
  var x = e.pageX - $(this).offset().left;
  var walk = (x - startX) * 1; // Чувствительность прокрутки
  $(this).scrollLeft(scrollLeft - walk);
});

$(document).mouseup(function() {
  isMouseDown = false;
});

$('.slider-video').mousedown(function(e) {
    isMouseDown = true;
    startX = e.pageX - $(this).offset().left;
    scrollLeft = $(this).scrollLeft();
  }).mousemove(function(e) {
    if (!isMouseDown) return;
    e.preventDefault();
    var x = e.pageX - $(this).offset().left;
    var walk = (x - startX) * 1; // Чувствительность прокрутки
    $(this).scrollLeft(scrollLeft - walk);
  });
  
  $(document).mouseup(function() {
    isMouseDown = false;
  });

$('.more-video').on('click', function(){
    if ($('.slider-video').css('display') === 'none'){
    $('.slider-video').slideDown(1000).css({'display':'flex'});
    } else{
        $('.slider-video').slideUp(1000);
    }
})

if ($(window).width() > 900){
    $('iframe').removeAttr("loading");
} else {
    $('.slider-video').remove();
}

    $('.slider-photo').on('scroll', function() {
        var block = $('.slider-photo'); // Получаем первый элемент с jQuery
        var scroll= block.scrollLeft() / block.prop('scrollWidth') *100;
        $('.scroll-bar').css({'left': scroll+'%'})
})

    $('.img-block img').on('load', function() {
        var imgWidth = $(this).width(); // Получаем ширину загруженного изображения
        $(this).parent('.img-block').width(imgWidth); // Применяем ширину к родительскому блоку
    });
})
