import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.readyCount = 1;
  }

  preload() {
    this.createPreloader();
    this.loadAssets();
  }

  create() {
    this.createAnims();
    this.ready();
  }

  createAnims() {
    this.anims.create({
      key: "sparkle-dust-explosion",
      frames: this.anims.generateFrameNames("sparkle-dust", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
      frameRate: 2,
      yoyo: false,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "paige-walks-e/w",
      frames: this.anims.generateFrameNames("paige-east", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }),
      frameRate: 7,
      yoyo: false,
      hideOnComplete: false,
      repeat: -1,
    });
    this.anims.create({
      key: "paige-walks-s",
      frames: this.anims.generateFrameNames("paige-south", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 3,
      yoyo: false,
      hideOnComplete: false,
      repeat: -1,
    });
    this.anims.create({
      key: "watson-sleeps",
      frames: this.anims.generateFrameNames("watson", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 2,
      yoyo: true,
      hideOnComplete: false,
      repeat: -1,
    });
  }

  createPreloader() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    // add logo image
    this.logo = this.add.image(
      this.width / 2,
      this.height / 2 - 100,
      "phaser-logo",
    );

    // build loading bar and container
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();

    // display progess bar
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(
      this.width / 2 - 160,
      this.height / 2 - 30,
      320,
      50,
    );

    // loading text
    this.loadingText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);

    // percent text
    this.percentText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    this.percentText.setOrigin(0.5, 0.5);
    // loading assets
    this.loadingAssetsText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    this.loadingAssetsText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", value => {
      this.percentText.setText(parseInt(value * 100) + "%");
      this.progressBar.clear();
      this.progressBar.fillStyle(0xfffff, 1);
      this.progressBar.fillRect(
        this.width / 2 - 150,
        this.height / 2 - 20,
        300 * value,
        30,
      );
    });

    // update file progress text
    this.load.on("fileprogress", file => {
      this.loadingAssetsText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on("complete", () => {
      this.progressBox.destroy();
      this.progressBar.destroy();
      this.loadingAssetsText.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
    });
  }

  loadAssets() {
    // load IMAGE assets for game
    this.load.image("room", "assets/room2019.png");
    this.load.image("round-cactus", "assets/cactus-round(32x32).png");
    this.load.image("cactus", "assets/cactus(32x32) .png");
    this.load.image("desert-rose", "assets/desert-rose(32x32).png");
    this.load.image("peace-lily", "assets/peace-lily(32x32).png");
    this.load.image("skinny-cactus", "assets/skinny-cactus(32x32).png");
    this.load.image("snake-plant", "assets/snake-plant(32x32).png");
    this.load.image("string-of-pearls", "assets/string-of-pearls(32x32).png");
    this.load.spritesheet("watson", "assets/watson.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("sparkle-dust", "assets/sparkle-dust(32x32).png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("paige-east", "assets/Paige_east.png", {
      frameWidth: 36,
      frameHeight: 48,
    });
    this.load.spritesheet("paige-south", "assets/Paige_south.png", {
      frameWidth: 36,
      frameHeight: 48,
    });
    // load MUSIC and SOUNDS
    this.load.audio("birds", "assets/birds.wav");
    this.load.audio("sunrise", "assets/sunrise.mp3");
    this.readyCount++;
  }

  ready() {
    if (this.readyCount >= 2) {
      this.scene.start("Game");
    }
  }
}
