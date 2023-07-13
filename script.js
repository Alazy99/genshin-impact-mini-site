'use strict';

const dayTimer = document.querySelector('.day-timer');
const labelTimer = document.querySelector('.timer');
const mainTimer = document.querySelector('.maintenance-timer');

/////////////////////////////////////////////////////
// Genshin Countdown Code

const hourTime = function (difference) {
	const hours = String(
		Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	).padStart(2, 0);
	const minutes = String(
		Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
	).padStart(2, 0);
	const seconds = String(
		Math.floor((difference % (1000 * 60)) / 1000)
	).padStart(2, 0);
	return [hours, minutes, seconds];
};

const maintenaceTimer = function () {
	let timer;
	const timerMain = function () {
		const date_1 = new Date().getTime();
		const date_2 = new Date('August 15, 2023 22:00:00').getTime();

		const differenceTime = date_2 - date_1;
		const [hours, minutes, seconds] = hourTime(differenceTime);

		mainTimer.textContent = `Maintenance Timer: ${hours}:${minutes}:${seconds}`;

		if (differenceTime < 0) {
			clearInterval(timer);
			mainTimer.textContent = `Maintenance ended: 00:00:00`;
		}
	};
	timerMain();

	timer = setInterval(timerMain, 1000);
	return timer;
};

const countDownTimer = function () {
	let timer;
	const tick = function () {
		const countDownDate = new Date('August 15, 2023 17:00:00').getTime();

		const now = new Date().getTime();

		const distance = countDownDate - now;

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const [hours, minutes, seconds] = hourTime(distance);

		labelTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
		dayTimer.textContent = `${days} days till Genshin Impact goes into maintenace`;

		if (distance < 0) {
			clearInterval(timer);
			labelTimer.textContent = `0d 0h 0m 0s`;
			dayTimer.textContent = `0 days till Genshin Impact goes into maintenace`;
			maintenaceTimer();
		}
	};
	tick();

	timer = setInterval(tick, 1000);
	return timer;
};

countDownTimer();

///////////////////////////////////////////////////////
// Tab Component functionality

const tabs = document.querySelectorAll('.genshin__tab');
const tabsContainer = document.querySelector('.genshin__tab-container');
const tabsContent = document.querySelectorAll('.genshin__content');

tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest('.genshin__tab');
	// console.log(clicked);

	// Guard clause
	if (!clicked) return;

	// Activate tab
	tabs.forEach((t) => t.classList.remove('genshin__tab--active'));
	tabsContent.forEach((c) => c.classList.remove('genshin__content--active'));

	// Activate tab
	clicked.classList.add('genshin__tab--active');

	// Activate content area
	// console.log(clicked.dataset.tab);
	document
		.querySelector(`.genshin__content--${clicked.dataset.tab}`)
		.classList.add('genshin__content--active');
});

/////////////////////////////////////////////////////////
// Genshin Randomizer

const btnRandom = document.querySelector('.button');
const characterEl = document.getElementById('character--card');
const characterElement = document.getElementById('character--element');

const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
};

const displayResult = function (text) {
	document.querySelector('.text-result').textContent = text;
};

const genshinNames = new Map([
	[0, 'Shenhe'],
	[1, 'Eula'],
	[2, 'Ganyu'],
	[3, 'Ayaka'],
	[4, 'Yae Miko'],
	[5, 'Raiden Shogun'],
	[6, 'Yelan'],
	[7, 'Yoimiya'],
	[8, 'Hu Tao'],
	[9, 'Nilou'],
	[10, 'Layla'],
	[11, 'Kujou Sara'],
]);

const genshinElements = new Map([
	[0, 'cryo.png'],
	[1, 'cryo.png'],
	[2, 'cryo.png'],
	[3, 'cryo.png'],
	[4, 'electro.png'],
	[5, 'electro.png'],
	[6, 'hydro.png'],
	[7, 'pyro.webp'],
	[8, 'pyro.webp'],
	[9, 'hydro.png'],
	[10, 'hydro.png'],
	[11, 'electro.png'],
]);

let last;
btnRandom.addEventListener('click', function () {
	let numRandom;
	while ((numRandom = Math.trunc(Math.random() * 12)) === last) {
		// console.log('will randomize again');
	}
	// console.log(numRandom);
	last = numRandom;
	characterEl.src = `img/genshin_characters/card-${numRandom}.webp`;

	for (const [key, value] of genshinNames) {
		if (numRandom === key) {
			displayResult(`You got ${value}!`);
		}
	}
	for (const [key, value] of genshinElements) {
		if (numRandom === key) {
			characterElement.src = `img/elements/${value}`;
		}
	}
	if (numRandom >= 10) {
		characterEl.classList.remove('character-img');
		characterEl.classList.add('four-star');
	} else if (numRandom < 10) {
		characterEl.classList.remove('four-star');
		characterEl.classList.add('character-img');
	}
});
