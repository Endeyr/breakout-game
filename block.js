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
			// middle of block
			const section = 20
			if (
				ball.x > this.x + section &&
				ball.x < this.x + this.width - section &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				if (ball.vx === 0) {
					ball.vy = -ball.vy
				} else {
					ball.vy = -ball.vy
					ball.vx *= 1
				}
			} // left of block
			else if (
				ball.x > this.x &&
				ball.x < this.x + section &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				ball.vy = -ball.vy
				ball.vx = -ball.vx
			} // right of block
			else if (
				ball.x > this.x + this.width - section &&
				ball.x < this.x + this.width &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				ball.vy = -ball.vy
				ball.vx = -ball.vx
			}
		})
	}
}
