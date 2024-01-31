export default class UI {
	constructor(game) {
		this.game = game
		this.fontSize = 30
		this.fontFamily = 'Helvetica'
	}
	draw(context) {
		context.save()
		context.shadowOffsetX = 2
		context.shadowOffsetY = 2
		context.shadowColor = 'blue'
		context.shadowBlur = 0
		context.font = this.fontSize + 'px ' + this.fontFamily
		context.textAlign = 'left'
		context.fillStyle = this.game.fontColor
		// score
		context.fillText('Score: ' + this.game.score, 20, 50)
		context.restore()
	}
}
