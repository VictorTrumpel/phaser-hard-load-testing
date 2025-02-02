import { Animations, Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

const ATTACK_ANIMATION = 'ATTACK_ANIMATION'
const ATTACK_ANIMATION_DELAY_AFTER_COMPLETE = 30

export class RusHeroSprite extends PhysicsSprite {
  static ATTACK_FRAME = 'swordSplash2'

  private attackSprite: PhysicsSprite

  onFrameUpdate: (
    animation: Animations.Animation,
    animationframe: Animations.AnimationFrame
  ) => void = () => null

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'wolf', '')
    this.setOrigin(0.5, 1)

    this.attackSprite = new PhysicsSprite(scene, x + 30, y, 'swordSplash', 'swordSplash1')
    this.attackSprite.setScale(0.2)
    this.attackSprite.getBody().setSize(300, 150)
    this.attackSprite.getBody().setOffset(200, 120)
    this.attackSprite.setVisible(false)

    this.createAttackAnimation()
  }

  playIdle() {}

  playRun() {}

  playAttack() {
    this.attackSprite.setVisible(true)
    this.attackSprite.play(ATTACK_ANIMATION, true)

    if (this.flipX) {
      this.attackSprite.flipX = false
      this.attackSprite.setPosition(this.x + 45, this.y - 30)
    } else {
      this.attackSprite.flipX = true
      this.attackSprite.setPosition(this.x - 75, this.y - 30)
    }

    this.attackSprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.onFrameUpdate)

    return new Promise((complete) => {
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.off(Phaser.Animations.Events.ANIMATION_UPDATE)
        this.attackSprite.setVisible(false)

        this.scene.time.delayedCall(ATTACK_ANIMATION_DELAY_AFTER_COMPLETE, () => {
          complete(null)
        })
      })
    })
  }

  moveX(speed: number) {
    const body = this.getBody()
    body.setVelocityX(speed)
  }

  moveY(speed: number) {
    const body = this.getBody()
    body.setVelocityY(speed)
  }

  stopMoveY() {
    const body = this.getBody()
    body.setVelocityY(0)
  }

  stopMoveX() {
    const body = this.getBody()
    body.setVelocityX(0)
  }

  stopMoving() {
    const body = this.getBody()
    body.setVelocity(0)
  }

  private createAttackAnimation() {
    const frames = this.attackSprite.anims.generateFrameNames('swordSplash', {
      prefix: 'swordSplash',
      start: 1,
      end: 6,
    })

    this.attackSprite.anims.create({
      key: ATTACK_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }
}
