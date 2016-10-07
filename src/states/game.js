
class Game extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {

    // is that salmon?
    this.game.stage.backgroundColor = "#ffedde";

    // nice big game world
    this.game.world.setBounds(0, 0, 4000, 2000);

    // add some background tiles
    //var bg = this.game.add.tileSprite(0, 0, 800, 800, 'backgroundtile');

    // just basing this on the 'tight platformer' example from phaser website for the moment
    // http://phaser.io/examples/v2/arcade-physics/platformer-tight
    // with a sprinkle of tank code from
    // http://examples.phaser.io/_site/view_full.html?d=games&f=tanks.js&t=tanks
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.game.physics.arcade.gravity.y = 300;

    // all this player stuff needs to go into a class
    // -----------------------------------------
    this.jumpTimer = 0;
    this.PLAYERSPEED_X = 200;
    this.PLAYERSPEED_Y = 600;

    this.goingLeft = false;
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sprite-atlas', 'body_idle');
    this.player.anchor.setTo(0.5, 0.5);

    // players head
    this.head = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'sprite-atlas', 'playerhead');
    this.head.anchor.setTo(0.5, 0.5);

    // players bazooka
    this.bazooka = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'sprite-atlas', 'bazooka');
    this.bazooka.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 1000;
    this.player.body.maxVelocity.y = 500;

    // walking animation
    this.player.animations.add('walk', [ 'body_idle', 'body_step1', 'body_step2', 'body_step1'], 10, true);


    // -----------------------------------------

    // keyboard controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // normal camera follow
    // this.game.camera.follow(this.player);
    // smoother follow
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    // a group that holds some blocks
    this.blocks = this.game.add.physicsGroup(Phaser.Physics.ARCADE);

    // create some block to stand on
    // these are relative to center of world
    var locs = [ [-100, 200], [-1100, 280]  ];
    for(var i = 0; i < locs.length; i++) {
        var block = this.game.add.sprite(this.game.world.centerX + locs[i][0], this.game.world.centerY + locs[i][1], 'greenblock');
        this.game.physics.enable(block, Phaser.Physics.ARCADE);
        // block stays where I put it
        block.body.allowGravity = false;
        block.body.immovable = true;

        this.blocks.add(block);
    }

    // add a bunch of other sprites from our sprite atlas
    var stuff = [ ['girder_horizontal', 2650, 980], [ 'girder_horizontal', 2450, 980], ['girder_vertical', 2800, 960], ['barrel', 1400, 1180]  ];
    for(var i = 0; i < stuff.length; i++) {
        var s = this.game.add.sprite(stuff[i][1], stuff[i][2], 'sprite-atlas', stuff[i][0]);
    }

    // might as well add gamepad controls
    this.game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    this.pad1 = this.game.input.gamepad.pad1;
    this.gamePadUsed = false;
  }

  update() {

    // output mouse coords to console, so I can eyebal where to place stuff
    if(this.game.input.activePointer.isDown) {
        console.log(this.game.input.activePointer.x + this.game.camera.x, this.game.input.activePointer.y + this.game.camera.y);
    }
    
    // this ensures player collides with blocks
    this.game.physics.arcade.collide(this.player, this.blocks);
    
    this.player.body.velocity.x = 0;

    // only worry about gamepad if gamepad connected and user actually presses a button
    if(!this.gamePadUsed && this.pad1.connected && (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT))) {
        this.gamePadUsed = true;
    }

    // moving
    if (this.cursors.left.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
        this.player.body.velocity.x = this.PLAYERSPEED_X * -1;

        this.goingLeft = true;
        this.player.animations.play('walk');
    }
    else if (this.cursors.right.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
        this.player.body.velocity.x = this.PLAYERSPEED_X;

        this.goingLeft = false;
        this.player.animations.play('walk');
    } else {
        // we're idle
        this.player.animations.stop();
        this.player.frameName = 'body_idle';
    }

    if(this.goingLeft) {
        this.player.scale.x = -1;
        this.head.scale.x = -1;
        this.bazooka.scale.x = -1;
    } else {
        this.player.scale.x = 1;
        this.head.scale.x = 1;
        this.bazooka.scale.x = 1;
    }

    // allow player to jump
    if ((this.cursors.up.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) && this.player.body.velocity.y < 1 && this.game.time.now > this.jumpTimer) {
        this.player.body.velocity.y = this.PLAYERSPEED_Y * -1;
        this.jumpTimer = this.game.time.now + 750;
        this.player.frameName = 'body_jump';
    }
    if(this.player.body.velocity.y !== 0 ) {
        this.player.frameName = 'body_jump';
    }

    // head & bazooka stay with player - should really use a group for this
    this.head.x = this.player.x;
    this.head.y = this.player.y - 60;

    this.bazooka.x = this.player.x;
    this.bazooka.y = this.player.y - 22;

    // if we're not using that gamepad, use mouse to point bazooka
    // problem is - if we change direction, bazooka points at mouse on wrong side of player
    if(!this.gamePadUsed) {
        // point 'em at miece - needs a rotation lock
        this.head.rotation = this.game.physics.arcade.angleToPointer(this.head);
        this.bazooka.rotation = this.game.physics.arcade.angleToPointer(this.bazooka);
    }

    // these gamepad controls to rotate the bazooka are a bit wonky, but it kinda works.
    if(this.gamePadUsed) {
        var rightStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        var rightStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

        if(rightStickY) {
            if( rightStickY > 0.0) {
                this.head.rotation += 0.1;
                this.bazooka.rotation += 0.1;
            }
            if(rightStickY < 0.0) {
                this.head.rotation -= 0.1;
                this.bazooka.rotation -= 0.1;
            }
        }
    }
  }

  render() {
      // debugging stuff
      this.game.time.advancedTiming = true;
      this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000");
      //this.game.debug.bodyInfo(this.player, 16, 24);
  }

}

export default Game;
