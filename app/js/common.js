$(function() {

	$(".main-head__nav .sf-menu > sf-menu__link").superfish();

	var owl = $(".owl-carousel");
	owl.owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 10000,
		autoplayHoverPause: true,
		autoplaySpeed: 2500,
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
	$("#my-menu").find("*").attr("style", "");
	$("#my-menu").find("ul").removeClass("sf-menu");
	$("#my-menu").mmenu({
		extensions: [ 'theme-white', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: "МЕНЮ"
		}
	});

	var api = $("#my-menu").data("mmenu");
	api.bind("closed", function() {
		$(".mob-menu").removeClass("on");
	});

	$(".mob-menu").click(function() {
		var mmAPI = $('#my-menu').data("mmenu");
		mmAPI.open();
		var thiss = $(this).find(".mob-menu__btn");
		thiss.toggleClass("on");
		$("main-menu").slideToggle();
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
