$(function() {

	// init

	$.fn.device();
	$.fn.gnbSize();

	navi();
	small_nav();

	main_visual_slider();
	story_slider();

	family_site();
	family_site_mobile();

	scroll_flag();

	intro();
	tab();
	bod_popup();

	// on load

    $(window).on('load', function() {

		$('body').addClass('load');

	});

	// window resize function

	$(window).resize(function() {

		$.fn.device();
		$.fn.gnbSize();

	});

	// gnb pc

	function navi() {

		$('#gnb').on('mouseenter', '> .box > ul > li', function() {
			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li a').removeClass('active');
				$(this).find('a').addClass('active');
				$(this).parents('.h_group').stop().animate({'height': '380px'}, 300);
				$('#gnb .sub_menu').show();
			}
		});

		$('.h_group').on('mouseleave', function() {
			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li a').removeClass('active');
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({'height': '104px'}, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide();
				});
			}
		});

		// gnb keyboard accessibility
		
		$('#gnb').on('focusin', '> .box > ul > li > a', function() {
			if ($('body').data('device') != 'mobile') {
				if ($('.h_group').hasClass('on') == false) {
					$(this).parents('.h_group').stop().animate({'height': '380px'}, 300);
					$('#gnb .sub_menu').show();
				}
			}
		}); 

		$(document).on('focus', '.h_group h1 a, .short-cut ul li a, .btn_link', function() {
			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({'height': '104px'}, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide();
				});
			}
		});

	}
	
	// gnb mobile

	function small_nav() {

		$('.btn_menu').on('click', function() {

			var overflowChk = $('body').css('overflow'),
				deviceHeight = $(window).height();

			if (overflowChk == 'hidden') {

				$('body').css({
					'overflow' : 'visible',
					'height'   : 'auto'
				});

			} else {

				$('body').css({
					'overflow' : 'hidden',
					'height'   : deviceHeight
				});

			}

			$(this).next().stop().animate({'right': '0%'}, 300);
			$('#gnb > .dim').fadeIn();

		});

		$('#gnb > .box').on('click', '> ul > li > a', function() {

			if ($('body').data('device') == 'mobile') {

				$(this).parent().find('> .sub_menu > ul').filter(':not(:animated)').slideToggle();
				$('#gnb > .box > ul > li > .sub_menu > ul').filter(':not(:animated)').slideUp('fast');

				if ($(this).parent().hasClass('current')) {
					$(this).parent().removeClass('current');
					return;
				}

				$('#gnb > .box > ul > li').removeClass('current');
				$(this).parent().toggleClass('current');

			}

		});

		$('#gnb').on('click', '> .dim, > .box > .btn_close', function() {

			$('body').css('overflow','visible');
			$('#gnb > .dim').hide();
			$('#gnb > .box').stop().animate({'right': '-80%'}, 300);
			$('#gnb .btn_menu').focus();

		});

	}

	// main visual slider

	function main_visual_slider() {

		if (!$('body').hasClass('home')) { return; }

		$('.visual').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: 5000
		});

	}

	// story slider (pc)

	function story_slider() {

		if (!$('body').hasClass('home')) { return; }

		$('.story').each(function() {

			var $this = $(this),
				thum = $this.find('.silwel_list'),
				li = thum.find('ul > li'),
				control = $this.find('.control'),
				prev = control.find('a').eq(0),
				next = control.find('a').eq(1),
				arr = [],
				arr_posX = [],
				clickChk = true;

				li.each(function() {
					arr.push($(this));
					arr_posX.push($(this).position().left);
				});

				next.on('click', function(){
					if (clickChk) {
						var obj = arr.shift();
						arr.push(obj);

						storySet(6);
					}
					return false;
				});

				prev.on('click', function() {
					if (clickChk) {
						var obj = arr.pop();
						arr.unshift(obj);

						storySet(7);
					}
					return false;
				});

				function storySet(idx) {

					clickChk = false;

					for (var i=0; i < li.length; i++) {

						if (i == idx) {
							arr[i].css('left',arr_posX[i]);
						} else {
							arr[i].stop().animate({'left': arr_posX[i]}, { queue: false, duration: 600, easing: 'easeInOutCubic',
								complete : function() {
									clickChk = true;
								}
							});
						}
					}

				};

		});

	}

	// top floating

	function scroll_flag() {

		var btnTopFlag = false;

		$(window).scroll( function() {

			if ($(window).scrollTop() > 100) {

				if (!btnTopFlag) {
					$('.btn_top').stop(true).fadeIn(300);
				}
				btnTopFlag = true;
				
			} else {

				if (btnTopFlag) {
					$('.btn_top').stop(true).fadeOut(300);
				}			
				btnTopFlag = false;
			}

		});

	}

	// family site

	function family_site() {

		$('.f_btn').on('click', function() {
			$(this).toggleClass('open');
			$('.f_list').toggleClass('open').slideToggle(300);
		});

		$('.f_list a').on('click', function() {
			$('.f_btn').text($(this).text());
			$(this).toggleClass('open');
			$('.f_list').toggleClass('open').slideToggle(300);
		});

		$('.family .submit').on('click', function() {
			if ($('.f_btn').text() == '행복한') {
				window.open('');
			} else if ($('.f_btn').text() == '요양원') {
				window.open('');
			} else {
				alert('사이트를 선택해 주세요.');
			}
		});

	}

	// family_site (mobile)

	function family_site_mobile() {

		var blog = 0; // 초기값

		$('.f_selector').on('click', function() {

			if (blog == 0) {

				$(this).parent().addClass('on');
				$(this).next().stop().slideDown(300, function() {
					$('html, body').stop().animate({scrollTop:$(this).parent().offset().top}, 600);
				});

				$(this).find('.icon').find('img').attr({
					src: $(this).find('.icon').find('img').attr('src').replace('.png', '_on.png'),
					alt: '열림'
				});
				
				blog = 1;

			} else {

				$(this).parent().removeClass('on');
				$(this).next().stop().slideUp(300);
				$(this).find('.icon').find('img').attr({
					src: $(this).find('.icon').find('img').attr('src').replace('_on.png', '.png'),
					alt: '닫힘'
				});
				
				blog = 0;

			}

		});

	}

	// intro

	function intro() {

		var faq = -1; // 초기값

		$('#faq > li').each( function(q) {
			
			$(this).find('.faq_list').on('click', function() {
			
				if (faq == -1) {
					
					$(this).parent().addClass('on');
					$(this).next().stop().slideDown(300, function() {
						$('html, body').stop().animate({scrollTop:$(this).parent().offset().top - 150}, 600);
					});

					$(this).find('.fr').find('.btn_pannel').html('<em>닫기</em>');

					faq = q;
				
				} else {
				
					if (q != faq) {
					
						$('#faq > li').eq(faq).removeClass('on');
						$('#faq > li').eq(faq).find('.faq_list').next().stop().slideUp(300);
						$('#faq > li').eq(faq).find('.faq_list').find('.fr').find('.btn_pannel').html('<em>더보기</em>');

						faq = q;

						$(this).parent().addClass('on');
						$(this).next().stop(true, true).slideDown(300, function() {
							$('html, body').stop().animate({scrollTop:$(this).parent().offset().top - 150}, 600);
						});

						$(this).find('.fr').find('.btn_pannel').html('<em>닫기</em>');
					
					} else { 
						
						$('#faq > li').eq(faq).removeClass('on');
						$('#faq > li').eq(faq).find('.faq_list').next().stop().slideUp(300);
						$('#faq > li').eq(faq).find('.faq_list').find('.fr').find('.btn_pannel').html('<em>더보기</em>');

						faq = -1;
					
					}
			
				}

			});

		});

	}

	// tab

	function tab() {

		var $tabButtonItem = $('#tab-button li'),
			$tabButtonItema = $('#tab-button li a'),
			$tabSelect = $('#tab-select'),
			$tabContents = $('.tab-contents'),
			activeClass = 'is-active';

		$tabButtonItem.first().addClass(activeClass);
		$tabContents.not(':first').hide();

		// button

		$tabButtonItem.find('a').on('click', function(e) {

			var target = $(this).attr('href');

			$tabButtonItem.removeClass(activeClass);
			$tabButtonItema.removeAttr('title');
			$(this).parent().addClass(activeClass);
			$(this).parent().find('a').attr('title','선택탭');
			$tabSelect.val(target);
			$tabContents.hide();
			$(target).show();
			e.preventDefault();
			
			$('.label').text($(this).text());

		});

		// select
		
		$tabSelect.on('change', function() {

			var target = $(this).val(),
				targetSelectNum = $(this).prop('selectedIndex');

			$tabButtonItem.removeClass(activeClass);
			$tabButtonItem.eq(targetSelectNum).addClass(activeClass);
			$tabContents.hide();
			$(target).show();

			$('.label').text($(this).find('option:selected').text());

		});

	}

	// bod popup

	function bod_popup() {

		$('#updateBtn').on('click', function() {
			$('.bod_pop1').css('display','block');
		});

		$('#deleteBtn').on('click', function() {
			$('.bod_pop2').css('display','block');
		});

		$('.bod_pop2 .OKBtn').on('click', function() {
			$('.bod_pop2').css('display','none');
			$('.del_pop').css('display','block');
		});

		$('.del_pop .OKBtn').on('click', function() {
			$('.del_pop').css('display','none');
			$('.alt_pop').css('display','block');
		});

		$('.alt_pop .OKBtn').on('click', function() {
			$('.alt_pop').css('display','none');
		});

		$('.XBtn').on('click', function() {
			$('.bod_pop1, .bod_pop2, .del_pop, .alt_pop').css('display','none');
		});

	}

});


