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
		// timer
		context.font = this.fontSize + 'px ' + this.fontFamily
		context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 180, 50)
		// game over
		if (this.game.gameOver) {
			context.textAlign = 'center'
			context.font = this.fontSize * 2 + 'px ' + this.fontFamily
			if ((this.game.score = this.game.winningScore)) {
				context.fillText(
					'Congrats!',
					this.game.width * 0.5,
					this.game.height * 0.5 - 20
				)
				context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
				context.fillText(
					'Blocks can not stop you!',
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				)
			} else {
				context.fillText(
					'You lose!',
					this.game.width * 0.5,
					this.game.height * 0.5 - 20
				)
				context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
				context.fillText(
					'Better luck next time!',
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				)
			}
			context.fillText(
				'Press Enter to restart.',
				this.game.width * 0.5,
				this.game.height * 0.5 + 60
			)
		}
		context.restore()
	}
}
