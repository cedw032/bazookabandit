class Title extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    //add background image
    this.background = this.game.add.sprite(0, 0, 'title');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    this.input.onDown.add(this.onInputDown, this);
  }

  update() {}

  onInputDown () {
    this.game.state.start('game');
  }

}

export default Title;
