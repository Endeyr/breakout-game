import { detectCollision } from './utils.js'

export default class Player {
	constructor(game) {
		this.game = game
		this.width = 112
		this.height = 18
		this.x = (this.game.width - this.width) * 0.5
		this.y = this.game.height - this.height - this.game.groundMargin
		this.image = document.getElementById('paddle')
		this.speed = 0
		this.maxSpeed = 15
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
		// game restart
		if (this.game.gameOver) {
			if (input.includes('Enter')) {
				this.game.gameOver = false
			}
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
			const midSection = 36
			const section = 34
			// middle of paddle
			if (
				ball.x < this.x + this.width - section &&
				ball.x + ball.width > this.x + section &&
				ball.y < this.x + this.height &&
				ball.y + ball.height > this.y
			) {
				if (ball.vy <= 0) {
					ball.vy = -this.game.bounceSpeed
				} else {
					ball.vy = -ball.vy
				}
			} // left of paddle
			else if (
				ball.x < this.x + this.width - section - midSection &&
				ball.x + ball.width > this.x &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				if (ball.vy <= 0) {
					ball.vy = -this.game.bounceSpeed
				} else {
					ball.vy = -ball.vy
				}
				ball.vx = -this.game.bounceSpeed * 0.5
			} // right of paddle
			else if (
				ball.x < this.x + this.width &&
				ball.x + ball.width > this.x + section + midSection &&
				ball.y < this.y + this.height &&
				ball.y + ball.height > this.y
			) {
				if (ball.vy <= 0) {
					ball.vy = -this.game.bounceSpeed
				} else {
					ball.vy = -ball.vy
				}
				ball.vx = this.game.bounceSpeed * 0.5
			}
		})
	}
}
