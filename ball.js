export default class Ball {
	constructor(game) {
		this.game = game
		this.width = 12
		this.height = 12
		this.initialOffset = 40
		this.x = (this.game.width - this.width) * 0.5
		this.y =
			this.game.height -
			this.height -
			this.game.groundMargin -
			this.initialOffset
		this.image = document.getElementById('ball')
		this.speed = 0
		this.maxSpeed = 10
		this.vx = 0
		this.vy = 0
		this.weight = 1
	}
	update() {
		this.y += this.vy
		this.x += this.vx
		if (this.y < this.game.height - this.height) {
			this.y += this.weight
		} else {
			this.vy = 0
		}
		// horizontal boundaries
		if (this.x < 0) {
			this.x = 0
			this.vx = this.game.bounceSpeed
		}
		if (this.x > this.game.width - this.width) {
			this.x = this.game.width - this.width
			this.vx = -this.game.bounceSpeed
		}
		// vertical boundaries
		if (this.y >= this.game.height - this.height) {
			this.y = this.game.height + this.height
			this.vx = 0
			this.vy = 0
			this.game.gameOver = true
		}
		// ball bounces off top wall
		if (this.y < 0) {
			this.vy = this.game.bounceSpeed
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
	reset() {
		this.x = (this.game.width - this.width) * 0.5
		this.y =
			this.game.height -
			this.height -
			this.game.groundMargin -
			this.initialOffset
		this.speed = 0
		this.vx = 0
		this.vy = 0
		this.weight = 1
	}
}
