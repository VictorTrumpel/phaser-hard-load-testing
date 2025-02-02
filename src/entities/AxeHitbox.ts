import { AttackHitbox } from '@shared'
import { RusHeroSprite } from './RusHeroSprite'

export class AxeHitbox extends AttackHitbox {
  constructor(private rusHeroSprite: RusHeroSprite) {
    super(rusHeroSprite.scene)
  }

  squash(..._: unknown[]): void {
    const heroX = this.rusHeroSprite.x
    const heroY = this.rusHeroSprite.y

    const offsetX = this.rusHeroSprite.flipX ? 60 : -90
    const offsetY = -32
    const hitboxWidth = 64
    const hitboxHeight = 32

    this.enable(heroX + offsetX, heroY + offsetY, hitboxWidth, hitboxHeight)

    this.rusHeroSprite.scene.time.delayedCall(1, () => this.disable())
  }

  playAttack() {
    this.rectangleBody
  }
}
