// Preloader
window.onload = function(){
	setTimeout(function(){
		var preloader = document.querySelector('.preloader');
		preloader.classList.add('preloader--hidden');
		setTimeout(function(){
			preloader.style = "visibility: hidden;";
		},1000);
	},1800);
}
// Finish Preloader

document.addEventListener('DOMContentLoaded', function(event) { 

	// Mobile Menu
	var menuList = document.querySelector('.menu__list');
	var menuHamburger = document.querySelector('.menu__humburger');
	menuHamburger.addEventListener('click', function(){
		if (menuList.classList.contains('menu__list--active')) {
			menuHamburger.classList.remove('menu__humburger--open');
			menuList.classList.remove('menu__list--active');
			document.querySelector('body').style = "overflow: visible;";
		}else{
			menuList.classList.add('menu__list--active');
			menuHamburger.classList.add('menu__humburger--open');
			document.querySelector('body').style = "overflow: hidden;";
		}
	});
	// Finish Mobile Menu

	// Show Section After Scroll
	var div = document.querySelectorAll('.service__item, .offer__item'); 
	var obj = {};
	for (var i=0; i<div.length; i++) { 
		div[i].classList.add('hidden');
		var divPosition = div[i].getBoundingClientRect().top;
		obj[i] = divPosition;

	}
	// console.log(obj);
	function checkScroll() {
		// console.log(window.pageYOffset);
		for(var i in obj) { 
			if (document.body.clientWidth > 500 && window.pageYOffset + 600 > obj[i]) {
				div[i].classList.remove('hidden');
				div[i].classList.add('visible');
			}else if(document.body.clientWidth < 500 && window.pageYOffset + 200 > obj[i]){
				div[i].classList.remove('hidden');
				div[i].classList.add('visible');
			}
		}
	}
	window.onscroll = function() {checkScroll()}; 
	// Finish Show Section After Scroll

});

