export default class Background {
	constructor(game) {
		this.game = game
		this.image = document.getElementById('background')
	}
	draw(context) {
		context.drawImage(this.image, 0, 0, this.game.width, this.game.height)
	}
}
