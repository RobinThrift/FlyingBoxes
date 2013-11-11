requirejs.config({
  baseUrl: "/scripts/vendor",
  paths: {
    c: "../components",
    babylon: "babylon.1.6.0"
  },
  shim: {
    "lodash": {
      exports: "_"
    },
    "KeyboardJS/keyboard.js": {
      exports: "KeyboardJS"
    },
    "babylon": {
      exports: "BABYLON",
      deps: ["hand-1.1.3"]
    },
    "zepto.js": {
      exports: "$"
    }
  }
});

requirejs(["babylon", "KeyboardJS/keyboard", "zepto", "lodash", "c/bits", "c/stage", "c/camera", "c/light", "c/spawner", "c/bentity", "c/gui"], function(BABYLON, KeyboardJS, $, _, Bits, Stage, Camera, Light, Spawner, BEntity, GUI) {
  var bgPlane, mainCam, mainLight, player, spot1, spot2, spot3, stage;
  stage = new Stage("screen");
  player = new BEntity("player", "box", {
    size: 0.4,
    pos: [0, -3.5, 0],
    Zscaling: 0.3,
    Xscaling: 2,
    Yscaling: 1.1,
    colour: {
      r: 1,
      g: 0,
      b: 0.23
    }
  }, {
    "left": function() {
      if (player.getPosition().x > -3.5) {
        return player.move(-0.2);
      }
    },
    "right": function() {
      if (player.getPosition().x < 3.5) {
        return player.move(0.2);
      }
    },
    "f": function() {
      return player.mesh.rotation.addInPlace(new BABYLON.Vector3(-0.1, -0.1, -.01));
    },
    "g": function() {
      return player.mesh.rotation = new BABYLON.Vector3(0, 0, 0);
    }
  }, bgPlane = new BEntity("bgPlane", "plane", {
    size: 100,
    pos: [0, 0, 20],
    specularColour: {
      r: 1,
      g: 0,
      b: 0.23
    },
    colour: {
      r: 1,
      g: 0.4,
      b: .1
    }
  }));
  mainCam = new Camera("mainCam", "free", {
    pos: [0, 0, -10],
    controls: false
  });
  mainLight = new Light("hemi", "mainLight", {
    pos: [0, 0, 0],
    colour: Bits.rgbToFloatObj(144, 202, 97)
  });
  spot1 = new Light("spot", "spot1", {
    pos: [-3, -2, -2],
    to: [0, -1.5, 2],
    debug: false,
    angle: 10,
    decay: 10,
    colour: Bits.rgbToFloatObj(221, 0, 0)
  });
  spot2 = new Light("spot", "spot2", {
    pos: [0, -2, -2],
    to: [0, -1.5, 2],
    debug: false,
    angle: 10,
    decay: 10,
    colour: Bits.rgbToFloatObj(255, 0, 255)
  });
  spot3 = new Light("spot", "spot3", {
    pos: [3, -2, -2],
    to: [0, -1.5, 2],
    debug: false,
    angle: 10,
    decay: 10,
    colour: Bits.rgbToFloatObj(0, 0, 255)
  });
  stage.addCamera(mainCam);
  stage.addLight(mainLight);
  stage.addLight(spot1);
  stage.addLight(spot2);
  stage.addLight(spot3);
  stage.addEntity(player);
  stage.addEntity(bgPlane);
  return stage.loop();
});
