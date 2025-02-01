import { IEnemyState } from './IEnemyState'

export interface IEnemySprite {
  playHurt(): void

  setContext(context: IEnemyState): void
  getContext(): IEnemyState | null

  destroy(): void
}
