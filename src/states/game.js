
class Game extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

  }

  update() {
    
  }

}

export default Game;
