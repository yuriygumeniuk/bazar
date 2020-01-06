$(document).ready(function () {

  $('.link__item a').click(function(){
    $(this).parents('.nav-link-list').find('.link__item').removeClass('active');
    $(this).parent().addClass('active');
    return false
  });

  var mySwiper = new Swiper ('.swiper-container', {
   	roundLengths: true,
   	slidesPerView: 4,
	slidesPerGroup: 3,
	speed: 2000,
    spaceBetween: 8,
    freeMode: false,
    loop: true,
   	navigation: {
        nextEl: '.arrow-right-position',
        prevEl: '.arrow-left-position',
      },
  })
  var mySwiper = new Swiper ('.new-block', {
   	roundLengths: true,
   	slidesPerView: 4,
    spaceBetween: 22,
    freeMode: false,
    loop: true,
    speed: 1500,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
   	navigation: {
        nextEl: '.arrow-right-position',
        prevEl: '.arrow-left-position',
      },
  })

});
