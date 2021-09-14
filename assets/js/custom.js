(function ($) {

	"use strict";

	$(window).on("scroll", function () {
		AOS.init({
			disable: 'mobile',
			duration: 800,
			anchorPlacement: 'center-bottom'
		});
	});

	
// Header Type = Fixed
$(window).scroll(function () {
	var scroll = $(window).scrollTop();
	var box = $('.header-text').height();
	var header = $('header').height();
  
	if (scroll >= box - header) {
	  $("header").addClass("background-header");
	} else {
	  $("header").removeClass("background-header");
	}
  });
  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
	$(".menu-trigger").on('click', function () {
	  $(this).toggleClass('active');
	  $('.header-area .nav').slideToggle(200);
	});
  }
  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  if (target.length) {
		var width = $(window).width();
		if (width < 991) {
		  $('.menu-trigger').removeClass('active');
		  $('.header-area .nav').slideUp(30);
		}
		$('html,body').animate({
		  scrollTop: (target.offset().top) + 1
		}, 900);
		return false;
	  }
	}
  });
  
  $(document).ready(function () {
	$(document).on("scroll", onScroll);
  
	//smoothscroll
	$('.scroll-to-section a[href^="#"]').on('click', function (e) {
	  e.preventDefault();
	  $(document).off("scroll");
  
	  $('.scroll-to-section a').each(function () {
		$(this).removeClass('active');
	  })
	  $(this).addClass('active');
  
	  var target = this.hash,
		menu = target;
	  var target = $(this.hash);
	  $('html, body').stop().animate({
		scrollTop: (target.offset().top) + 1
	  }, 500, 'swing', function () {
		window.location.hash = target;
		$(document).on("scroll", onScroll);
	  });
	});
  });
  
  function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$('.nav a').each(function () {
	  var currLink = $(this);
	  var refElement = $(currLink.attr("href"));
	  if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
		$('.nav ul li a').removeClass("active");
		currLink.addClass("active");
	  } else {
		currLink.removeClass("active");
	  }
	});
  }
  // Window Resize Mobile Menu Fix
  function mobileNav() {
	var width = $(window).width();
	$('.submenu').on('click', function () {
	  if (width < 767) {
		$('.submenu ul').removeClass('active');
		$(this).find('ul').toggleClass('active');
	  }
	});
  }

})(window.jQuery);

//tokenomics info slider 
$(document).ready(function () {

	$('.items').slick({
		dots: true,
		infinite: true,
		speed: 900,
		autoplay: false,
		autoplaySpeed: 2000,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}

		]
	});
});
//countUp
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from: $(this).data('from'),
				to: $(this).data('to'),
				speed: $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals: $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof (settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof (settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0, // the number the element should start at
		to: 0, // the number the element should end at
		speed: 1000, // how long it should take to count between the target numbers
		refreshInterval: 100, // how often the element should be updated
		decimals: 0, // the number of decimal places to show
		formatter: formatter, // handler for formatting the value before rendering
		onUpdate: null, // callback method for every time the element is updated
		onComplete: null // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
	// custom formatting example
	$('.count-number').data('countToOptions', {
		formatter: function (value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	});

	// start all the timers
	$('.timer').each(count);

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
});


//Google prie chart
google.charts.load('current', {
	'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	var data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Lauch Allocation', 40],
		['Burnt on lauch', 40],
		['Presale Allocation', 20]

	]);

	var options = {
		title: 'Token Distribution',
		width: '100%',
		height: '500px',
		backgroundColor: 'transparent',
		margin: '0px auto',
		titleTextStyle: {
			color: 'white'
		},
		is3D: true,
		legend: {
			position: 'labeled',
			textStyle: {
				color: 'white', // sets the text color
			}
		}


	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}


///maib-banner moon parallax
function parallax(element, distance, speed) {

	const item = document.querySelector(element);

	item.style.transform = `translateY(${distance * speed}px)`;
	item.style.transition = '2.5s ease all';

};

window.addEventListener('scroll', function () {
	parallax('.star-img', window.scrollY, 0.3);

})
