import { Animations, Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

export class RusHeroSprite extends PhysicsSprite {
  static ATTACK_FRAME = 'attack_2'

  onFrameUpdate: (
    animation: Animations.Animation,
    animationframe: Animations.AnimationFrame
  ) => void = () => null

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'wolf', 'wolf')
    this.setOrigin(0.5, 1)
  }

  playIdle() {
   
  }

  playRun() {
  }

  playAttack() {
    // this.play(ATTACK_ANIMATION, true)

    // this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.onFrameUpdate)

    // return new Promise((complete) => {
    //   this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
    //     this.off(Phaser.Animations.Events.ANIMATION_UPDATE)

    //     this.scene.time.delayedCall(ATTACK_ANIMATION_DELAY_AFTER_COMPLETE, () => {
    //       this.setOrigin(0.5, 1)
    //       this.setHitboxForIdle()
    //       this.playIdle()
    //       complete(null)
    //     })
    //   })
    // })
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
}
