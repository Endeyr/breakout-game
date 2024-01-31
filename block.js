export default class Block {
	constructor(game, x, y, frameX) {
		this.game = game
		this.width = 61
		this.height = 28
		this.x = x
		this.y = y
		this.image = document.getElementById('blocks')
		this.frameX = frameX
		this.maxFrame = 7
		this.markedForDeletion = false
	}
	update() {
		this.checkCollision()
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.frameX * this.width,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	checkCollision() {
		this.game.balls.forEach((ball) => {
			// console.log('Ball: ', ball.x, ball.y, 'Block: ', this.x, this.y)
			// top of block
			// if (
			// 	ball.x > this.x &&
			// 	ball.x < this.x + this.width &&
			// 	ball.y + ball.height < this.y
			// ) {
			// 	if (ball.vy === 0) {
			// 		ball.vy = -this.game.bounceSpeed
			// 	} else {
			// 		ball.vy = -ball.vy
			// 	}
			// 	ball.vx = -ball.vx
			// 	this.markedForDeletion = true
			// } // bottom of block
			// else if (
			// 	ball.x > this.x &&
			// 	ball.x < this.x + this.width &&
			// 	ball.y + ball.height < this.y + this.height
			// ) {
			// 	console.log('bot')
			// 	if (ball.vy === 0) {
			// 		ball.vy = -this.game.bounceSpeed
			// 	} else {
			// 		ball.vy = -ball.vy
			// 	}
			// 	ball.vx = -ball.vx
			// }
			// // left of block
			// else if (
			// 	ball.x > this.x &&
			// 	ball.x < this.x &&
			// 	ball.x + ball.width > this.x &&
			// 	ball.y < this.y + this.height &&
			// 	ball.y + ball.height > this.y
			// ) {
			// 	ball.vy = -this.game.bounceSpeed
			// 	ball.vx = -this.game.bounceSpeed
			// } // right of block
			// else if (
			// 	ball.x > this.x + this.width &&
			// 	ball.x < this.x + this.width &&
			// 	ball.x + ball.width > this.x &&
			// 	ball.y < this.y + this.height &&
			// 	ball.y + ball.height > this.y
			// ) {
			// 	ball.vy = -this.game.bounceSpeed
			// 	ball.vx = this.game.bounceSpeed
			// }
		})
	}
}
