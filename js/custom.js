$(document).ready(function () {
  var mySwiper = new Swiper ('.swiper-container', {
   	slidesPerView: 4,
   	pagination: '.swiper-pagination',
	paginationClickable: true,
    spaceBetween: 8,
    freeMode: false,
    loop: true,
   	navigation: {
        nextEl: '.arrow-right-position',
        prevEl: '.arrow-left-position',
      },
  })
});
