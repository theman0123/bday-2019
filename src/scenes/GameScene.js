import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  init() {
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;
    var canvas = this.sys.game.canvas;
    var fullscreen = this.sys.game.device.fullscreen;

    // if (!fullscreen.available) {
    //   return;
    // }

    canvas[fullscreen.request]();
  }

  create() {
    this.addImages();
    this.playSounds();
    this.createPath();
    this.addPaige();
    this.addWatson();
    this.startMask();

    this.room.on("pointerdown", () => {
      console.log("donw", this);
      this.scale.toggleFullscreen();
      // var canvas = this.sys.game.canvas;
      // var fullscreen = this.sys.game.device.fullscreen;
      // const fullscreenFunc = () => canvas[fullscreen.request]();
      // fullscreenFunc();
    });
  }

  addWatson() {
    this.add
      .sprite(290, 100, "watson")
      .setScale(1.15)
      .play("watson-sleeps");
  }
  createPath() {
    let origin = {
      x: 75,
      y: 165,
    };
    this.graphics = this.add.graphics();
    this.path = this.add.path(origin.x, origin.y);

    this.path.lineTo(this.width - 50, origin.y);
    this.path.lineTo(this.width - 50, origin.y + 50);
    this.path.lineTo(origin.x, origin.y + 50);
    this.path.lineTo(origin.x, origin.y);

    // to help debug and create lines
    // this.graphics.lineStyle(3, 0x090092, 1);
    // this.path.draw(this.graphics);
  }

  addPaige() {
    this.paige = this.add
      .follower(this.path, 50, 85, "paige-east")
      .setOrigin(0)
      .setScale(1.7)
      .setDepth(1)
      .startFollow({
        duration: 18000,
        repeat: -1,
      })
      .play("paige-walks-e/w");
    // variables for movement
    this.paige.direction = "e";
    // console.log(this.paige);
  }

  startMask() {
    this.maskDimensions = new Phaser.Geom.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
    );
    this.maskDisplay = this.add.graphics();

    this.maskDisplay
      .fillGradientStyle(0x090092, 0x090092, 0xa9a9ac, 0x090092)
      .setDepth(0)
      .setAlpha(0.7);
    this.maskDisplay.fillRectShape(this.maskDimensions).setDepth(3);

    this.maskDisplayTween = this.tweens.add({
      targets: this.maskDisplay,
      alpha: {
        getStart: () => 0.8,
        getEnd: () => 0.02,
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 25000,
      repeat: 0, // -1: infinity
      yoyo: false,
      paused: true,
    });
    this.maskDisplayTween.resume();
  }

  playSounds() {
    const sunConfig = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 3,
    };
    const birdConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 1,
    };
    const ambient = this.sound.add("sunrise", sunConfig);
    const birds = this.sound.add("birds", birdConfig);

    // start music with config
    ambient.play(sunConfig);
    birds.play(birdConfig);
  }

  addImages() {
    this.room = this.add
      .image(0, 0, "room")
      .setOrigin(0)
      .setScale(2)
      .setInteractive();
    this.add
      .image(190, 50, "round-cactus")
      .setOrigin(0)
      .setScale(2);
    this.add
      .image(220, 50, "cactus")
      .setOrigin(0)
      .setScale(2);
    this.add
      .image(300, 48, "desert-rose")
      .setOrigin(0)
      .setScale(2);
    this.add
      .image(150, 48, "peace-lily")
      .setOrigin(0)
      .setScale(2);
    this.add
      .image(5, 150, "skinny-cactus")
      .setOrigin(0)
      .setScale(3)
      .setDepth(2);
    this.add
      .image(360, 95, "snake-plant")
      .setOrigin(0)
      .setScale(2);
    this.add
      .image(20, 25, "string-of-pearls")
      .setOrigin(0)
      .setScale(2);
  }

  createCursor() {}

  update(time, delta) {
    const { x, y } = this.paige.pathVector;
    // console.log(x, y);
    if (y > 85 && x >= 325 && this.paige.direction === "e") {
      this.paige.direction = "s";
      this.paige.anims.stop("paige-walks-e/w");
      this.paige.play("paige-walks-s", true);
    }
    if (y >= 135 && x < 325 && this.paige.direction === "s") {
      this.paige.direction = "w";
      this.paige.anims.stop("paige-walks-s");
      this.paige.setFlipX(true).play("paige-walks-e/w", true);
    }
    if (y <= 135 && x <= 50 && this.paige.direction === "w") {
      this.paige.direction = "n";
      this.paige.anims.stop("paige-walks-e/w");
      this.paige.play("paige-walks-n");
    }
    if (y <= 135 && x > 50 && this.paige.direction === "n") {
      this.paige.direction = "e";
      this.paige.anims.stop("paige-walks-s");
      this.paige.setFlipX(false).play("paige-walks-e/w", true);
    }
  }
}
