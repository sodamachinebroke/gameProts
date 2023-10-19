


const loadingScene = new LoadingScene('loading');
const homeScene = new HomeScene('home');
const gameScene = new GameScene('game');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: [gameScene, homeScene, loadingScene]

});