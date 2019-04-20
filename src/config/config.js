// import Phaser from "phaser";
export default {
  type: Phaser.AUTO,
  parent: "es6-template",
  width: 400,
  height: 236,
  backgroundColor: "#fff",
  pixelArt: true,
  roundPixels: true,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};
