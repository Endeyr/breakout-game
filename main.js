/** @type {HTMLCanvasElement} */
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
    }
    update(deltaTime) { }
    draw(context){}
	}

	const game = new Game(canvas.width, canvas.height)

	let lastTime = 0
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime
		lastTime = timeStamp
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.update(deltaTime)
		game.draw(ctx)
	}
	animate(0)
})
