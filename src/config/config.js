export default {
  type: Phaser.AUTO,
  parent: "es6-template",
  width: 400,
  height: 236,
  backgroundColor: "#fff",
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};
