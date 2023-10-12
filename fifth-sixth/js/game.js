/// <reference path="./types/index.d.ts" />


class GameScene extends Phaser.Scene {
    constructor(title) {
        super(title);
    }

    init() {
        this.stats = {
            health: 100,
            fun: 5
        };

        this.selectedItem = null;
        this.uiBlocked = false;
    };
    preload() {
        this.load.image('apple', 'assets/apple.png');
        this.load.image('background', 'assets/backyard.png');
        this.load.image('candy', 'assets/candy.png');
        this.load.image('rotate', 'assets/rotate.png');
        this.load.image('duck', 'assets/rubber_duck.png');

        this.load.spritesheet('pet', 'assets/pet.png', {
            frameWidth: 97,
            frameHeight: 83,
            margin: 1,
            spacing: 1
        });
    };

    create() {
        this.bg = this.add.sprite(0, 0, 'background').setInteractive();
        this.bg.setOrigin(0, 0);
        this.bg.on('pointerdown', (pointer) => this.placeItem(pointer));


        this.pet = this.add.sprite(40, 220, 'pet', 0).setInteractive();
        this.input.setDraggable(this.pet);

        this.input.on('drag', (pointer, gameObj, dragX, dragY) => {
            gameObj.x = dragX;
            gameObj.y = dragY;
        })

        this.createUI();
    };

    createUI() {
        this.candyBtn = this.add.sprite(72, 600, 'candy').setInteractive();
        this.candyBtn.setData('stats', { health: -20, fun: 10 });
        this.candyBtn.on('pointerdown', () => this.pickItem(this.candyBtn));

        this.appleBtn = this.add.sprite(144, 600, 'apple').setInteractive();
        this.appleBtn.setData('stats', { health: 20, fun: -5 });
        this.appleBtn.on('pointerdown', () => this.pickItem(this.appleBtn));

        this.rotateBtn = this.add.sprite(216, 600, 'rotate').setInteractive();
        this.rotateBtn.setData('stats', { health: -50, fun: 100 });
        this.rotateBtn.on('pointerdown', () => this.rotatePet(this.rotateBtn));

        this.duckBtn = this.add.sprite(288, 600, 'duck').setInteractive();
        this.duckBtn.setData('stats', { health: 200, fun: 69 });
        this.duckBtn.on('pointerdown', () => this.pickItem(this.duckBtn));
    };

    resetUI() {
        this.selectedItem = null;

        this.candyBtn.alpha = 1.0;
        this.appleBtn.alpha = 1.0;
        this.duckBtn.alpha = 1.0;
        this.rotateBtn.alpha = 1.0;
    };

    pickItem(item) {
        if (this.uiBlocked) {
            return;
        }
        this.resetUI();
        this.selectedItem = item;
        item.alpha = 0.5;
    };

    placeItem(pointer) {
        if (!this.selectedItem) {
            return;
        }
        this.uiBlocked = true;

        console.log(pointer);
        const newItem = this.add.sprite(pointer.worldX, pointer.worldY, this.selectedItem.texture.key);

        this.updateStats(this.selectedItem.getData('stats'));

        this.resetUI();
        this.uiBlocked = false;
    };

    rotatePet(item) {

        if (this.uiBlocked) {
            return;
        }

        this.resetUI();
        this.rotateBtn.alpha = 0.5;
        this.uiBlocked = true;

        this.tweens.add({
            targets: this.pet,
            duration: 1000,
            angle: 1080,
            onComplete: () =>{
                this.updateStats(this.rotateBtn.getData('stats'));
                this.resetUI();
                this.uiBlocked = false;
            }
        });



    };

    updateStats(stats) {
        this.stats.health += stats.health;
        this.stats.fun += stats.fun;
        console.log(this.stats);
    };
}

const gameScene = new GameScene('game');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: gameScene

});