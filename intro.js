(function() {
	var header = document.querySelector('header');
	var spotlight = document.querySelector('.header__spotlight');
	var pip = document.querySelector('.header__pip');
	var logo = document.querySelector('.header__logo');
	var torches = document.querySelectorAll('.header__torch');
	var torchLights = document.querySelectorAll('.header__torch-light');
	var animationDone = false;
	var introEnd = false;
	var spotlightScale = 8;
	var spotlightScaleEnd = 40;

	pip.addEventListener('animationend', function() {
		spotlight.classList.add('is-revealed');
		logo.classList.add('is-visible');

		logo.addEventListener('transitionend', function() {
			header.classList.add('quake');
		});

		setTimeout(function() {
			torches[0].classList.add('is-lit');
			torchLights[0].classList.add('is-lit');
		}, 350);

		setTimeout(function() {
			torches[1].classList.add('is-lit');
			torchLights[1].classList.add('is-lit');
		}, 550);

		animationDone = true;
	});

	function animationStep(timestamp) {
		var pipPosition = pip.getBoundingClientRect();

		if (animationDone) {
			spotlightScale += (spotlightScaleEnd - spotlightScale) * .1;

			if (spotlightScale > spotlightScaleEnd - 1) {
				introEnd = true;
			}
		}

		spotlight.style.backgroundImage =
		'radial-gradient(circle at ' +
		(pipPosition.left + pipPosition.width * .5) + 'px ' +
		(pipPosition.top + pipPosition.height * .5) + 'px,' +
		'transparent ' + (spotlightScale * .3) + 'rem,' +
		'rgba(0, 0, 0, 0.15) ' + (spotlightScale * .6) + 'rem,' +
		'rgba(0, 0, 0, 0.85) ' + spotlightScale + 'rem)';


		if (!introEnd) {
			window.requestAnimationFrame(animationStep);
		}
	}

	window.addEventListener('resize', animationStep);

	window.requestAnimationFrame(animationStep);
})();
