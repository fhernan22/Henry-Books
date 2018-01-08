$(document).ready(function() {
	"use strict";

	/*==================================================================================
	Make window fulls creen
	==================================================================================*/
	var windowHeight = $(window).height();	//Get height of window

	$('.fullpage').css('height', windowHeight);	//Make page full height of window

	//Replace IMG images inside hero section with background images
	$('#hero .item img').each(function() {
		var imageSource = $(this).attr('src');

		$(this).parent().css({'background-image': 'url('+imageSource+')',
							'background-attachment': 'fixed'});

		$(this).remove();
	});

	$(window).resize(function () {
		windowHeight = $(window).height();

		$('.fullpage').css('height', windowHeight);

	});

	/*==================================================================================
	Change active link of navigation on click
	==================================================================================*/

	var url = window.location;

	$('ul.nav a').filter(function() {
    	return this.href == url;
	}).parent().addClass('active');



	var currentPath = window.location.pathname;

	if (currentPath == "/") {
		$('body').css('padding-top', 0);

		$('header .navbar-default .navbar-nav .active a').css('border-bottom', '5px solid #28485a');

		$('header .navbar-default').css({
										'background': 'transparent',
										'border': 'none',
										'box-shadow': 'none' 
										});
	}
})