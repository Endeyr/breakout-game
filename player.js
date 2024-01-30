export default class Player {
	constructor(game) {
		this.game = game
		this.width = 112
		this.height = 18
		this.x = (this.game.width - this.width) * 0.5
		this.y = this.game.height - this.height - this.game.groundMargin
		this.image = document.getElementById('paddle')
		this.speed = 0
		this.maxSpeed = 20
	}
	update(input) {
		this.checkCollision()
		// horizontal movement
		this.x += this.speed
		if (input.includes('ArrowRight') || input.includes('d')) {
			this.speed = this.maxSpeed
		} else if (input.includes('ArrowLeft') || input.includes('a')) {
			this.speed = -this.maxSpeed
		} else this.speed = 0
		// horizontal boundaries
		if (this.x < 0) this.x = 0
		if (this.x > this.game.width - this.width) {
			this.x = this.game.width - this.width
		}
	}
	draw(context) {
		context.drawImage(
			this.image,
			0,
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
			// middle of paddle
			if (
				ball.x > this.x + 36 &&
				ball.x < this.x + this.width - 36 &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				if (ball.vx === 0) {
					ball.vy = -15
				} else {
					ball.vy = -15
					ball.xy *= -1
				}
			} // left of paddle
			else if (
				ball.x > this.x &&
				ball.x < this.x + 34 &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				ball.vy = -15
				ball.vx = -15
			} // right of paddle
			else if (
				ball.x > this.x + this.width - 34 &&
				ball.x < this.x + this.width &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				ball.vy = -15
				ball.vx = 15
			}
		})
	}
}
