/** @type {HTMLCanvasElement} */
import Background from './background.js'
import Ball from './ball.js'
import Block from './block.js'
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
			this.numOfBalls = 1
			this.bounceSpeed = 10
			this.fontColor = 'white'
			this.background = new Background(this)
			this.player = new Player(this)
			this.input = new InputHandler(this)
			this.balls = [new Ball(this)]
			this.ui = new UI(this)
			this.blocks = []
			this.blockRowCount = 8
			this.blockColumnCount = 25
			this.gameOffsetTop = 60
			this.gameOffsetLeft = 50
			this.blockOffsetTop = 40
			this.blockOffsetLeft = 5
			this.blockWidth = 61
			this.blockHeight = 28
		}
		update(deltaTime) {
			this.player.update(this.input.keys)
			this.balls.forEach((ball) => ball.update())
			this.addBlocks()
			for (let c = 0; c < this.blockColumnCount; c++) {
				for (let r = 0; r < this.blockRowCount; r++) {
					this.blocks[c][r].update()
				}
			}
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context)
			this.balls.forEach((ball) => ball.draw(context))
			for (let c = 0; c < this.blockColumnCount; c++) {
				for (let r = 0; r < this.blockRowCount; r++) {
					this.blocks[c][r].draw(context)
				}
			}
			this.ui.draw(context)
		}
		addBlocks() {
			for (let c = 0; c < this.blockColumnCount; c++) {
				this.blocks[c] = []
				for (let r = 0; r < this.blockRowCount; r++) {
					const blockX =
						c * (this.blockOffsetLeft + this.blockWidth) +
						this.blockOffsetLeft +
						this.gameOffsetLeft
					const blockY =
						r * (this.blockOffsetTop + this.blockHeight) +
						this.blockOffsetTop +
						this.gameOffsetTop

					this.blocks[c][r] = new Block(this, blockX, blockY, r)
				}
			}
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
