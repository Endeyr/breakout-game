import {
	bottomCollision,
	leftCollision,
	rightCollision,
	topCollision,
} from './utils.js'

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
			// top of block
			if (topCollision(ball, this)) {
				if (ball.vy === 0) {
					ball.vy = -this.game.bounceSpeed
				} else {
					ball.vy = -ball.vy
				}

				this.markedForDeletion = true
				this.game.score++
			} // bottom of block
			else if (bottomCollision(ball, this)) {
				if (ball.vy === 0) {
					ball.vy = -this.game.bounceSpeed
				} else {
					ball.vy = -ball.vy
				}
				ball.vx = -ball.vx
				this.markedForDeletion = true
				this.game.score++
			}
			// left of block
			else if (leftCollision(ball, this)) {
				ball.vy = -this.game.bounceSpeed
				ball.vx = -this.game.bounceSpeed

				this.markedForDeletion = true
				this.game.score++
			} // right of block
			else if (rightCollision(ball, this)) {
				ball.vy = -this.game.bounceSpeed
				ball.vx = this.game.bounceSpeed

				this.markedForDeletion = true
				this.game.score++
			}
		})
	}
}
