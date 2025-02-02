import { GameObjects, Scene } from 'phaser'

export class CounterText extends GameObjects.Text {
  private woodIcon: GameObjects.Image | null = null

  private value = 1

  static OFFSET_TEXT_Y = -45

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, `Всего врагов на сцене: ${0}`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: 'rgb(255, 0, 0)',
    })

    this.scene.add.existing(this)
  }

  setValue(value: number) {
    this.value = value
  }

  getValue() {
    return this.value
  }

  setVisible(value: boolean): this {
    super.setVisible(value)

    this.woodIcon?.setVisible(value)

    return this
  }

  setPosition(x?: number, y?: number, z?: number, w?: number) {
    super.setPosition(x, y, z, w)

    this.woodIcon?.setPosition(x, y, z, w)

    return this
  }

  update(x: number, y: number) {
    this.text = `Всего врагов: ${this.value}`
    this.setVisible(this.value === 0 ? false : true)
    this.setPosition(x, y)
    this.woodIcon?.setDepth(1000)
  }
}