// device chk

$.fn.device = function() {

	// 스크롤바 width 추가

	var size = $(window).width() + 17; 
		
	if (size < 1024) {
		$('body').data('device','mobile');
	} else if (size > 1024 && size < 1280) {
		$('body').data('device','tablet');
	} else {
		$('body').data('device','pc');
	}

}

// gnb setting

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width(),
		deviceHeight = $(window).height();
	
	if ($('body').data('device') == 'mobile') {

		$('body').css('overflow','visible');
		$('#gnb > .box').css({
			'height'     : deviceHeight,
			'background' : '#424242'
		});
		$('#gnb .sub_menu').show();
		$('#gnb .sub_menu ul').hide();

		if ($('#gnb > .dim').length == 0) {
			$('#gnb').append("<div class='dim' style='display:none;position:absolute;top:-30px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>");
		}

	} else {

		$('body').css('overflow','visible');
		$('#gnb > div').css({
			'height'     : 'auto',
			'background' : 'none'
		});
		$('#gnb > div').css('right','-80%');
		$('#gnb > div > ul > li').removeClass('current');
		$('#gnb .sub_menu').hide();
		$('#gnb .sub_menu ul').show();
		$('#gnb .sub_menu > div > ul').show();
		$('#gnb > .dim').remove();

	}

}

// scroll top 

function scollTopStart() {

	 $('html,body').stop().animate({ scrollTop: 0 }, 600);

}