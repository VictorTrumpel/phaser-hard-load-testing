import { AttackHitbox } from '@shared'
import { RusHeroSprite } from './RusHeroSprite'

export class AxeHitbox extends AttackHitbox {
  constructor(private rusHeroSprite: RusHeroSprite) {
    super(rusHeroSprite.scene)
  }

  squash(..._: unknown[]): void {
    const heroX = this.rusHeroSprite.x
    const heroY = this.rusHeroSprite.y

    const offsetX = this.rusHeroSprite.flipX ? -35 : 30
    const offsetY = -35
    const hitboxWidth = 32

    this.enable(heroX + offsetX, heroY + offsetY, hitboxWidth)

    this.rusHeroSprite.scene.time.delayedCall(1, () => this.disable())
  }
}
