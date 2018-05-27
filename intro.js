(function() {
	'use strict';

	var header = document.querySelector('header');
	var pip = document.querySelector('.header__pip');
	var spotlight = document.querySelector('.header__spotlight');
	var logo = document.querySelector('.header__logo');
	var barbarian = document.querySelector('.header__barbarian');
	var torches = document.querySelectorAll('.header__torch');
	var torchLights = document.querySelectorAll('.header__torch-light');
	var animationDone = false;
	var introEnd = false;
	var spotlightScaleStart = 8;
	var spotlightScaleEnd = 30;
	var spotlightScale = spotlightScaleStart;
	var centerScreenX = window.innerWidth * .5;
	var blendingAvailable = (window.getComputedStyle(document.body).mixBlendMode !== undefined);

	pip.addEventListener('animationend', function() {
		spotlight.classList.add('is-revealed');
		logo.classList.add('is-visible');
		barbarian.classList.add('is-active');

		logo.addEventListener('transitionend', function() {
			header.classList.add('shake');
		});

		setTimeout(function() {
			torches[0].classList.add('is-lit');
			torchLights[0].classList.add((blendingAvailable ? 'is-lit' : 'is-lit-ie'));
		}, 350);

		setTimeout(function() {
			torches[1].classList.add('is-lit');
			torchLights[1].classList.add((blendingAvailable ? 'is-lit' : 'is-lit-ie'));
		}, 550);

		animationDone = true;
	});

	function animationStep(timestamp) {
		var locationX;
		var locationY;

		if (!animationDone) {
			var pipPosition = pip.getBoundingClientRect();
			locationX = pipPosition.left + pipPosition.width * .5 + 'px';
			locationY = pipPosition.top + pipPosition.height * .5 + 'px';
			spotlightScale = spotlightScaleStart + (Math.random() - Math.random()) * .3;
		} else {
			locationX = centerScreenX + 'px';
			locationY = '60%';
			spotlightScale += (spotlightScaleEnd - spotlightScale) * .1;

			if (spotlightScale > spotlightScaleEnd - 1) {
				introEnd = true;
			}
		}

		spotlight.style.backgroundImage =
			'radial-gradient(circle at ' +
			locationX + ' ' +
			locationY + ',' +
			'transparent ' + (spotlightScale * .3) + 'rem,' +
			'rgba(0, 0, 0, 0.15) ' + (spotlightScale * .6) + 'rem,' +
			'rgba(0, 0, 0, 0.85) ' + spotlightScale + 'rem)';

		if (!introEnd) {
			window.requestAnimationFrame(animationStep);
		}
	}

	window.addEventListener('resize', function() {
		centerScreenX = window.innerWidth * .5;
		animationStep()
	});

	window.requestAnimationFrame(animationStep);
})();
