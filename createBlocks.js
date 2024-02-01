import Block from './block.js'

export default class CreateBlocks {
	constructor(game) {
		this.game = game
		this.blocks = []
		this.blockCount = 0
		this.blockRowCount = 8
		this.blockColumnCount = 25
		this.blocksCount = this.blockColumnCount * this.blockRowCount
		this.gameOffsetTop = 60
		this.gameOffsetLeft = 50
		this.blockOffsetTop = 40
		this.blockOffsetLeft = 5
		this.blockWidth = 61
		this.blockHeight = 28

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
				this.blocks[c][r] = new Block(this.game, blockX, blockY, r)
			}
		}
	}
	update() {
		this.game.winningScore = this.blocksCount
		for (let c = 0; c < this.blocks.length; c++) {
			for (let r = this.blocks[c].length - 1; r >= 0; r--) {
				this.blocks[c][r].update()
			}
			this.blocks[c] = this.blocks[c].filter(
				(block) => !block.markedForDeletion
			)
		}
	}
	draw(context) {
		for (let c = 0; c < this.blocks.length; c++) {
			for (let r = this.blocks[c].length - 1; r >= 0; r--) {
				this.blocks[c][r].draw(context)

				if (this.blocks[c][r].markedForDeletion) {
					this.blocks[c].splice(r, 1)
				}
			}
		}
	}
}
