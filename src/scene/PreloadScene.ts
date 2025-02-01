import { Scene } from 'phaser'
import wolf from '../assets/wolf.png'
import ork from '../assets/ork.png'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('wolf', wolf)
    this.load.image('ork', ork)
  }

  create() {
    this.cameras.main.setBounds(0, 0, 5000, 5000)


    this.scene.start('GameScene')
  }
}