/// <reference path="./types/index.d.ts" />


class GameScene extends Phaser.Scene {

    constructor(title) {
        super(title);
    }

    init() {
        this.words = [
            {
                key: 'building',
                spanish: 'epulet',
                setXY: {
                    x: 80,
                    y: 250
                }
            },
            {
                key: 'car',
                spanish: 'auto',
                setXY: {
                    x: 250,
                    y: 300
                },
                setScale: {
                    x: 0.8,
                    y: 0.8
                }
            },
            {
                key: 'house',
                spanish: 'maja dojo casa house',
                setXY: {
                    x: 420,
                    y: 280
                }
            },
            {
                key: 'tree',
                spanish: 'huevos',
                setXY: {
                    x: 580,
                    y: 260
                }
            }
        ];
    }
    preload() {
        this.load.image('background', 'assets/img/background-city.png');
        this.load.image('building', 'assets/img/building.png');
        this.load.image('car', 'assets/img/car.png');
        this.load.image('house', 'assets/img/house.png');
        this.load.image('tree', 'assets/img/tree.png');

        this.load.audio('hahafunny', 'assets/audio/funnyhaha.mp3');
        this.load.audio('meowmeow', 'assets/audio/meowmeow.mp3');
        this.load.audio('nightmare', 'assets/audio/nightmare.mp3');
        
    }
    create() {
        const bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        this.correctAudio = this.sound.add('hahafunny');
        this.wrongAudio = this.sound.add('nightmare');


        this.items = this.add.group(this.words);

        Phaser.Actions.Call(this.items.getChildren(), (item) => {
            item.setInteractive();\
            item.setData('audio', this.sound.add('hahafunny'));

            const index = this.items.getChildren().indexOf(item);
            item.setData('spanish', this.words[index].spanish);

            const alphaTween = this.tweens.add({
                targets: item,
                alpha: 0.7,
                duration: 200,
                paused: true,
                persist: true,
            });

            const correctTween = this.tweens.add({
                targets: item,
                scale: 1.5,
                duration: 200,
                ease: 'Quint.easeInOut',
                yoyo: true,
                paused: true,
                persist: true,
            });
            const wrongTween = this.tweens.add({
                targets: item,
                scale: 1.5,
                angle: 90,
                duration: 200,
                ease: 'Quint.easeInOut',
                yoyo: true,
                paused: true,
                persist: true,
            });

            item.on('pointerdown', () => {
                console.log('clicked on', item.texture.key);

                correctTween.play();
            });
            item.on('pointerover', () => {
                alphaTween.play();
            });
            item.on('pointerout', () => {
                alphaTween.pause();
                alpha.reset();
                item.alpha = 1;
            });
        });

    }

    showNext(){
        this.currentWord = Phaser.Math.RND.pick(this.items.getChildren());
        const audio = this.currentWord.getData('audio');
        audio.play();
    }


}

const gameScene = new GameScene('game');

const game = new Phaser.Game({
    width: 640,
    height: 360,
    type: Phaser.AUTO,
    scene: gameScene
});