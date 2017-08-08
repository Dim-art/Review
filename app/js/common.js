$(function() {

	$(".main-head__nav .sf-menu > sf-menu__link").superfish();

	var owl = $(".owl-carousel");
	owl.owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		items: 1,
		nav: true,
		navText: ""
	});

	 $(".next").click(function(){
		owl.trigger("next.owl.carousel")
	});

	$(".prev").click(function(){
		owl.trigger("prev.owl.carousel")
	});

	$(".play").on("click", function(){
		owl.trigger("play.owl.autoplay",[5000])
	});

	$(".stop").on("click", function(){
		owl.trigger("stop.owl.autoplay")
	});

	$(".sf-menu").after("<div id='my-menu'>");
	$(".sf-menu").clone().appendTo('#my-menu');
	$("#my-menu").mmenu({
		extensions: [ 'theme-white', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: "МЕНЮ"
		}
	});

	var api = $("#my-menu").data("mmenu");
	api.bind("closed", function() {
		$(".toggle-menu").removeClass("on");
	});

	$(".main-head__mob").click(function() {
		var mmAPI = $('#my-menu').data("mmenu");
		mmAPI.open();
		var thiss = $(this).find(".toggle-menu");
		thiss.toggleClass("on");
		$(".main-head__mob").slideToggle();
		return false;
	});


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//smooth scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};
	
	$("img, a").on("dragstart", function(event) { 
		event.preventDefault(); 
	});

});
