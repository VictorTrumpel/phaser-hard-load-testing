import { Scene, GameObjects } from 'phaser'
import { RusHeroSprite, EnemySprite, CounterText } from '@entities'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private enemies: Phaser.GameObjects.Group | null = null
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null
  private counter: CounterText | null = null

  private isKeyboardNavigation = true

  constructor() {
    super('GameScene')
  }

  handleHeroAttackFrame = () => {
    if (!this.rusHeroContext) return
    this.rusHeroContext.attackHitbox.squash()
  }

  handleHurtEnemy = (enemy: GameObjects.GameObject) => {
    const isEmemy = enemy instanceof EnemySprite
    if (!isEmemy) return
    enemy.destroy()
  }

  create() {
    this.initHero()
    this.initEnemies()
    this.initKeyboardForHero()
    this.initCollisions()
    this.initCounter()
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, window.innerWidth / 2, window.innerHeight / 2)
    this.rusHeroContext = new RusHeroContext(rusHeroSprite)

    this.time.addEvent({
      delay: 1500,
      callback: () => {
        rusHeroSprite.playAttack()
        this.handleHeroAttackFrame()
      },
      loop: true,
    })

    this.cameras.main.startFollow(rusHeroSprite, true, 0.1, 0.1)
  }

  initEnemies() {
    this.enemies = this.physics.add.group()

    const SIZE = 20000
    const STEP = 250

    const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min

    const START_DEAD_ZONE_X = window.innerWidth / 2 - 100
    const END_DEAD_ZONE_X = window.innerWidth / 2 + 100

    const START_DEAD_ZONE_Y = window.innerHeight / 2 - 100
    const END_DEAD_ZONE_Y =  window.innerHeight / 2 + 100

    let count = 0

    for (let x = 0; x <= SIZE; x += STEP) {
      for (let y = 0; y <= SIZE; y += STEP) {
        const minX = x
        const minY = y

        const maxX = x + STEP
        const maxY = y + STEP

        const randomX = randomFloat(minX, maxX)
        const randomY = randomFloat(minY, maxY)

        const isXInDeadZone = randomX >= START_DEAD_ZONE_X && randomX <= END_DEAD_ZONE_X
        const isYInDeadZone = randomY >= START_DEAD_ZONE_Y && randomY <= END_DEAD_ZONE_Y

        if (isXInDeadZone && isYInDeadZone) continue

        const enemy = new EnemySprite(this, randomX, randomY, 'ork')

        count += 1

        this.enemies.add(enemy)
      }
    }

    this.physics.add.collider(this.enemies, this.enemies)

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.enemies?.children.each((child) => {
          const sprite = this.rusHeroContext?.getSprite()
          if (!this.enemies || !child || !sprite) return true
          
          this.physics.moveToObject(child, sprite);

          const enemy = child as EnemySprite

          enemy.setDepth(enemy.y)

          return true
        })
      },
      callbackScope: this,
      loop: true,
    })
  }

  initCollisions() {
    if (!this.rusHeroContext || !this.enemies) return
    const attackHitbox = this.rusHeroContext.attackHitbox
    attackHitbox.addOverlapWith(this.enemies, this.handleHurtEnemy)
  }

  initKeyboardForHero() {
    if (!this.rusHeroContext) return

    const keyboardPlugin = this.input.keyboard
    const hero = this.rusHeroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler)

    this.keyboard = keyboardBinder.getKeyboard()

    const topButton = document.getElementById('top-button')!
    const leftButton = document.getElementById('left-button')!
    const bottomButton = document.getElementById('bottom-button')!
    const rightButton = document.getElementById('right-button')!

    document.addEventListener('keydown', () => {
      this.isKeyboardNavigation = true
    })

    topButton.addEventListener('pointerdown', () => {
      this.isKeyboardNavigation = false
      this.rusHeroContext?.moveTop()
    })
    topButton.addEventListener('pointerup', () => {
      this.rusHeroContext?.stopMovingY()
    })

    leftButton.addEventListener('pointerdown', () => {
      this.isKeyboardNavigation = false
      this.rusHeroContext?.moveLeft()
    })
    leftButton.addEventListener('pointerup', () => {
      this.rusHeroContext?.stopMovingX()
    })

    bottomButton.addEventListener('pointerdown', () => {
      this.isKeyboardNavigation = false
      this.rusHeroContext?.moveBottom()
    })
    bottomButton.addEventListener('pointerup', () => {
      this.rusHeroContext?.stopMovingY()
    })

    rightButton.addEventListener('pointerdown', () => {
      this.isKeyboardNavigation = false
      this.rusHeroContext?.moveRight()
    })
    rightButton.addEventListener('pointerup', () => {
      this.rusHeroContext?.stopMovingX()
    })
  }

  initCounter() {
    this.counter = new CounterText(this, window.innerWidth * 0.1, window.innerHeight * 0.1)

    this.counter.setScrollFactor(0)
  }

  update(): void {
    const sprite = this.rusHeroContext?.getSprite()
    if (sprite) {
      sprite.setDepth(sprite.y)
    }
    if (this.counter && this.enemies) {
      this.counter.setValue(this.enemies.children.size)
      this.counter.update(window.innerWidth * 0.1, window.innerHeight * 0.1)
    }
    if (this.isKeyboardNavigation) {
      this.keyboard?.executeKeyCommands()
    }
  }
}