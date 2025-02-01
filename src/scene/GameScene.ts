import { Scene } from 'phaser'
import { RusHeroSprite } from '@entities'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private enemies: Phaser.GameObjects.Group | null = null
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null

  constructor() {
    super('GameScene')
  }

  create() {
    this.initHero()
    this.initKeyboardForHero()
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, window.innerWidth / 2, window.innerWidth / 2)
    this.rusHeroContext = new RusHeroContext(rusHeroSprite)
  }

  initHeroAttack() {
    
  }

  initEnemies() {
    this.enemies = this.physics.add.group()

    const SIZE = 20000
    const STEP = 350
  }

  initKeyboardForHero() {
    if (!this.rusHeroContext) return

    const keyboardPlugin = this.input.keyboard
    const hero = this.rusHeroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler)

    this.keyboard = keyboardBinder.getKeyboard()
  }

  update(): void {
    this.keyboard?.executeKeyCommands()
  }
}