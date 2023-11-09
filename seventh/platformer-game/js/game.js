/// <reference path="./types/index.d.ts" />

class GameScene extends Phaser.Scene {
    constructor(title) {
        super(title);
    }
    init() {

    }

    preload() {
        this.load.image('barrel', 'assets/barrel.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('gorilla', 'assets/gorilla3.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('platform', 'assets/platform.png');

        this.load.spritesheet('fire', 'assets/fire_spritesheet.png', {
            frameWidth: 20,
            frameHeight: 21,
            margin: 1,
            spacing: 1
        });

        this.load.spritesheet('player', 'assets/player_spritesheet.png', {
            frameWidth: 28,
            frameHeight: 30,
            margin: 1,
            spacing: 1
        });
    }

    create() {
        this.add.sprite(180, 400, 'ground');
    }
}

const gameScene = new Phaser.Scene('game');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 1000 }
        }
    }
});