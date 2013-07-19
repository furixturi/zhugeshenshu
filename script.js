var guaCoins = [0, 0, 0, 0, 0, 0, 0, 1];
var numberCoins = [0, 0, 0, 0, 0, 1];

function getNext(arr){
	return arr.pop() === 1;
}

/**
 * Fisher-Yates Shuffle / Knuth Shuffle
 * courtesy: http://www.htmlblog.us/random-javascript-array
 *
 */
function shuffleArr(arr){
	var shuffeled = arr ? arr.slice(0) : [], i = shuffeled.length, j, temp;
	while(--i){
		j = Math.floor(Math.random()*(i-1));
		temp = shuffeled[i];
		shuffeled[i] = shuffeled[j];
		shuffeled[j] = temp;
	}
	return shuffeled;
}

