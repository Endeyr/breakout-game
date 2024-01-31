/** @type {HTMLCanvasElement} */
import Background from './background.js'
import Ball from './ball.js'
import Block from './block.js'
import InputHandler from './input.js'
import Player from './player.js'

window.addEventListener('load', function () {
	const loading = document.getElementById('loading')
	loading.style.display = 'none'
	// Basic canvas project setup
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	class Game {
		constructor(width, height) {
			this.width = width
			this.height = height
			this.groundMargin = 40
			this.gameOver = false
			this.score = 0
			this.winningScore = 10
			this.background = new Background(this)
			this.player = new Player(this)
			this.input = new InputHandler(this)
			this.blocks = []
			this.balls = [new Ball(this)]
			this.numOfBalls = 1
			this.bounceSpeed = 10
		}
		update(deltaTime) {
			this.player.update(this.input.keys)
			this.balls.forEach((ball) => ball.update())
			this.addBlocks()
			this.blocks.forEach((block) => block.update())
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context)
			this.balls.forEach((ball) => ball.draw(context))
			this.blocks.forEach((block) => block.draw(context))
		}
		addBlocks() {
			this.blocks.push(
				new Block(this, this.width * 0.7 - 30, 400, 0),
				new Block(this, this.width * 0.66 - 30, 400, 0),
				new Block(this, this.width * 0.62 - 30, 400, 0),
				new Block(this, this.width * 0.58 - 30, 400, 0),
				new Block(this, this.width * 0.54 - 30, 400, 0),
				new Block(this, this.width * 0.5 - 30, 400, 0),
				new Block(this, this.width * 0.46 - 30, 400, 0),
				new Block(this, this.width * 0.42 - 30, 400, 0),
				new Block(this, this.width * 0.38 - 30, 400, 0),
				new Block(this, this.width * 0.34 - 30, 400, 0)
			)
		}
	}

	const game = new Game(canvas.width, canvas.height)

	let lastTime = 0
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime
		lastTime = timeStamp
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.update(deltaTime)
		game.draw(ctx)
		if (!game.gameOver) {
			animationId = requestAnimationFrame(animate)
		} else {
			stopAnimation()
		}
	}
	function stopAnimation() {
		cancelAnimationFrame(animationId)
	}
	animate(0)
})
