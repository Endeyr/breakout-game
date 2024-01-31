export function detectCollision(a, b) {
	return (
		a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
		a.x + a.width > b.x && //a's top right corner passes b's top left corner
		a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
		a.y + a.height > b.y
	) //a's bottom left corner passes b's top left corner
}

export function topCollision(ball, block) {
	//a is above b (ball is above block)
	return detectCollision(ball, block) && ball.y + ball.height >= block.y
}

export function bottomCollision(ball, block) {
	//a is above b (ball is below block)
	return detectCollision(ball, block) && block.y + block.height >= ball.y
}

export function leftCollision(ball, block) {
	//a is left of b (ball is left of block)
	return detectCollision(ball, block) && ball.x + ball.width >= block.x
}

export function rightCollision(ball, block) {
	//a is right of b (ball is right of block)
	return detectCollision(ball, block) && block.x + block.width >= ball.x
}

export function filterByProperty(array, prop, value) {
	let i,
		j,
		hash = [],
		item

	for (i = 0, j = array.length; i < j; i++) {
		item = array[i]
		if (typeof item[key] !== 'undefined' && item[key] === value) {
			hash.push(item)
		}
	}

	return hash
}
