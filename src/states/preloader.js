class Preloader extends Phaser.State {

  constructor() {
    super();
  }

  preload() {

    this.game.stage.backgroundColor = "#666666";
    
    // background
    this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
    this.background.anchor.setTo(0.5,0.5);

    //setup loading bar
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0,0.5);
    this.preloadBar.x = this.world.centerX - this.preloadBar.width/2;

    // this statement sets the blue bar to represent the actual percentage of data loaded
    this.load.setPreloadSprite(this.preloadBar);

    // Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  create() {
    this.preloadBar.cropEnabled = false;
  }

  loadResources() {
    // add all in-game resources here
    // resources are referenced by 'key'

    // title screen
    this.game.load.image('title','assets/title.png');

    // Create atlases with this tool:
    // https://www.leshylabs.com/apps/sstool/
    // Settings:
    //  Sprite map: JSON-TP-ARRAY format.
    //this.game.load.atlas('atlas', 'atlas.png', 'assets/atlas.json');

    //this.game.load.spritesheet('target', 'assets/target.png',128,128);

    // Browers are a bit funny about sound-files. Support for other formats varies a bit.
    // If in doubt, use wav or mp3s
    //this.game.load.audio('ding','assets/ding.wav');
  }

  onLoadComplete() {
    // and go to the next state
    // this.game.state.start('title');
    
    // skip the title screen
    this.game.state.start('game');
  }
}

export default Preloader;
