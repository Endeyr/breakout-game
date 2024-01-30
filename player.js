export default class Player {
	constructor(game) {
		this.game = game
		this.width = 112
		this.height = 18
		this.x = (this.game.width - this.width) * 0.5
		this.y = this.game.height - this.height - this.game.groundMargin
		this.image = document.getElementById('paddle')
		this.speed = 0
		this.maxSpeed = 10
	}
	update(input) {
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
	checkCollision() {}
}
