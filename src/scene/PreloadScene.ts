import { Scene } from 'phaser'
import wolf from '../assets/wolf.png'
import ork from '../assets/ork.png'
import swordSplashJson from '../assets/sword-splash/splash.json'
import swordSplash from '../assets/sword-splash/splash.png'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('wolf', wolf)
    this.load.image('ork', ork)
    this.load.atlas('swordSplash', swordSplash, swordSplashJson)
  }

  create() {
    this.cameras.main.setBounds(0, 0, 5000, 5000)


    this.scene.start('GameScene')
  }
}