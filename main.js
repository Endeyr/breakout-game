/** @type {HTMLCanvasElement} */
import Background from './background.js'
import Ball from './ball.js'
import CreateBlocks from './createBlocks.js'
import InputHandler from './input.js'
import Player from './player.js'
import UI from './ui.js'

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
			this.time = 0
			this.numOfBalls = 1
			this.bounceSpeed = 5
			this.fontColor = 'white'
			this.background = new Background(this)
			this.player = new Player(this)
			this.input = new InputHandler(this)
			this.balls = [new Ball(this)]
			this.ui = new UI(this)
			this.blocks = new CreateBlocks(this)
		}
		update(deltaTime) {
			if (this.score === this.winningScore) {
				this.gameOver = true
			}
			this.time += deltaTime
			this.player.update(this.input.keys)
			this.balls.forEach((ball) => ball.update())
			this.blocks.update()
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context)
			this.balls.forEach((ball) => ball.draw(context))
			this.blocks.draw(context)
			this.ui.draw(context)
		}
	}

	const game = new Game(canvas.width, canvas.height)

	let lastTime = 0
	let animationId
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime
		lastTime = timeStamp
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.update(deltaTime)
		game.draw(ctx)
		if (!game.gameOver) {
			animationId = requestAnimationFrame(animate)
		} else {
			stopAnimation(animationId)
		}
	}
	function stopAnimation(animationId) {
		cancelAnimationFrame(animationId)
	}
	animate(0)
})
