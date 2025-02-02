import * as Phaser from 'phaser'
import { PreloadScene } from './scene/PreloadScene'
import { GameScene } from './scene/GameScene'
import './style.css'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  roundPixels: false,
  pixelArt: true,
  backgroundColor: 0x9da19e,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [PreloadScene, GameScene],
}

new Phaser.Game(config)