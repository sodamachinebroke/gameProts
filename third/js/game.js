/// <reference path="./types/index.d.ts"/>

class GameScene extends Phaser.Scene {
    constructor(title) {
        super(title);
    }

    init() {
        //class variable initialization

        this.playerSpeed = 3;
        this.enemyMinSpeed = 1;
        this.enemyMaxSpeed = 8;
        this.enemyMinY = 80;
        this.enemyMaxY = 280;
    }

    preload() {
        //asset preloading

        this.load.image('background', 'assets/background.png');
        this.load.image('enemy', 'assets/dragon.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('goal', 'assets/treasure.png');
    }

    create() {
        //scene creation

        this.bg = this.add.sprite(0, 0, 'background');
        this.bg.setOrigin(0, 0);

        const gameHeight = this.sys.game.config.height;
        const gmaeWidth = this.sys.game.config.width;

        this.player = this.add.sprite(40, gameHeight / 2, 'player');
        this.player.setScale(0.7, 0.7);


        this.goal = this.add.sprite(gmaeWidth - 40, gameHeight / 2, 'goal');

        

        this.enemies = this.add.group({
            key: 'enemy',
            repeat: 5,
            setXY: {
                x: 120,
                y: 100,
                stepX: 80,
                stepY: 30
            }
        });

        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.3, -0.3);
        Phaser.Actions.Call(this.enemies.getChildren(), (enemy) => {
            enemy.setFlipX(true)
            const direction = Math.random() < 0.5 ? 1 : -1;
            const speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
            enemy.setData('speed', direction * speed);
        });

    }

    update() {
        //this gets called according to the framerate
        if (this.input.activePointer.isDown) {
            this.player.x += this.playerSpeed;
        }

        const playerRect = this.player.getBounds();
        const goalRect = this.goal.getBounds();
        //const enemyRect = this.enemy.getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
            this.scene.restart();
            return;
        }

        Phaser.Actions.Call(this.enemies.getChildren(), (enemy) => {
            enemy.y += enemy.getData('speed');
            if (enemy.y >= this.enemyMaxY) {
             enemy.data.values.speed *= -1;
            }
            if (enemy.y <= this.enemyMinY) {
                enemy.data.values.speed *= -1;
            }

            const enemyRect = enemy.getBounds()

            if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
                this.scene.restart();
                return;
            }
        });



    }
}


const gameScene = new GameScene('game');

const game = new Phaser.Game({
    width: 640,
    height: 360,
    type: Phaser.AUTO, //CANVAS, WEBGL, AUTO
    scene: gameScene
});