import Boot from './states/boot';
import Game from './states/game';
import Title from './states/title';
import Preloader from './states/preloader';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'bazookabandit-game');

// add all the game states
game.state.add('boot', new Boot());
game.state.add('preloader', new Preloader());
game.state.add('title', new Title());
game.state.add('game', new Game());

// and start somewhere
game.state.start('boot');
