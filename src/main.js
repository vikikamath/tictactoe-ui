
// constants
const NEW_GAME = 'New Game'
const RESET = 'Reset'
const X = 'x'
const O = 'o'
const wins = [
	// horizontal
	[[0,0], [0,1], [0,2]]
	,[[1,0], [1,1], [1,2]]
	,[[2,0], [2,1], [2,2]]

	// vertical
	,[[0,0], [1,0], [2,0]]
	,[[0,1], [1,1], [2,1]]
	,[[0,2], [1,2], [2,2]]

	// diagonal
	,[[0,0], [1,1], [2,2]]
	,[[0,2], [1,1], [2,0]]
]



// DOM references
const $button = document.querySelector('.button')
const $board = document.querySelector('.board')
const $nextMove = document.querySelector('.nextmove')
const $modal = document.querySelector('.modal')
const $modalText = document.querySelector('.modal .text')

// Util functions
const isCellEmpty = (x, y) => ! state[x][y]
const isGameOver = (move) => {

	if (!movesRemaining) return true

	const status = wins.some((combination) => {

		let sum = combination.reduce((agg, position) => {
			let ref = state[position[0]][position[1]]
			agg += ( ref === 'x' ? -1 : ref === 'o' ? 1: 0)
			return agg
		}, 0)

		//console.log(sum);
		return Math.abs(sum) > 2;
	})

	return status

}
const otherMove = (move) => move === X ? O : X
const setNextMove = ($el, nxtMove) => {
	// reset nextMove
	$el.children[0].classList.remove(otherMove(nxtMove))
	$el.children[0].textContent = nxtMove
	$el.children[0].classList.add(nxtMove)
	nextMove = nxtMove;
}


function boardEvtHandler(e) {

	const id = e.target.id ;
	const position = id && id.split(',');

	if ( position.length === 2  && isCellEmpty(...position)) {


		state[position[0]][position[1]] = nextMove

		// update DOM
		$board.children[position[0]].children[position[1]].textContent = nextMove
		$board.children[position[0]].children[position[1]].classList.add(nextMove)

		// update # of movesRemaining
		movesRemaining -= 1

		setNextMove($nextMove, otherMove(nextMove))


		if (isGameOver(nextMove)) {
			// change button text
			$button.textContent = NEW_GAME

			// remove board listener
			$board.removeEventListener('click', boardEvtHandler, false);

			// show modal
			$modalText.textContent = otherMove(nextMove).toUpperCase() + ' WINS!'
			$modal.style.display = 'block'

		}

	}

}

// variables
let movesRemaining = 9
let state = [[undefined, undefined, undefined]
			,[undefined, undefined, undefined]
			,[undefined, undefined, undefined]];
let nextMove = X


// attach handlers

$button.addEventListener('click', function(e) {
	// reset button
	$button.textContent = RESET

	// clear board
	state.forEach((row, ri) => {

		row.forEach((cell, ci) => {
			delete state[ri][ci]
			// remove class "x" or "o"
			$board.children[ri].children[ci].classList.remove("x");
			$board.children[ri].children[ci].classList.remove("o");

			// delete data
			$board.children[ri].children[ci].textContent = undefined
		})
	})

	// reset remaining moves
	movesRemaining = 9


	// setNextMove
	setNextMove($nextMove, X)

	// re-attach board listener
	$board.addEventListener('click', boardEvtHandler, false)

})

$board.addEventListener('click', boardEvtHandler, false)
$modal.addEventListener('click', () => $modal.style.display = 'none')
