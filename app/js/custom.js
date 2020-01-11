$(document).ready(function () {

	if($(window).width() <= 599) {
		$('meta[name="viewport"]').remove();  
		console.log('run');
		$('head').append( '<meta name="viewport" content="width=599, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
	}
	window.addEventListener("resize", function() {
		if($(window).width() <= 599) {
			if ($('meta[name=viewport]').is('[content^="width=device-width"]')) {
				$('meta[name=viewport]').remove();
				$('head').append( '<meta name="viewport" content="width=599, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
			}
		}
		else {
			if ($('meta[name=viewport]').is('[content^="width=599"]')) {
				$('meta[name=viewport]').remove();
				$('head').append( '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
			}
		}
	}, false);


  $('.link__item a').click(function(){
	$(this).parents('.nav-link-list').find('.link__item').removeClass('active');
	$(this).parent().addClass('active');
	return false
  });

  // Open tabs
  $('.description-bar__item').click(function(){
	$(this).parents('.description').find('.review__item').addClass('hidden');
	$(this).parents('.description').find('.description-bar__item').removeClass('active');
	$(this).addClass('active');
	var id = $(this).attr('href');
	$(id).removeClass('hidden');
	return false
  });
  // ==============
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
  });
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
  });
// ===============================================================
//FORMS
function forms(){
	console.log('run forms()');
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				console.log('data-value');
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			console.log('function click'); 
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			console.log('blur');
			if (this.value == '') {
				if(!$(this).hasClass('l')){
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});
}
forms();

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
	var er=0;
	var form=$(this).parents('form');
	console.log(form);
	var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError_s(form);
		console.log('removeFormError_s' + form);
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
	var er=0;
	var form=input.parents('form[name="review"]');
	console.log('validate');
	if(input.attr('name')=='email' || input.hasClass('email')){
		console.log('is email');
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			console.log('remove err email');
			removeError(input);
		}
	}
	else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			console.log('add error email');
			addError(input);
		}else{
			removeError(input);
			console.log('remove err email');
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-\s]+$/.test(input.val()))){
			er++;
			console.log('formValidate(name) er='+ er);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
	return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	console.log('clear');
	$.each(form.find('.input'), function(index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
	input.addClass('err');
	// input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
	var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormError_s(form){
	console.log('removeFormError_s removeClass(err)')
	form.find('.err').removeClass('err');
	form.find('.form__error').remove(); 
}
// ===============================================================

});
